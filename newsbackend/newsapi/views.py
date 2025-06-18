# newsapi/views.py
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Article
from .serializers import ArticleSerializer
import requests
import json
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
import os
from django.conf import settings
import time
from urllib.parse import quote

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = []  # No authentication required

    def perform_create(self, serializer):
        article = serializer.save()
        
        # Translate to Somali if the article is in English
        if article.language == 'en':
            self.translate_article(article)

    def translate_article(self, article):
        """Handle the complete article translation process"""
        try:
            # First translate the title
            translated_title = self.translate_with_fallback(article.title)
            
            # Then translate the content
            translated_content = self.translate_with_fallback(article.content)
            
            # Create the translated article
            translated_article = Article(
                title=translated_title,
                content=translated_content,
                language='so',
                original_article=article
            )

            # Handle media files
            self.copy_media_files(article, translated_article)
            
            translated_article.save()
            
        except Exception as e:
            print(f"Failed to translate article: {str(e)}")
            # Create minimal Somali version if full translation fails
            self.create_fallback_somali_article(article)

    def translate_with_fallback(self, text):
        """Attempt translation with multiple fallback methods"""
        # Try professional translation services first
        translated = self.try_professional_translation(text)
        if translated:
            return translated
            
        # Try community translation APIs
        translated = self.try_community_translation(text)
        if translated:
            return translated
            
        # Final fallback - return original text with Somali marker
        return f"(Somali) {text}"

    def try_professional_translation(self, text):
        """Try more reliable translation services (may require API keys)"""
        # Add your professional translation API calls here
        # Example: Google Translate, DeepL, etc.
        return None

    def try_community_translation(self, text):
        """Try community/free translation APIs with robust error handling"""
        services = [
            {
                'url': 'https://libretranslate.com/translate',
                'method': 'POST',
                'data': {'q': text, 'source': 'en', 'target': 'so'},
                'headers': {'Content-Type': 'application/json'}
            },
            {
                'url': f'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=so&dt=t&q={quote(text)}',
                'method': 'GET'
            }
        ]
        
        for service in services:
            try:
                start_time = time.time()
                
                if service['method'] == 'POST':
                    response = requests.post(
                        service['url'],
                        json=service.get('data'),
                        headers=service.get('headers', {}),
                        timeout=10
                    )
                else:
                    response = requests.get(
                        service['url'],
                        timeout=10
                    )
                
                if response.status_code == 200:
                    # Parse different response formats
                    if 'googleapis' in service['url']:
                        # Google Translate response format
                        return ''.join([x[0] for x in response.json()[0]])
                    else:
                        # LibreTranslate format
                        return response.json().get('translatedText')
                
                print(f"Translation service returned {response.status_code}: {response.text}")
                
            except requests.exceptions.RequestException as e:
                print(f"Translation failed with {service['url']}: {str(e)}")
                continue
            except json.JSONDecodeError:
                print(f"Invalid JSON response from {service['url']}")
                continue
            except Exception as e:
                print(f"Unexpected error with {service['url']}: {str(e)}")
                continue
                
            finally:
                elapsed = time.time() - start_time
                print(f"Translation attempt took {elapsed:.2f} seconds")
        
        return None

    def copy_media_files(self, source_article, target_article):
        """Copy media files from source to translated article"""
        try:
            if source_article.image:
                original_image_path = source_article.image.path
                new_image_name = os.path.basename(original_image_path)
                with default_storage.open(original_image_path, 'rb') as f:
                    target_article.image.save(new_image_name, ContentFile(f.read()), save=False)

            if source_article.video:
                original_video_path = source_article.video.path
                new_video_name = os.path.basename(original_video_path)
                with default_storage.open(original_video_path, 'rb') as f:
                    target_article.video.save(new_video_name, ContentFile(f.read()), save=False)
                    
        except Exception as e:
            print(f"Failed to copy media files: {str(e)}")

    def create_fallback_somali_article(self, article):
        """Create a minimal Somali version when translation fails"""
        try:
            Article.objects.create(
                title=f"(Somali) {article.title}",
                content=article.content,  # Untranslated content
                language='so',
                original_article=article
            )
            print("Created fallback Somali article (untranslated content)")
        except Exception as e:
            print(f"Failed to create fallback article: {str(e)}")

    @action(detail=True, methods=['delete'])
    def delete_article(self, request, pk=None):
        article = self.get_object()
        try:
            # Delete associated Somali version if exists
            if article.language == 'en':
                somali_version = Article.objects.filter(original_article=article).first()
                if somali_version:
                    somali_version.delete()
            
            # Delete the article
            article.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        
        # If English article is updated, update Somali version too
        if instance.language == 'en':
            self.update_somali_version(instance)
        
        return Response(serializer.data)

    def update_somali_version(self, english_article):
        somali_article = Article.objects.filter(original_article=english_article).first()
        if somali_article:
            # Update title and content
            somali_article.title = self.translate_with_fallback(english_article.title)
            somali_article.content = self.translate_with_fallback(english_article.content)
            
            # Handle media files
            if english_article.image and not somali_article.image:
                self.copy_media_file(english_article.image, somali_article, 'image')
            if english_article.video and not somali_article.video:
                self.copy_media_file(english_article.video, somali_article, 'video')
            
            somali_article.save()

    def copy_media_file(self, source_file, target_article, field_name):
        original_path = source_file.path
        new_name = os.path.basename(original_path)
        with default_storage.open(original_path, 'rb') as f:
            getattr(target_article, field_name).save(new_name, ContentFile(f.read()), save=False)

    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        language = request.query_params.get('language', 'en')

        # If the original is English and Somali is requested
        if language == 'so' and instance.language == 'en':
            translated = Article.objects.filter(original_article=instance, language='so').first()
            if translated:
                instance = translated

        # If the article *is* Somali and English is requested (optional reverse)
        elif language == 'en' and instance.language == 'so' and instance.original_article:
            instance = instance.original_article

        serializer = self.get_serializer(instance)
        return Response(serializer.data)
