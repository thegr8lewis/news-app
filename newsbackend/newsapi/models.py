
# from django.db import models
# from django.contrib.auth.models import User

# class Article(models.Model):
#     LANGUAGE_CHOICES = [
#         ('en', 'English'),
#         ('so', 'Somali'),
#     ]
    
#     CATEGORY_CHOICES = [
#         ('politics', 'Politics'),
#         ('sports', 'Sports'),
#         ('entertainment', 'Entertainment'),
#         ('technology', 'Technology'),
#         ('health', 'Health'),
#         ('business', 'Business'),
#     ]

#     title = models.CharField(max_length=200)
#     content = models.TextField()
#     image = models.ImageField(upload_to='articles/images/', null=True, blank=True)
#     video = models.FileField(upload_to='articles/videos/', null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='en')
#     category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='politics')
#     original_article = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
#     author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

#     def __str__(self):
#         return self.title

# models.py
from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('so', 'Somali'),
        ('sw', 'Kiswahili'),
    ]
    
    CATEGORY_CHOICES = [
        ('politics', 'Politics'),
        ('sports', 'Sports'),
        ('entertainment', 'Entertainment'),
        ('technology', 'Technology'),
        ('health', 'Health'),
        ('business', 'Business'),
    ]

    title = models.CharField(max_length=200)
    content = models.TextField()
    image = models.ImageField(upload_to='articles/images/', null=True, blank=True)
    video = models.FileField(upload_to='articles/videos/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='en')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='politics')
    original_article = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.title

    def get_translated_version(self, target_language):
        """Get the translated version of this article in the specified language"""
        if self.language == target_language:
            return self
        
        if target_language == 'en' and self.original_article:
            return self.original_article
            
        if self.language == 'en':
            return Article.objects.filter(original_article=self, language=target_language).first()
            
        return None