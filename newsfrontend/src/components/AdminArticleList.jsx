
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Globe, Calendar, Tag, Image, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = 'http://localhost:8000';
  const navigate = useNavigate();

  // Fetch only English articles
  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/articles/?language=en`);
      if (!response.ok) {
        throw new Error('Failed to fetch articles');
      }
      const data = await response.json();
      // Filter to only show English articles (original articles)
      const englishArticles = data.filter(article => article.language === 'en');
      setArticles(englishArticles);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleViewArticle = (article) => {
    navigate(`/admin/articles/${article.id}`);
  };

  const handleDeleteArticle = async (articleId) => {
  if (window.confirm('Are you sure you want to delete this article and all its translations?')) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/delete_article/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchArticles(); // Refresh the list
      } else {
        throw new Error('Failed to delete article');
      }
    } catch (err) {
      alert('Error deleting article: ' + err.message);
    }
  }
};

  const getLanguageName = (code) => {
    const names = {
      'en': 'English',
      'so': 'Somali',
      'sw': 'Kiswahili'
    };
    return names[code] || code;
  };

  const getCategoryName = (category) => {
    const categories = {
      'politics': 'Politics',
      'business': 'Business',
      'technology': 'Technology',
      'sports': 'Sports',
      'entertainment': 'Entertainment',
      'health': 'Health',
      'science': 'Science',
      'world': 'World News'
    };
    return categories[category] || category;
  };

  const getCategoryColor = (category) => {
    const colors = {
      'politics': 'bg-purple-100 text-purple-800',
      'business': 'bg-green-100 text-green-800',
      'technology': 'bg-blue-100 text-blue-800',
      'sports': 'bg-orange-100 text-orange-800',
      'entertainment': 'bg-pink-100 text-pink-800',
      'health': 'bg-red-100 text-red-800',
      'science': 'bg-indigo-100 text-indigo-800',
      'world': 'bg-gray-100 text-gray-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-spin mx-auto" style={{animationDelay: '0.1s', animationDuration: '1.5s'}}></div>
          </div>
          <p className="mt-6 text-slate-600 font-medium">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-xl font-semibold text-slate-900 mb-2">Error loading articles</p>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={fetchArticles}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Article Management
              </h1>
              <p className="mt-2 text-slate-600">Manage your news articles and translations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium">
                {articles.length} Articles
              </div>
              <button 
                onClick={fetchArticles}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium hover:shadow-lg"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Article List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {articles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="h-12 w-12 text-slate-400" />
            </div>
            <p className="text-slate-500 text-lg font-medium">No articles found</p>
            <p className="text-slate-400 mt-2">Create your first article to get started</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div key={article.id} className="group relative">
                <div 
                  onClick={() => handleViewArticle(article)}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-200/50 hover:border-slate-300/50 overflow-hidden"
                >
                  {/* Article Image */}
                  {article.image && (
                    <div className="h-48 w-full overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <div className="p-6">
                    {/* Category and Date */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                        <Tag className="h-3 w-3 mr-1" />
                        {getCategoryName(article.category)}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(article.created_at)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </h3>

                    {/* Content Preview */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                      {truncateText(article.content)}
                    </p>

                    {/* Media Indicators */}
                    {(article.image || article.video) && (
                      <div className="flex items-center space-x-4 mb-4">
                        {article.image && (
                          <span className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                            <Image className="h-3 w-3 mr-1" />
                            Image
                          </span>
                        )}
                        {article.video && (
                          <span className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
                            <Video className="h-3 w-3 mr-1" />
                            Video
                          </span>
                        )}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-400 font-mono">ID: {article.id}</span>
                      <div className="text-xs text-slate-500">
                        Click to view all versions
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete Button - Positioned absolute */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteArticle(article.id);
                  }}
                  className="absolute top-4 right-4 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-600 transition-all duration-200 shadow-lg"
                  title="Delete article and all translations"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminArticleList;
