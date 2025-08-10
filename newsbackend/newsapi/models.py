<<<<<<< HEAD
# # newsapi/models.py
# from django.db import models
=======

# from django.db import models
# from django.contrib.auth.models import User
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9

# class Article(models.Model):
#     LANGUAGE_CHOICES = [
#         ('en', 'English'),
#         ('so', 'Somali'),
#     ]
<<<<<<< HEAD
=======
    
#     CATEGORY_CHOICES = [
#         ('politics', 'Politics'),
#         ('sports', 'Sports'),
#         ('entertainment', 'Entertainment'),
#         ('technology', 'Technology'),
#         ('health', 'Health'),
#         ('business', 'Business'),
#     ]
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9

#     title = models.CharField(max_length=200)
#     content = models.TextField()
#     image = models.ImageField(upload_to='articles/images/', null=True, blank=True)
#     video = models.FileField(upload_to='articles/videos/', null=True, blank=True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     language = models.CharField(max_length=2, choices=LANGUAGE_CHOICES, default='en')
<<<<<<< HEAD
#     original_article = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
#     author = models.ForeignKey('auth.User', on_delete=models.SET_NULL, null=True, blank=True)  # Updated this line
=======
#     category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='politics')
#     original_article = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True)
#     author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9

#     def __str__(self):
#         return self.title

<<<<<<< HEAD

=======
# models.py
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    LANGUAGE_CHOICES = [
        ('en', 'English'),
        ('so', 'Somali'),
<<<<<<< HEAD
=======
        ('sw', 'Kiswahili'),
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
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
<<<<<<< HEAD
        return self.title
=======
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
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
