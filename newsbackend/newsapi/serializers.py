# newsapi/serializers.py
from rest_framework import serializers
from .models import Article
from django.conf import settings

class ArticleSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    video = serializers.SerializerMethodField()
    
    class Meta:
        model = Article
        fields = ['id', 'title', 'content', 'image', 'video', 'created_at', 'language', 'category', 'original_article']
        read_only_fields = ['created_at', 'original_article']
    
    def get_image(self, obj):
        if obj.image:
            # Return URL through our CORS-enabled media endpoint
            return f"/api/media/{obj.image.name}"
        return None
    
    def get_video(self, obj):
        if obj.video:
            # Return URL through our CORS-enabled media endpoint
            return f"/api/media/{obj.video.name}"
        return None
    
    def create(self, validated_data):
        # Handle file uploads during creation
        image = validated_data.pop('image', None)
        video = validated_data.pop('video', None)
        
        article = Article.objects.create(**validated_data)
        
        if image:
            article.image = image
        if video:
            article.video = video
            
        article.save()
        return article
    
    def update(self, instance, validated_data):
        # Handle file uploads during update
        image = validated_data.pop('image', None)
        video = validated_data.pop('video', None)
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        if image:
            instance.image = image
        if video:
            instance.video = video
            
        instance.save()
        return instance