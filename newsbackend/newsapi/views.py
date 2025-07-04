# newsapi/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Article
from .serializers import ArticleSerializer
import requests
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import os
import time
from urllib.parse import quote
from rest_framework.decorators import api_view
from django.utils import timezone
from django.utils.dateformat import DateFormat
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import logging
from functools import lru_cache

# Initialize logging
logger = logging.getLogger(__name__)

# Translation Analysis Model Setup
try:
    MODEL = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
    logger.info("Translation analysis model loaded successfully")
except Exception as e:
    MODEL = None
    logger.error(f"Failed to load analysis model: {str(e)}")

# Helper Functions for Translation Analysis
def split_into_chunks(text, chunk_size=500):
    """Split text into manageable chunks for analysis"""
    if not text:
        return []
    return [text[i:i+chunk_size] for i in range(0, len(text), chunk_size)]

@lru_cache(maxsize=100)
def get_semantic_similarity(text1, text2):
    """Calculate semantic similarity between two texts with caching"""
    if not MODEL or not text1 or not text2:
        return 0.0
    
    try:
        embeddings = MODEL.encode([text1, text2])
        return cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
    except Exception as e:
        logger.error(f"Similarity calculation failed: {str(e)}")
        return 0.0

def analyze_text_semantics(original, translated):
    """Perform comprehensive semantic analysis between original and translated text"""
    if not MODEL:
        return None
    
    try:
        # Prepare texts for comparison
        original_chunks = split_into_chunks(original)
        translated_chunks = split_into_chunks(translated)
        min_chunks = min(len(original_chunks), len(translated_chunks))
        
        if min_chunks == 0:
            return None

        # Compare chunks
        scores = []
        problematic = []
        
        for i in range(min_chunks):
            score = get_semantic_similarity(original_chunks[i], translated_chunks[i])
            scores.append(score)
            
            if score < 0.7:  # Threshold for problematic sections
                problematic.append({
                    'chunk_id': i,
                    'original': original_chunks[i],
                    'translation': translated_chunks[i],
                    'score': round(score, 2),
                    'issue_type': classify_issue(score)
                })

        # Calculate weighted overall score
        weights = [len(c) for c in original_chunks[:min_chunks]]
        overall_score = np.average(scores[:min_chunks], weights=weights)
        
        return {
            'score': overall_score,
            'problematic_chunks': problematic,
            'chunks_analyzed': min_chunks
        }
        
    except Exception as e:
        logger.error(f"Text analysis failed: {str(e)}")
        return None

def classify_issue(score):
    """Classify the severity of translation issues"""
    if score < 0.4:
        return "critical"
    elif score < 0.6:
        return "major"
    else:
        return "minor"

def generate_analysis_report(analysis_result, language):
    """Generate a human-readable analysis report"""
    if not analysis_result:
        return None
    
    needs_review = (analysis_result['score'] < 0.75 or 
                   len(analysis_result['problematic_chunks']) > 0)
    
    suggestions = []
    if analysis_result['score'] < 0.7:
        suggestions.append("Significant semantic differences detected")
    elif analysis_result['score'] < 0.85:
        suggestions.append("Moderate semantic differences detected")
    
    if analysis_result['problematic_chunks']:
        count = len(analysis_result['problematic_chunks'])
        suggestions.append(f"{count} problematic section{'' if count == 1 else 's'} requiring review")
    
    return {
        'language': language,
        'accuracy_score': round(analysis_result['score'], 2),
        'confidence': 'high' if analysis_result['score'] > 0.85 else 'medium' if analysis_result['score'] > 0.7 else 'low',
        'needs_human_review': needs_review,
        'problematic_sections': analysis_result['problematic_chunks'],
        'suggestions': suggestions if suggestions else ["Translation quality appears good"],
        'chunks_analyzed': analysis_result['chunks_analyzed']
    }

