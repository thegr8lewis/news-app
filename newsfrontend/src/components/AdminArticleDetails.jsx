
import React, { useState, useEffect } from 'react';
import { 
  Edit, 
  Trash2, 
  X, 
  Globe, 
  Calendar, 
  Tag, 
  Image as ImageIcon, 
  Video as VideoIcon, 
  ChevronLeft, 
  Save, 
  Loader2, 
  AlertTriangle, 
  CheckCircle,
  Gauge,
  CircleAlert,
  Lightbulb,
  Eye,
  Clock,
  FileText,
  Upload,
  Sparkles
} from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import TranslationAnalysis from './TranslationAnalysis';

const AdminArticleDetails = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const [articleVersions, setArticleVersions] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingVersion, setEditingVersion] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    content: '',
    category: '',
    image: null,
    video: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [analysisResults, setAnalysisResults] = useState({});
  const [loadingAnalysis, setLoadingAnalysis] = useState({});
  const [activeTab, setActiveTab] = useState('en');

  const API_BASE_URL = 'http://localhost:8000';

  const categories = [
    { value: 'politics', label: 'Politics', icon: '🏛️' },
    { value: 'business', label: 'Business', icon: '💼' },
    { value: 'technology', label: 'Technology', icon: '⚡' },
    { value: 'sports', label: 'Sports', icon: '⚽' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎭' },
    { value: 'health', label: 'Health', icon: '❤️' },
    { value: 'science', label: 'Science', icon: '🔬' },
    { value: 'world', label: 'World News', icon: '🌍' }
  ];

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'so', name: 'Somali', flag: '🇸🇴' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' }
  ];

  const fetchArticleVersions = async () => {
    try {
      setLoading(true);
      const versions = {};

      for (const lang of languages) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/?language=${lang.code}`);
          if (response.ok) {
            const data = await response.json();
            versions[lang.code] = data;
          }
        } catch (error) {
          console.error(`Failed to fetch ${lang.code} version:`, error);
          versions[lang.code] = null;
        }
      }

      setArticleVersions(versions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const analyzeTranslation = async (language) => {
    try {
      setLoadingAnalysis(prev => ({ ...prev, [language]: true }));
      
      const response = await fetch(`${API_BASE_URL}/api/analyze-translation/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_text: articleVersions.en?.content,
          translated_text: articleVersions[language]?.content,
          language
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze translation');
      }

      const data = await response.json();
      setAnalysisResults(prev => ({
        ...prev,
        [language]: data
      }));
    } catch (err) {
      console.error(`Error analyzing ${language} translation:`, err);
      setAnalysisResults(prev => ({
        ...prev,
        [language]: { error: err.message }
      }));
    } finally {
      setLoadingAnalysis(prev => ({ ...prev, [language]: false }));
    }
  };

  const handleEditClick = (version, language) => {
    setEditingVersion(language);
    setEditFormData({
      title: version?.title || '',
      content: version?.content || '',
      category: version?.category || 'politics',
      image: null,
      video: null
    });
    setPreviewImage(version?.image || null);
    setPreviewVideo(version?.video || null);
    setEditModalOpen(true);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setEditFormData(prev => ({ ...prev, [name]: files[0] }));

      if (name === 'image') {
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(files[0]);
      } else if (name === 'video') {
        setPreviewVideo(URL.createObjectURL(files[0]));
      }
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const formData = new FormData();
      formData.append('title', editFormData.title);
      formData.append('content', editFormData.content);
      formData.append('category', editFormData.category);
      formData.append('language', editingVersion);
      if (editFormData.image) formData.append('image', editFormData.image);
      if (editFormData.video) formData.append('video', editFormData.video);

      const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/`, {
        method: 'PUT',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update article');
      }

      await fetchArticleVersions();
      setEditModalOpen(false);
    } catch (err) {
      alert('Error updating article: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteArticle = async () => {
    setShowDeleteConfirm(false);
    try {
      const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/`, {
        method: 'DELETE',
      });
      if (response.ok) {
        navigate('/admin/articles');
      } else {
        throw new Error('Failed to delete article');
      }
    } catch (err) {
      alert('Error deleting article: ' + err.message);
    }
  };

  const getLanguageInfo = (code) => {
    return languages.find(lang => lang.code === code) || { name: code, flag: '🌐' };
  };

  const getCategoryInfo = (category) => {
    return categories.find(cat => cat.value === category) || { label: category, icon: '📄' };
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

  useEffect(() => {
    fetchArticleVersions();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto"></div>
          <div className="mt-6 space-y-2">
            <p className="text-lg font-medium text-gray-800">Loading article details</p>
            <p className="text-gray-500">Preparing your multilingual content...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-lg">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-gray-700" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/admin/articles')}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium"
          >
            <ChevronLeft className="h-4 w-4 mr-2 inline" />
            Back to Articles
          </button>
        </div>
      </div>
    );
  }

  const activeVersion = articleVersions[activeTab];
  const activeLangInfo = getLanguageInfo(activeTab);

  return (
    <div className="min-h-screen bg-gray-40">
  
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Language Tabs */}
        <div className="bg-white rounded-lg p-1 border border-gray-200 mb-6">
          
          <div className="flex">
            {languages.map((lang) => {
              const version = articleVersions[lang.code];
              const isActive = activeTab === lang.code;
              
              return (
                <button
                  key={lang.code}
                  onClick={() => setActiveTab(lang.code)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-gray-100 text-gray-900 border-b-2 border-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.name}</span>
                  {version ? (
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  ) : (
                    <CircleAlert className="h-3 w-3 text-gray-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab Header */}
          <div className="bg-gray-50 p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{activeLangInfo.flag}</div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{activeLangInfo.name} Version</h2>
                  <div className="flex items-center mt-1 space-x-3">
                    {activeVersion ? (
                      <>
                        <div className="flex items-center space-x-1 bg-green-50 text-green-700 rounded-full px-2 py-1 text-xs font-medium">
                          <CheckCircle className="h-3 w-3" />
                          <span>Available</span>
                        </div>
                        {activeTab !== 'en' && (
                          <button
                            onClick={() => analyzeTranslation(activeTab)}
                            disabled={loadingAnalysis[activeTab]}
                            className="flex items-center space-x-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-full px-2 py-1 text-xs font-medium transition-colors"
                          >
                            {loadingAnalysis[activeTab] ? (
                              <>
                                <Loader2 className="h-3 w-3 animate-spin" />
                                <span>Analyzing...</span>
                              </>
                            ) : (
                              <>
                                <Lightbulb className="h-3 w-3" />
                                <span>Check Quality</span>
                              </>
                            )}
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center space-x-1 bg-red-50 text-red-700 rounded-full px-2 py-1 text-xs font-medium">
                        <CircleAlert className="h-3 w-3" />
                        <span>Not Available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {activeVersion && (
                <button
                  onClick={() => handleEditClick(activeVersion, activeTab)}
                  className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <Edit className="h-5 w-5 text-gray-700" />
                </button>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeVersion ? (
              <div className="space-y-6">
                {/* Media Section */}
                {(activeVersion.image || activeVersion.video) && (
                  <div className="space-y-4">
                    {activeVersion.image && (
                      <div className="rounded-lg overflow-hidden bg-gray-100">
                        <img 
                          src={activeVersion.image} 
                          alt={activeVersion.title}
                          className="w-full h-auto max-h-96 object-cover"
                        />
                      </div>
                    )}

                    {activeVersion.video && (
                      <div className="rounded-lg overflow-hidden bg-black">
                        <video 
                          controls
                          className="w-full h-auto max-h-96"
                        >
                          <source src={activeVersion.video} type="video/mp4" />
                        </video>
                      </div>
                    )}
                  </div>
                )}

                {/* Translation Analysis */}
                {analysisResults[activeTab] && activeTab !== 'en' && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <TranslationAnalysis 
                      analysis={analysisResults[activeTab]} 
                      language={activeTab}
                      originalContent={articleVersions.en?.content}
                      translatedContent={activeVersion.content}
                    />
                  </div>
                )}

                {/* Article Content */}
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {activeVersion.title}
                      </h3>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {(() => {
                            const categoryInfo = getCategoryInfo(activeVersion.category);
                            return (
                              <div className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                                <span className="mr-1">{categoryInfo.icon}</span>
                                <span>{categoryInfo.label}</span>
                              </div>
                            );
                          })()}
                        </div>
                        
                        <div className="flex items-center text-gray-500 text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{formatDate(activeVersion.created_at)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none text-gray-700">
                      {activeVersion.content.split('\n').map((paragraph, i) => (
                        paragraph.trim() && (
                          <p key={i} className="mb-4">
                            {paragraph}
                          </p>
                        )
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Content Not Available</h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm mb-4">
                  This version hasn't been created yet. The translation may have failed or is still being processed.
                </p>
                <button
                  onClick={() => handleEditClick(null, activeTab)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center mx-auto"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Create Version
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[95vh] overflow-hidden border border-gray-200">
            <div className="bg-gray-900 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{getLanguageInfo(editingVersion).flag}</div>
                  <div>
                    <h2 className="text-lg font-semibold">Edit {getLanguageInfo(editingVersion).name}</h2>
                    <p className="text-gray-300 text-sm">Update content and media</p>
                  </div>
                </div>
                <button
                  onClick={() => setEditModalOpen(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto max-h-[calc(95vh-120px)]">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Article Title</label>
                      <input
                        type="text"
                        name="title"
                        value={editFormData.title}
                        onChange={handleEditFormChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                        placeholder="Enter article title..."
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        value={editFormData.category}
                        onChange={handleEditFormChange}
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all text-sm"
                        required
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.icon} {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                      <div className="relative">
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="block w-full h-28 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <Upload className="h-5 w-5 text-gray-400 mb-1" />
                            <span className="text-xs font-medium text-gray-500">
                              {previewImage ? 'Change image' : 'Upload image'}
                            </span>
                          </div>
                        </label>
                        {previewImage && (
                          <div className="mt-2 rounded-lg overflow-hidden">
                            <img src={previewImage} alt="Preview" className="w-full h-28 object-cover" />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Video Upload */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Video Content</label>
                      <div className="relative">
                        <input
                          type="file"
                          name="video"
                          accept="video/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="video-upload"
                        />
                        <label
                          htmlFor="video-upload"
                          className="block w-full h-28 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center h-full">
                            <VideoIcon className="h-5 w-5 text-gray-400 mb-1" />
                            <span className="text-xs font-medium text-gray-500">
                              {previewVideo ? 'Change video' : 'Upload video'}
                            </span>
                          </div>
                        </label>
                        {previewVideo && (
                          <div className="mt-2 rounded-lg overflow-hidden bg-black">
                            <video src={previewVideo} className="w-full h-28 object-cover" controls />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Textarea */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Article Content</label>
                  <textarea
                    name="content"
                    value={editFormData.content}
                    onChange={handleEditFormChange}
                    rows={10}
                    className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition-all resize-none text-sm"
                    placeholder="Write your article content here..."
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => setEditModalOpen(false)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden border border-gray-200">
            <div className="bg-gray-900 text-white p-6 text-center">
              <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold">Delete Article</h2>
              <p className="text-gray-300 text-sm mt-1">This action cannot be undone</p>
            </div>

            <div className="p-6">
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-900">
                    Are you sure you want to delete this article?
                  </p>
                  <p className="text-gray-600 text-sm">
                    This will permanently remove all language versions and associated media files.
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteArticle}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Forever
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticleDetails;