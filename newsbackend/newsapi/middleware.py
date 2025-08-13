from django.http import HttpResponse
from django.conf import settings
import os
import mimetypes

class MediaCORSMiddleware:
    """Middleware to add CORS headers to media files"""
    
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        # Add CORS headers to media files
        if request.path.startswith('/media/'):
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
            response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
            response['Cross-Origin-Resource-Policy'] = 'cross-origin'
            response['Cross-Origin-Embedder-Policy'] = 'unsafe-none'
            
        return response