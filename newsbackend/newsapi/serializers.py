# newsapi/serializers.py
from rest_framework import serializers
from .models import Article


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'image', 'video', 'created_at', 'language', 'category', 'original_article']
        read_only_fields = ['created_at', 'original_article', 'language']