from django.contrib import admin
from .models import Article

class ArticleAdmin(admin.ModelAdmin):
    # Show only original articles (English) in the list view
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(original_article__isnull=True)  # Only show originals
    
    list_display = ('title', 'language', 'category', 'created_at')
    list_filter = ('language', 'category', 'created_at')
    
    # Custom change form to show all translations
    def changeform_view(self, request, object_id=None, form_url='', extra_context=None):
        if object_id:  # Only when editing an existing article
            article = Article.objects.get(pk=object_id)
            original = article.original_article or article
            translations = Article.objects.filter(
                models.Q(pk=original.pk) | 
                models.Q(original_article=original)
            ).order_by('language')
            
            extra_context = extra_context or {}
            extra_context['translations'] = translations
        
        return super().changeform_view(request, object_id, form_url, extra_context)

admin.site.register(Article, ArticleAdmin)