@api_view(['POST'])
def analyze_translation(request):
    """
    Analyze translation quality and identify problematic sections
    """
    try:
        original_text = request.data.get('original_text', '')
        translated_text = request.data.get('translated_text', '')
        language = request.data.get('language', 'so')
        
        if not original_text or not translated_text:
            return Response({'error': 'Missing original or translated text'}, 
                          status=status.HTTP_400_BAD_REQUEST)
        
        # Simple analysis (you can replace with more sophisticated NLP)
        analysis = {
            'accuracy_score': calculate_bleu_score(original_text, translated_text),
            'problematic_sections': identify_problematic_sections(original_text, translated_text),
            'needs_human_review': False,
            'suggestions': []
        }
        
        # Determine if human review is needed
        if analysis['accuracy_score'] < 0.7 or len(analysis['problematic_sections']) > 3:
            analysis['needs_human_review'] = True
            
        # Generate suggestions
        analysis['suggestions'] = generate_suggestions(analysis)
        
        return Response(analysis)
        
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def calculate_bleu_score(original, translation):
    """Calculate simple similarity score (0-1)"""
    # This is a simplified version - consider using actual BLEU or other metrics
    original_words = set(original.lower().split())
    translated_words = set(translation.lower().split())
    common_words = original_words & translated_words
    return len(common_words) / max(len(original_words), 1)

def identify_problematic_sections(original, translation):
    """Identify potentially problematic translation sections"""
    # Split into sentences
    original_sents = [s.strip() for s in original.split('.') if s.strip()]
    translated_sents = [s.strip() for s in translation.split('.') if s.strip()]
    
    problematic = []
    min_length = min(len(original_sents), len(translated_sents))
    
    for i in range(min_length):
        orig = original_sents[i].lower()
        trans = translated_sents[i].lower()
        
        # Simple check for major differences
        if len(orig.split()) > 5 and len(trans.split()) < 3:
            problematic.append({
                'id': f'section_{i}',
                'text': translated_sents[i],
                'original': original_sents[i],
                'issue': 'Possible incomplete translation'
            })
        elif orig in trans:  # Untranslated text
            problematic.append({
                'id': f'section_{i}',
                'text': translated_sents[i],
                'original': original_sents[i],
                'issue': 'Possible untranslated content'
            })
            
    return problematic

def generate_suggestions(analysis):
    """Generate suggestions based on analysis"""
    suggestions = []
    
    if analysis['accuracy_score'] < 0.7:
        suggestions.append("The translation has significant accuracy issues that may require human review")
        
    if len(analysis['problematic_sections']) > 0:
        suggestions.append(f"Review {len(analysis['problematic_sections'])} highlighted sections for accuracy")
        
    if not suggestions:
        suggestions.append("Translation appears to be good quality")
        
    return suggestions

