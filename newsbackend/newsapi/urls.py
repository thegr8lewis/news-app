# newsapi/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
<<<<<<< HEAD
from .views import ArticleViewSet
=======
from .views import ArticleViewSet, analyze_translation
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
from .views import get_categories

router = DefaultRouter()
router.register(r'articles', ArticleViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # Add this to handle both /articles/<pk>/ and /articles/<pk>
    path('articles/<int:pk>', ArticleViewSet.as_view({'get': 'retrieve'}), name='article-detail-no-slash'),
    path('categories/', get_categories, name='get-categories'),
<<<<<<< HEAD
]
=======
    path('analyze-translation/', analyze_translation, name='analyze-translation'),
]

>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
