# newsapi/serializers.py
from rest_framework import serializers
from .models import Article

<<<<<<< HEAD
# class ArticleSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Article
#         fields = ['id', 'title', 'content', 'image', 'video', 'created_at', 'language', 'original_article']
#         read_only_fields = ['created_at', 'original_article', 'language']

=======
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'image', 'video', 'created_at', 'language', 'category', 'original_article']
        read_only_fields = ['created_at', 'original_article', 'language']