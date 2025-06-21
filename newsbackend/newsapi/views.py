# # newsapi/views.py
# from rest_framework import viewsets, status
# from rest_framework.response import Response
# from rest_framework.decorators import action
# from .models import Article
# from .serializers import ArticleSerializer
# import requests
# import json
# from django.core.files.base import ContentFile
# from django.core.files.storage import default_storage
# import os
# from django.conf import settings
# import time
# from urllib.parse import quote
# from rest_framework.decorators import api_view
# from django.utils import timezone
# from django.utils.dateformat import DateFormat

# @api_view(['GET'])
# def get_categories(request):
#     categories = [{'value': choice[0], 'label': choice[1]} for choice in Article.CATEGORY_CHOICES]
#     return Response(categories)

# class ArticleViewSet(viewsets.ModelViewSet):
#     queryset = Article.objects.all()
#     serializer_class = ArticleSerializer
#     permission_classes = []  # No authentication required

#     def perform_create(self, serializer):
#         article = serializer.save()
        
#         # Translate to Somali and Kiswahili if the article is in English
#         if article.language == 'en':
#             self.create_translations(article)

#     def create_translations(self, original_article):
#         """Create translations for both Somali and Kiswahili using Google Translate"""
#         target_languages = ['so', 'sw']  # Somali and Kiswahili language codes
        
#         for target_lang in target_languages:
#             try:
#                 # Skip if translation already exists
#                 if Article.objects.filter(original_article=original_article, language=target_lang).exists():
#                     continue
                    
#                 translated_title = self.translate_with_google(original_article.title, target_lang)
#                 translated_content = self.translate_with_google(original_article.content, target_lang)
                
#                 translated_article = Article(
#                     title=translated_title,
#                     content=translated_content,
#                     language=target_lang,
#                     original_article=original_article
#                 )

#                 self.copy_media_files(original_article, translated_article)
#                 translated_article.save()
                
#             except Exception as e:
#                 print(f"Failed to create {target_lang} translation: {str(e)}")
#                 # Create fallback version if translation fails
#                 self.create_fallback_translation(original_article, target_lang)

#     def translate_with_google(self, text, target_lang):
#         """Translate text using Google Translate API"""
#         if not text:
#             return text
            
#         try:
#             start_time = time.time()
#             url = f'https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl={target_lang}&dt=t&q={quote(text)}'
            
#             response = requests.get(url, timeout=5)
            
#             if response.status_code == 200:
#                 # Google Translate returns a nested array structure
#                 translated_text = ''.join([x[0] for x in response.json()[0]])
#                 elapsed = time.time() - start_time
#                 print(f"Successfully translated to {target_lang} in {elapsed:.2f} seconds")
#                 return translated_text
#             else:
#                 print(f"Google Translate returned {response.status_code}: {response.text}")
#                 raise Exception(f"Translation API error: {response.text}")
                
#         except Exception as e:
#             print(f"Google Translate failed: {str(e)}")
#             # Return original text with language marker if translation fails
#             lang_name = 'Somali' if target_lang == 'so' else 'Kiswahili'
#             return f"({lang_name}) {text}"

#     def copy_media_files(self, source_article, target_article):
#         """Copy media files from source to translated article"""
#         try:
#             if source_article.image:
#                 original_image_path = source_article.image.path
#                 new_image_name = os.path.basename(original_image_path)
#                 with default_storage.open(original_image_path, 'rb') as f:
#                     target_article.image.save(new_image_name, ContentFile(f.read()), save=False)

#             if source_article.video:
#                 original_video_path = source_article.video.path
#                 new_video_name = os.path.basename(original_video_path)
#                 with default_storage.open(original_video_path, 'rb') as f:
#                     target_article.video.save(new_video_name, ContentFile(f.read()), save=False)
                    
#         except Exception as e:
#             print(f"Failed to copy media files: {str(e)}")