@api_view(['GET'])
def get_categories(request):
    categories = [{'value': choice[0], 'label': choice[1]} for choice in Article.CATEGORY_CHOICES]
    return Response(categories)

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = []  # No authentication required

    def perform_create(self, serializer):
        """
        Create the article and its translations
        """
        article = serializer.save()
        
        # Only create translations if this is an English article
        if article.language == 'en':
            self.create_translations(article)

    def create_translations(self, original_article):
        """
        Create Somali and Kiswahili translations for an English article
        """
        target_languages = ['so', 'sw']  # Somali and Kiswahili language codes
        
        for target_lang in target_languages:
            try:
                # Skip if translation already exists
                if Article.objects.filter(
                    original_article=original_article, 
                    language=target_lang
                ).exists():
                    continue
                    
                # Translate title and content
                translated_title = self.translate_text(original_article.title, target_lang)
                translated_content = self.translate_text(original_article.content, target_lang)
                
                # Create the translated article
                translated_article = Article(
                    title=translated_title,
                    content=translated_content,
                    category=original_article.category,
                    language=target_lang,
                    original_article=original_article
                )

                # Copy media files
                self.copy_media_files(original_article, translated_article)
                translated_article.save()
                
            except Exception as e:
                print(f"Failed to create {target_lang} translation: {str(e)}")
                # Create fallback version if translation fails
                self.create_fallback_translation(original_article, target_lang)

    def translate_text(self, text, target_lang):
        """
        Translate text using Google Translate API
        """
        if not text:
            return text
            
        try:
            # Google Translate API endpoint
            url = f'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl={target_lang}&dt=t&q={quote(text)}'
            
            response = requests.get(url, timeout=5)
            
            if response.status_code == 200:
                # Parse Google Translate response
                return ''.join([x[0] for x in response.json()[0]])
            else:
                print(f"Translation API error: {response.status_code} - {response.text}")
                raise Exception(f"Translation API error: {response.text}")
                
        except Exception as e:
            print(f"Translation failed: {str(e)}")
            # Return original text with language marker if translation fails
            lang_name = 'Somali' if target_lang == 'so' else 'Kiswahili'
            return f"({lang_name}) {text}"

    def copy_media_files(self, source_article, target_article):
        """
        Copy image and video files from source to target article
        """
        try:
            if source_article.image:
                original_path = source_article.image.path
                new_name = os.path.basename(original_path)
                with default_storage.open(original_path, 'rb') as f:
                    target_article.image.save(new_name, ContentFile(f.read()), save=False)

            if source_article.video:
                original_path = source_article.video.path
                new_name = os.path.basename(original_path)
                with default_storage.open(original_path, 'rb') as f:
                    target_article.video.save(new_name, ContentFile(f.read()), save=False)
                    
        except Exception as e:
            print(f"Failed to copy media files: {str(e)}")

    def create_fallback_translation(self, article, target_lang):
        """
        Create a fallback translated article when automatic translation fails
        """
        try:
            lang_name = 'Somali' if target_lang == 'so' else 'Kiswahili'
            Article.objects.create(
                title=f"({lang_name}) {article.title}",
                content=article.content,  # Untranslated content
                category=article.category,
                language=target_lang,
                original_article=article
            )
            print(f"Created fallback {lang_name} article")
        except Exception as e:
            print(f"Failed to create {target_lang} fallback article: {str(e)}")

    @action(detail=True, methods=['delete'])
    def delete_article(self, request, pk=None):
        """
        Delete an article and its translations
        """
        article = self.get_object()
        try:
            # Delete associated translations if this is an English article
            if article.language == 'en':
                Article.objects.filter(original_article=article).delete()
            
            # Delete the article itself
            article.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """
        Update an article and its translations if it's an English article
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # Update translations if this is an English article
        if instance.language == 'en':
            self.update_translations(instance)
        
        return Response(serializer.data)

    def update_translations(self, english_article):
        """
        Update all translations when English article is updated
        """
        translations = Article.objects.filter(original_article=english_article)
        for translation in translations:
            try:
                # Retranslate title and content
                translation.title = self.translate_text(english_article.title, translation.language)
                translation.content = self.translate_text(english_article.content, translation.language)
                
                # Copy media files if they don't exist in translation
                if english_article.image and not translation.image:
                    self.copy_media_file(english_article.image, translation, 'image')
                if english_article.video and not translation.video:
                    self.copy_media_file(english_article.video, translation, 'video')
                
                translation.save()
            except Exception as e:
                print(f"Failed to update {translation.language} translation: {str(e)}")

    def copy_media_file(self, source_file, target_article, field_name):
        """
        Copy a single media file from source to target article
        """
        original_path = source_file.path
        new_name = os.path.basename(original_path)
        with default_storage.open(original_path, 'rb') as f:
            getattr(target_article, field_name).save(new_name, ContentFile(f.read()), save=False)

    def retrieve(self, request, *args, **kwargs):
        """
        Get an article, with option to get translated version
        """
        instance = self.get_object()
        language = request.query_params.get('language', 'en')

        # Get the appropriate version based on requested language
        if language != instance.language:
            if instance.language == 'en' and language in ['so', 'sw']:
                # Requesting translation of English article
                translated = Article.objects.filter(
                    original_article=instance, 
                    language=language
                ).first()
                if translated:
                    instance = translated
            elif instance.language in ['so', 'sw'] and language == 'en' and instance.original_article:
                # Requesting English version of translated article
                instance = instance.original_article

        serializer = self.get_serializer(instance)
        
        # Add localized date formatting
        data = serializer.data
        created_at = timezone.make_aware(timezone.datetime.strptime(
            data['created_at'], "%Y-%m-%dT%H:%M:%S.%fZ"
        ))
        data['localized_date'] = self.get_localized_date(created_at, language)
        
        return Response(data)

    def get_localized_date(self, date, language):
        """
        Format date according to language preferences
        """
        if language == 'so':
            # Somali date format: 21 Juun 2023, 14:30
            return DateFormat(date).format('j F Y, H:i')
        elif language == 'sw':
            # Kiswahili date format: 21 Juni 2023, 14:30
            months_sw = {
                1: 'Januari', 2: 'Februari', 3: 'Machi', 4: 'Aprili',
                5: 'Mei', 6: 'Juni', 7: 'Julai', 8: 'Agosti',
                9: 'Septemba', 10: 'Oktoba', 11: 'Novemba', 12: 'Desemba'
            }
            return f"{date.day} {months_sw[date.month]} {date.year}, {date.hour}:{date.minute:02d}"
        else:
            # English format: June 21, 2023, 2:30 PM
            return date.strftime('%B %d, %Y, %I:%M %p')