#     def create_fallback_translation(self, article, target_lang):
#         """Create a minimal translated version when translation fails"""
#         try:
#             lang_name = 'Somali' if target_lang == 'so' else 'Kiswahili'
#             Article.objects.create(
#                 title=f"({lang_name}) {article.title}",
#                 content=article.content,  # Untranslated content
#                 language=target_lang,
#                 original_article=article
#             )
#             print(f"Created fallback {lang_name} article (untranslated content)")
#         except Exception as e:
#             print(f"Failed to create {target_lang} fallback article: {str(e)}")

#     @action(detail=True, methods=['delete'])
#     def delete_article(self, request, pk=None):
#         article = self.get_object()
#         try:
#             # Delete associated translations if exists
#             if article.language == 'en':
#                 translations = Article.objects.filter(original_article=article)
#                 translations.delete()
            
#             # Delete the article
#             article.delete()
#             return Response(status=status.HTTP_204_NO_CONTENT)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

#     def update(self, request, *args, **kwargs):
#         instance = self.get_object()
#         serializer = self.get_serializer(instance, data=request.data, partial=True)
#         serializer.is_valid(raise_exception=True)
#         self.perform_update(serializer)
        
#         # If English article is updated, update translations too
#         if instance.language == 'en':
#             self.update_translations(instance)
        
#         return Response(serializer.data)

#     def update_translations(self, english_article):
#         """Update all translations when English article is updated"""
#         translations = Article.objects.filter(original_article=english_article)
#         for translation in translations:
#             try:
#                 translation.title = self.translate_with_google(english_article.title, translation.language)
#                 translation.content = self.translate_with_google(english_article.content, translation.language)
                
#                 # Handle media files
#                 if english_article.image and not translation.image:
#                     self.copy_media_file(english_article.image, translation, 'image')
#                 if english_article.video and not translation.video:
#                     self.copy_media_file(english_article.video, translation, 'video')
                
#                 translation.save()
#             except Exception as e:
#                 print(f"Failed to update {translation.language} translation: {str(e)}")

#     def copy_media_file(self, source_file, target_article, field_name):
#         original_path = source_file.path
#         new_name = os.path.basename(original_path)
#         with default_storage.open(original_path, 'rb') as f:
#             getattr(target_article, field_name).save(new_name, ContentFile(f.read()), save=False)

#     def retrieve(self, request, *args, **kwargs):
#         instance = self.get_object()
#         language = request.query_params.get('language', 'en')

#         # Get the appropriate version based on requested language
#         if language != instance.language:
#             if instance.language == 'en' and language in ['so', 'sw']:
#                 # Requesting translation of English article
#                 translated = Article.objects.filter(
#                     original_article=instance, 
#                     language=language
#                 ).first()
#                 if translated:
#                     instance = translated
#             elif instance.language in ['so', 'sw'] and language == 'en' and instance.original_article:
#                 # Requesting English version of translated article
#                 instance = instance.original_article

#         serializer = self.get_serializer(instance)
        
#         # Add localized date formatting
#         data = serializer.data
#         created_at = timezone.make_aware(timezone.datetime.strptime(
#             data['created_at'], "%Y-%m-%dT%H:%M:%S.%fZ"
#         ))
#         data['localized_date'] = self.get_localized_date(created_at, language)
        
#         return Response(data)

#     def get_localized_date(self, date, language):
#         """Return date formatted according to language preferences"""
#         if language == 'so':
#             # Somali date format: 21 Juun 2023, 14:30
#             return DateFormat(date).format('j F Y, H:i')
#         elif language == 'sw':
#             # Kiswahili date format: 21 Juni 2023, 14:30
#             months_sw = {
#                 1: 'Januari', 2: 'Februari', 3: 'Machi', 4: 'Aprili',
#                 5: 'Mei', 6: 'Juni', 7: 'Julai', 8: 'Agosti',
#                 9: 'Septemba', 10: 'Oktoba', 11: 'Novemba', 12: 'Desemba'
#             }
#             return f"{date.day} {months_sw[date.month]} {date.year}, {date.hour}:{date.minute:02d}"
#         else:
#             # English format: June 21, 2023, 2:30 PM
#             return date.strftime('%B %d, %Y, %I:%M %p')



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