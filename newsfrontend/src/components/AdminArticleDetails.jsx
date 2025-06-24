// import React, { useState, useEffect } from 'react';
// import { Edit, Trash2, X, Globe, Calendar, Tag, Image as ImageIcon, Video as VideoIcon, ChevronLeft, Save, Loader2 } from 'lucide-react';
// import { useParams, useNavigate } from 'react-router-dom';

// const AdminArticleDetails = () => {
//   const { articleId } = useParams();
//   const navigate = useNavigate();
//   const [articleVersions, setArticleVersions] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editingVersion, setEditingVersion] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     title: '',
//     content: '',
//     category: '',
//     image: null,
//     video: null
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [previewVideo, setPreviewVideo] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   const API_BASE_URL = 'http://localhost:8000';

//   const categories = [
//     { value: 'politics', label: 'Politics' },
//     { value: 'business', label: 'Business' },
//     { value: 'technology', label: 'Technology' },
//     { value: 'sports', label: 'Sports' },
//     { value: 'entertainment', label: 'Entertainment' },
//     { value: 'health', label: 'Health' },
//     { value: 'science', label: 'Science' },
//     { value: 'world', label: 'World News' }
//   ];

//   // Fetch all versions of a specific article
//   const fetchArticleVersions = async () => {
//     try {
//       setLoading(true);
//       const languages = ['en', 'so', 'sw'];
//       const versions = {};

//       for (const lang of languages) {
//         try {
//           const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/?language=${lang}`);
//           if (response.ok) {
//             const data = await response.json();
//             versions[lang] = data;
//           }
//         } catch (error) {
//           console.error(`Failed to fetch ${lang} version:`, error);
//           versions[lang] = null;
//         }
//       }

//       setArticleVersions(versions);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditClick = (version, language) => {
//     setEditingVersion(language);
//     setEditFormData({
//       title: version?.title || '',
//       content: version?.content || '',
//       category: version?.category || 'politics',
//       image: null,
//       video: null
//     });
//     setPreviewImage(version?.image || null);
//     setPreviewVideo(version?.video || null);
//     setEditModalOpen(true);
//   };

//   const handleEditFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (files[0]) {
//       setEditFormData(prev => ({ ...prev, [name]: files[0] }));

//       if (name === 'image') {
//         const reader = new FileReader();
//         reader.onload = () => setPreviewImage(reader.result);
//         reader.readAsDataURL(files[0]);
//       } else if (name === 'video') {
//         setPreviewVideo(URL.createObjectURL(files[0]));
//       }
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setIsSaving(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('title', editFormData.title);
//       formData.append('content', editFormData.content);
//       formData.append('category', editFormData.category);
//       formData.append('language', editingVersion);
//       if (editFormData.image) formData.append('image', editFormData.image);
//       if (editFormData.video) formData.append('video', editFormData.video);

//       const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/`, {
//         method: 'PUT',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update article');
//       }

//       await fetchArticleVersions();
//       setEditModalOpen(false);
//     } catch (err) {
//       alert('Error updating article: ' + err.message);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteArticle = async () => {
//     setShowDeleteConfirm(false);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         navigate('/admin/articles'); // Redirect back to list
//       } else {
//         throw new Error('Failed to delete article');
//       }
//     } catch (err) {
//       alert('Error deleting article: ' + err.message);
//     }
//   };

//   const getLanguageName = (code) => {
//     const names = {
//       'en': 'English',
//       'so': 'Somali',
//       'sw': 'Kiswahili'
//     };
//     return names[code] || code;
//   };

//   const getCategoryName = (category) => {
//     const categories = {
//       'politics': 'Politics',
//       'business': 'Business',
//       'technology': 'Technology',
//       'sports': 'Sports',
//       'entertainment': 'Entertainment',
//       'health': 'Health',
//       'science': 'Science',
//       'world': 'World News'
//     };
//     return categories[category] || category;
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'politics': 'bg-purple-100 text-purple-800',
//       'business': 'bg-green-100 text-green-800',
//       'technology': 'bg-blue-100 text-blue-800',
//       'sports': 'bg-orange-100 text-orange-800',
//       'entertainment': 'bg-pink-100 text-pink-800',
//       'health': 'bg-red-100 text-red-800',
//       'science': 'bg-indigo-100 text-indigo-800',
//       'world': 'bg-gray-100 text-gray-800'
//     };
//     return colors[category] || 'bg-gray-100 text-gray-800';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   useEffect(() => {
//     fetchArticleVersions();
//   }, [articleId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
//             <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-spin mx-auto" style={{animationDelay: '0.1s', animationDuration: '1.5s'}}></div>
//           </div>
//           <p className="mt-6 text-slate-600 font-medium">Loading article details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="h-8 w-8 text-red-600" />
//           </div>
//           <p className="text-xl font-semibold text-slate-900 mb-2">Error loading article</p>
//           <p className="text-slate-600 mb-6">{error}</p>
//           <button 
//             onClick={() => navigate('/admin/articles')}
//             className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium hover:shadow-lg"
//           >
//             Back to Articles
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <div className="bg-white/70 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={() => navigate('/admin/articles')}
//                 className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </button>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                   Article Details
//                 </h1>
//                 <p className="mt-2 text-slate-600">Manage translations for article ID: {articleId}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowDeleteConfirm(true)}
//               className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium hover:shadow-lg flex items-center"
//             >
//               <Trash2 className="h-4 w-4 mr-2" />
//               Delete Article
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Article Details */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="space-y-6">
//           {['en', 'so', 'sw'].map((lang) => {
//             const version = articleVersions[lang];
//             return (
//               <div key={lang} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-semibold text-slate-900 flex items-center">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                       <Globe className="h-4 w-4 text-blue-600" />
//                     </div>
//                     {getLanguageName(lang)} Version
//                   </h3>
//                   <div className="flex items-center space-x-3">
//                     {version ? (
//                       <>
//                         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
//                           Available
//                         </span>
//                         <button
//                           onClick={() => handleEditClick(version, lang)}
//                           className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                           title="Edit this version"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                       </>
//                     ) : (
//                       <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
//                         Not Available
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {version ? (
//                   <div className="space-y-6">
//                     {/* Media Display */}
//                     {version.image && (
//                       <div className="rounded-lg overflow-hidden bg-slate-100">
//                         <img 
//                           src={version.image} 
//                           alt={version.title}
//                           className="w-full h-auto max-h-30 object-contain"
//                         />
//                       </div>
//                     )}

//                     {version.video && (
//                       <div className="rounded-lg overflow-hidden bg-black">
//                         <video 
//                           controls
//                           className="w-full h-auto max-h-96"
//                         >
//                           <source src={version.video} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//                       </div>
//                     )}

//                     <div className="bg-slate-50 rounded-lg p-6">
//                       <h4 className="text-2xl font-bold text-slate-900 mb-4">
//                         {version.title}
//                       </h4>
                      
//                       <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full ${getCategoryColor(version.category)}`}>
//                           <Tag className="h-3 w-3 mr-1" />
//                           {getCategoryName(version.category)}
//                         </span>
//                         <span className="flex items-center">
//                           <Calendar className="h-4 w-4 mr-2" />
//                           {formatDate(version.created_at)}
//                         </span>
//                       </div>

//                       <div className="prose max-w-none text-slate-700">
//                         {version.content.split('\n').map((paragraph, i) => (
//                           <p key={i} className="mb-4">{paragraph}</p>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Globe className="h-8 w-8 text-slate-400" />
//                     </div>
//                     <p className="text-slate-600 font-medium">This version is not available</p>
//                     <p className="text-slate-500 text-sm mt-2">Translation may have failed or not been created</p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {editModalOpen && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-200">
//             <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
//               <h2 className="text-xl font-bold text-slate-900">Edit {getLanguageName(editingVersion)} Version</h2>
//               <button
//                 onClick={() => setEditModalOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={editFormData.title}
//                     onChange={handleEditFormChange}
//                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Content</label>
//                   <textarea
//                     id="content"
//                     name="content"
//                     value={editFormData.content}
//                     onChange={handleEditFormChange}
//                     rows={8}
//                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={editFormData.category}
//                     onChange={handleEditFormChange}
//                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   >
//                     {categories.map((cat) => (
//                       <option key={cat.value} value={cat.value}>{cat.label}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">
//                     Image (optional)
//                   </label>
//                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
//                     <div className="space-y-1 text-center">
//                       <svg
//                         className="mx-auto h-12 w-12 text-slate-400"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 48 48"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <div className="flex text-sm text-slate-600">
//                         <label
//                           htmlFor="image"
//                           className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
//                         >
//                           <span>Upload an image</span>
//                           <input
//                             id="image"
//                             name="image"
//                             type="file"
//                             accept="image/*"
//                             onChange={handleFileChange}
//                             className="sr-only"
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
//                     </div>
//                   </div>
//                   {previewImage && (
//                     <div className="mt-4">
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="h-48 w-full object-cover rounded-md shadow-sm"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Video Upload */}
//                 <div>
//                   <label htmlFor="video" className="block text-sm font-medium text-slate-700 mb-1">
//                     Video (optional)
//                   </label>
//                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
//                     <div className="space-y-1 text-center">
//                       <svg
//                         className="mx-auto h-12 w-12 text-slate-400"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 48 48"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <div className="flex text-sm text-slate-600">
//                         <label
//                           htmlFor="video"
//                           className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
//                         >
//                           <span>Upload a video</span>
//                           <input
//                             id="video"
//                             name="video"
//                             type="file"
//                             accept="video/*"
//                             onChange={handleFileChange}
//                             className="sr-only"
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-slate-500">MP4, WebM up to 50MB</p>
//                     </div>
//                   </div>
//                   {previewVideo && (
//                     <div className="mt-4">
//                       <video
//                         src={previewVideo}
//                         controls
//                         className="h-48 w-full rounded-md shadow-sm"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setEditModalOpen(false)}
//                   className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
//                   disabled={isSaving}
//                 >
//                   {isSaving ? (
//                     <>
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="h-4 w-4 mr-2" />
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
//             <div className="text-center">
//               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
//                 <Trash2 className="h-6 w-6 text-red-600" />
//               </div>
//               <h3 className="mt-3 text-lg font-medium text-slate-900">Delete Article</h3>
//               <div className="mt-2 text-sm text-slate-500">
//                 <p>Are you sure you want to delete this article and all its translations?</p>
//                 <p className="mt-2 font-medium">This action cannot be undone.</p>
//               </div>
//             </div>
//             <div className="mt-5 sm:mt-6 flex justify-center space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleDeleteArticle}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 Delete Article
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminArticleDetails;



// import React, { useState, useEffect } from 'react';
// import { 
//   Edit, 
//   Trash2, 
//   X, 
//   Globe, 
//   Calendar, 
//   Tag, 
//   Image as ImageIcon, 
//   Video as VideoIcon, 
//   ChevronLeft, 
//   Save, 
//   Loader2, 
//   AlertTriangle, 
//   CheckCircle,
//   Gauge,
//   CircleAlert,
//   Lightbulb
// } from 'lucide-react';
// import { useParams, useNavigate } from 'react-router-dom';
// import TranslationAnalysis from './TranslationAnalysis';

// const AdminArticleDetails = () => {
//   const [analysisResults, setAnalysisResults] = useState({});
//   const [loadingAnalysis, setLoadingAnalysis] = useState({}); 
//   const { articleId } = useParams();
//   const navigate = useNavigate();
//   const [articleVersions, setArticleVersions] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editingVersion, setEditingVersion] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     title: '',
//     content: '',
//     category: '',
//     image: null,
//     video: null
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [previewVideo, setPreviewVideo] = useState(null);
//   const [isSaving, setIsSaving] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);


//   const API_BASE_URL = 'http://localhost:8000';

//   const categories = [
//     { value: 'politics', label: 'Politics' },
//     { value: 'business', label: 'Business' },
//     { value: 'technology', label: 'Technology' },
//     { value: 'sports', label: 'Sports' },
//     { value: 'entertainment', label: 'Entertainment' },
//     { value: 'health', label: 'Health' },
//     { value: 'science', label: 'Science' },
//     { value: 'world', label: 'World News' }
//   ];

//   const fetchArticleVersions = async () => {
//     try {
//       setLoading(true);
//       const languages = ['en', 'so', 'sw'];
//       const versions = {};

//       for (const lang of languages) {
//         try {
//           const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/?language=${lang}`);
//           if (response.ok) {
//             const data = await response.json();
//             versions[lang] = data;
//           }
//         } catch (error) {
//           console.error(`Failed to fetch ${lang} version:`, error);
//           versions[lang] = null;
//         }
//       }

//       setArticleVersions(versions);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const analyzeTranslation = async (language) => {
//   try {
//     setLoadingAnalysis(prev => ({ ...prev, [language]: true }));
    
//     const response = await fetch(`${API_BASE_URL}/api/analyze-translation/`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         original_text: articleVersions.en?.content,
//         translated_text: articleVersions[language]?.content,
//         language
//       }),
//     });

//     if (!response.ok) {
//       throw new Error('Failed to analyze translation');
//     }

//     const data = await response.json();
//     setAnalysisResults(prev => ({
//       ...prev,
//       [language]: data
//     }));
//   } catch (err) {
//     console.error(`Error analyzing ${language} translation:`, err);
//     setAnalysisResults(prev => ({
//       ...prev,
//       [language]: { error: err.message }
//     }));
//   } finally {
//     setLoadingAnalysis(prev => ({ ...prev, [language]: false }));
//   }
// };

//   const renderContentWithHighlights = (content, problematicSections = []) => {
//     if (!problematicSections.length) {
//       return <div className="whitespace-pre-wrap">{content}</div>;
//     }
    
//     let processedContent = content;
//     problematicSections.forEach(section => {
//       processedContent = processedContent.replace(
//         section.text, 
//         `<mark class="bg-yellow-100 border-l-4 border-yellow-500 px-1" data-section-id="${section.id}">${section.text}</mark>`
//       );
//     });
    
//     return <div className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: processedContent }} />;
//   };

//   const handleEditClick = (version, language) => {
//     setEditingVersion(language);
//     setEditFormData({
//       title: version?.title || '',
//       content: version?.content || '',
//       category: version?.category || 'politics',
//       image: null,
//       video: null
//     });
//     setPreviewImage(version?.image || null);
//     setPreviewVideo(version?.video || null);
//     setEditModalOpen(true);
//   };

//   const handleEditFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (files[0]) {
//       setEditFormData(prev => ({ ...prev, [name]: files[0] }));

//       if (name === 'image') {
//         const reader = new FileReader();
//         reader.onload = () => setPreviewImage(reader.result);
//         reader.readAsDataURL(files[0]);
//       } else if (name === 'video') {
//         setPreviewVideo(URL.createObjectURL(files[0]));
//       }
//     }
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();
//     setIsSaving(true);
    
//     try {
//       const formData = new FormData();
//       formData.append('title', editFormData.title);
//       formData.append('content', editFormData.content);
//       formData.append('category', editFormData.category);
//       formData.append('language', editingVersion);
//       if (editFormData.image) formData.append('image', editFormData.image);
//       if (editFormData.video) formData.append('video', editFormData.video);

//       const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/`, {
//         method: 'PUT',
//         body: formData
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update article');
//       }

//       await fetchArticleVersions();
//       setEditModalOpen(false);
//     } catch (err) {
//       alert('Error updating article: ' + err.message);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteArticle = async () => {
//     setShowDeleteConfirm(false);
//     try {
//       const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         navigate('/admin/articles');
//       } else {
//         throw new Error('Failed to delete article');
//       }
//     } catch (err) {
//       alert('Error deleting article: ' + err.message);
//     }
//   };

//   const getLanguageName = (code) => {
//     const names = {
//       'en': 'English',
//       'so': 'Somali',
//       'sw': 'Kiswahili'
//     };
//     return names[code] || code;
//   };

//   const getCategoryName = (category) => {
//     const categories = {
//       'politics': 'Politics',
//       'business': 'Business',
//       'technology': 'Technology',
//       'sports': 'Sports',
//       'entertainment': 'Entertainment',
//       'health': 'Health',
//       'science': 'Science',
//       'world': 'World News'
//     };
//     return categories[category] || category;
//   };

//   const getCategoryColor = (category) => {
//     const colors = {
//       'politics': 'bg-purple-100 text-purple-800',
//       'business': 'bg-green-100 text-green-800',
//       'technology': 'bg-blue-100 text-blue-800',
//       'sports': 'bg-orange-100 text-orange-800',
//       'entertainment': 'bg-pink-100 text-pink-800',
//       'health': 'bg-red-100 text-red-800',
//       'science': 'bg-indigo-100 text-indigo-800',
//       'world': 'bg-gray-100 text-gray-800'
//     };
//     return colors[category] || 'bg-gray-100 text-gray-800';
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   useEffect(() => {
//     fetchArticleVersions();
//   }, [articleId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center">
//           <div className="relative">
//             <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
//             <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-spin mx-auto" style={{animationDelay: '0.1s', animationDuration: '1.5s'}}></div>
//           </div>
//           <p className="mt-6 text-slate-600 font-medium">Loading article details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
//         <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-slate-200">
//           <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//             <X className="h-8 w-8 text-red-600" />
//           </div>
//           <p className="text-xl font-semibold text-slate-900 mb-2">Error loading article</p>
//           <p className="text-slate-600 mb-6">{error}</p>
//           <button 
//             onClick={() => navigate('/admin/articles')}
//             className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium hover:shadow-lg"
//           >
//             Back to Articles
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
//       {/* Header */}
//       <div className="bg-white/70 backdrop-blur-sm border-b border-slate-200/50 sticky top-0 z-40">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button 
//                 onClick={() => navigate('/admin/articles')}
//                 className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </button>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                   Article Details
//                 </h1>
//                 <p className="mt-2 text-slate-600">Manage translations for article ID: {articleId}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowDeleteConfirm(true)}
//               className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium hover:shadow-lg flex items-center"
//             >
//               <Trash2 className="h-4 w-4 mr-2" />
//               Delete Article
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Article Details */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="space-y-6">
//           {['en', 'so', 'sw'].map((lang) => {
//             const version = articleVersions[lang];
//             const analysis = analysisResults[lang];
//             const isLoadingAnalysis = loadingAnalysis[lang];
            
//             return (
//               <div key={lang} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
//                 <div className="flex items-center justify-between mb-6">
//                   <h3 className="text-xl font-semibold text-slate-900 flex items-center">
//                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
//                       <Globe className="h-4 w-4 text-blue-600" />
//                     </div>
//                     {getLanguageName(lang)} Version
//                   </h3>
//                   <div className="flex items-center space-x-3">
//                     {version ? (
//                       <>
//                         <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
//                           Available
//                         </span>
//                         {lang !== 'en' && (
//                           <button
//                             onClick={() => analyzeTranslation(lang)}
//                             disabled={isLoadingAnalysis}
//                             className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center ${
//                               isLoadingAnalysis 
//                                 ? 'bg-gray-100 text-gray-500' 
//                                 : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
//                             }`}
//                           >
//                             {isLoadingAnalysis ? (
//                               <>
//                                 <Loader2 className="h-3 w-3 mr-1 animate-spin" />
//                                 Analyzing...
//                               </>
//                             ) : (
//                               <>
//                                 <AlertTriangle className="h-3 w-3 mr-1" />
//                                 Check Quality
//                               </>
//                             )}
//                           </button>
//                         )}
//                         <button
//                           onClick={() => handleEditClick(version, lang)}
//                           className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                           title="Edit this version"
//                         >
//                           <Edit className="h-4 w-4" />
//                         </button>
//                       </>
//                     ) : (
//                       <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
//                         Not Available
//                       </span>
//                     )}
//                   </div>
//                 </div>

//                 {version ? (
//                   <div className="space-y-6">
//                     {/* Media Display */}
//                     {version.image && (
//                       <div className="rounded-lg overflow-hidden bg-slate-100">
//                         <img 
//                           src={version.image} 
//                           alt={version.title}
//                           className="w-full h-auto max-h-30 object-contain"
//                         />
//                       </div>
//                     )}

//                     {version.video && (
//                       <div className="rounded-lg overflow-hidden bg-black">
//                         <video 
//                           controls
//                           className="w-full h-auto max-h-96"
//                         >
//                           <source src={version.video} type="video/mp4" />
//                           Your browser does not support the video tag.
//                         </video>
//                       </div>
//                     )}

//                     {/* Translation Analysis Results */}
//                     {analysis && !analysis.error && lang !== 'en' && (
//                       <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
//                         <h4 className="font-medium text-slate-800 mb-3 flex items-center">
//                           <Gauge className="h-5 w-5 text-blue-500 mr-2" />
//                           Translation Quality Analysis
//                         </h4>
                        
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
//                           <div className="bg-blue-50 p-3 rounded-lg flex items-start">
//                             <Gauge className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
//                             <div>
//                               <p className="text-xs text-blue-600 font-medium">Accuracy Score</p>
//                               <p className="text-xl font-bold">
//                                 {Math.round(analysis.accuracy_score * 100)}%
//                               </p>
//                             </div>
//                           </div>
                          
//                           <div className={`p-3 rounded-lg flex items-start ${
//                             analysis.needs_human_review ? 'bg-amber-50' : 'bg-green-50'
//                           }`}>
//                             {analysis.needs_human_review ? (
//                               <CircleAlert className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
//                             ) : (
//                               <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
//                             )}
//                             <div>
//                               <p className={`text-xs font-medium ${
//                                 analysis.needs_human_review ? 'text-amber-600' : 'text-green-600'
//                               }`}>
//                                 Human Review Needed
//                               </p>
//                               <p className="text-xl font-bold">
//                                 {analysis.needs_human_review ? 'Yes' : 'No'}
//                               </p>
//                             </div>
//                           </div>
                          
//                           <div className="bg-purple-50 p-3 rounded-lg flex items-start">
//                             <AlertTriangle className="h-5 w-5 text-purple-500 mr-2 mt-0.5" />
//                             <div>
//                               <p className="text-xs text-purple-600 font-medium">Issues Found</p>
//                               <p className="text-xl font-bold">
//                                 {analysis.problematic_sections?.length || 0}
//                               </p>
//                             </div>
//                           </div>
//                         </div>

//                         {analysis.problematic_sections?.length > 0 && (
//                           <>
//                             <div className="mt-3">
//                               <h5 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
//                                 <CircleAlert className="h-4 w-4 text-yellow-500 mr-2" />
//                                 Content Review
//                               </h5>
//                               <div className="p-3 bg-white rounded border border-slate-200 max-h-60 overflow-y-auto">
//                                 {renderContentWithHighlights(version.content, analysis.problematic_sections)}
//                               </div>
//                             </div>
                            
//                             <div className="mt-3">
//                               <h5 className="text-sm font-medium text-slate-700 mb-2 flex items-center">
//                                 <Lightbulb className="h-4 w-4 text-blue-500 mr-2" />
//                                 Suggested Improvements
//                               </h5>
//                               <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
//                                 {analysis.suggestions?.map((suggestion, i) => (
//                                   <li key={i}>{suggestion}</li>
//                                 ))}
//                               </ul>
//                             </div>
//                           </>
//                         )}

//                         {analysis.needs_human_review && (
//                           <div className="mt-3 bg-red-50 border-l-4 border-red-500 p-3 rounded-r">
//                             <p className="text-sm text-red-700 font-medium flex items-center">
//                               <AlertTriangle className="h-4 w-4 mr-2" />
//                               Human review recommended for highlighted sections
//                             </p>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {analysis?.error && (
//                       <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded-r">
//                         <p className="text-sm text-red-700 flex items-center">
//                           <X className="h-4 w-4 mr-2" />
//                           Error analyzing translation: {analysis.error}
//                         </p>
//                       </div>
//                     )}

//                     <div className="bg-slate-50 rounded-lg p-6">
//                       <h4 className="text-2xl font-bold text-slate-900 mb-4">
//                         {version.title}
//                       </h4>
                      
//                       <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
//                         <span className={`inline-flex items-center px-3 py-1 rounded-full ${getCategoryColor(version.category)}`}>
//                           <Tag className="h-3 w-3 mr-1" />
//                           {getCategoryName(version.category)}
//                         </span>
//                         <span className="flex items-center">
//                           <Calendar className="h-4 w-4 mr-2" />
//                           {formatDate(version.created_at)}
//                         </span>
//                       </div>

//                       <div className="prose max-w-none text-slate-700">
//                         {version.content.split('\n').map((paragraph, i) => (
//                           <p key={i} className="mb-4">{paragraph}</p>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="text-center py-12">
//                     <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
//                       <Globe className="h-8 w-8 text-slate-400" />
//                     </div>
//                     <p className="text-slate-600 font-medium">This version is not available</p>
//                     <p className="text-slate-500 text-sm mt-2">Translation may have failed or not been created</p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {editModalOpen && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-200">
//             <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
//               <h2 className="text-xl font-bold text-slate-900">Edit {getLanguageName(editingVersion)} Version</h2>
//               <button
//                 onClick={() => setEditModalOpen(false)}
//                 className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
//               >
//                 <X className="h-6 w-6" />
//               </button>
//             </div>

//             <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
//               <div className="space-y-4">
//                 <div>
//                   <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
//                   <input
//                     type="text"
//                     id="title"
//                     name="title"
//                     value={editFormData.title}
//                     onChange={handleEditFormChange}
//                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Content</label>
//                   <textarea
//                     id="content"
//                     name="content"
//                     value={editFormData.content}
//                     onChange={handleEditFormChange}
//                     rows={8}
//                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
//                   <select
//                     id="category"
//                     name="category"
//                     value={editFormData.category}
//                     onChange={handleEditFormChange}
//                     className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                     required
//                   >
//                     {categories.map((cat) => (
//                       <option key={cat.value} value={cat.value}>{cat.label}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Image Upload */}
//                 <div>
//                   <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">
//                     Image (optional)
//                   </label>
//                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
//                     <div className="space-y-1 text-center">
//                       <svg
//                         className="mx-auto h-12 w-12 text-slate-400"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 48 48"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <div className="flex text-sm text-slate-600">
//                         <label
//                           htmlFor="image"
//                           className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
//                         >
//                           <span>Upload an image</span>
//                           <input
//                             id="image"
//                             name="image"
//                             type="file"
//                             accept="image/*"
//                             onChange={handleFileChange}
//                             className="sr-only"
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
//                     </div>
//                   </div>
//                   {previewImage && (
//                     <div className="mt-4">
//                       <img
//                         src={previewImage}
//                         alt="Preview"
//                         className="h-48 w-full object-cover rounded-md shadow-sm"
//                       />
//                     </div>
//                   )}
//                 </div>

//                 {/* Video Upload */}
//                 <div>
//                   <label htmlFor="video" className="block text-sm font-medium text-slate-700 mb-1">
//                     Video (optional)
//                   </label>
//                   <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
//                     <div className="space-y-1 text-center">
//                       <svg
//                         className="mx-auto h-12 w-12 text-slate-400"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 48 48"
//                         aria-hidden="true"
//                       >
//                         <path
//                           d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                       <div className="flex text-sm text-slate-600">
//                         <label
//                           htmlFor="video"
//                           className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
//                         >
//                           <span>Upload a video</span>
//                           <input
//                             id="video"
//                             name="video"
//                             type="file"
//                             accept="video/*"
//                             onChange={handleFileChange}
//                             className="sr-only"
//                           />
//                         </label>
//                         <p className="pl-1">or drag and drop</p>
//                       </div>
//                       <p className="text-xs text-slate-500">MP4, WebM up to 50MB</p>
//                     </div>
//                   </div>
//                   {previewVideo && (
//                     <div className="mt-4">
//                       <video
//                         src={previewVideo}
//                         controls
//                         className="h-48 w-full rounded-md shadow-sm"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end space-x-3">
//                 <button
//                   type="button"
//                   onClick={() => setEditModalOpen(false)}
//                   className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
//                   disabled={isSaving}
//                 >
//                   {isSaving ? (
//                     <>
//                       <Loader2 className="h-4 w-4 mr-2 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     <>
//                       <Save className="h-4 w-4 mr-2" />
//                       Save Changes
//                     </>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
//             <div className="text-center">
//               <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
//                 <Trash2 className="h-6 w-6 text-red-600" />
//               </div>
//               <h3 className="mt-3 text-lg font-medium text-slate-900">Delete Article</h3>
//               <div className="mt-2 text-sm text-slate-500">
//                 <p>Are you sure you want to delete this article and all its translations?</p>
//                 <p className="mt-2 font-medium">This action cannot be undone.</p>
//               </div>
//             </div>
//             <div className="mt-5 sm:mt-6 flex justify-center space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowDeleteConfirm(false)}
//                 className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 onClick={handleDeleteArticle}
//                 className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
//               >
//                 Delete Article
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminArticleDetails;


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
  Lightbulb
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

  const API_BASE_URL = 'http://localhost:8000';

  const categories = [
    { value: 'politics', label: 'Politics' },
    { value: 'business', label: 'Business' },
    { value: 'technology', label: 'Technology' },
    { value: 'sports', label: 'Sports' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'world', label: 'World News' }
  ];

  const fetchArticleVersions = async () => {
    try {
      setLoading(true);
      const languages = ['en', 'so', 'sw'];
      const versions = {};

      for (const lang of languages) {
        try {
          const response = await fetch(`${API_BASE_URL}/api/articles/${articleId}/?language=${lang}`);
          if (response.ok) {
            const data = await response.json();
            versions[lang] = data;
          }
        } catch (error) {
          console.error(`Failed to fetch ${lang} version:`, error);
          versions[lang] = null;
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

  useEffect(() => {
    fetchArticleVersions();
  }, [articleId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-transparent border-t-blue-400 animate-spin mx-auto" style={{animationDelay: '0.1s', animationDuration: '1.5s'}}></div>
          </div>
          <p className="mt-6 text-slate-600 font-medium">Loading article details...</p>
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
          <p className="text-xl font-semibold text-slate-900 mb-2">Error loading article</p>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={() => navigate('/admin/articles')}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium hover:shadow-lg"
          >
            Back to Articles
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
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/admin/articles')}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                  Article Details
                </h1>
                <p className="mt-2 text-slate-600">Manage translations for article ID: {articleId}</p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium hover:shadow-lg flex items-center"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Article
            </button>
          </div>
        </div>
      </div>

      {/* Article Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {['en', 'so', 'sw'].map((lang) => {
            const version = articleVersions[lang];
            const analysis = analysisResults[lang];
            const isLoadingAnalysis = loadingAnalysis[lang];
            
            return (
              <div key={lang} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Globe className="h-4 w-4 text-blue-600" />
                    </div>
                    {getLanguageName(lang)} Version
                  </h3>
                  <div className="flex items-center space-x-3">
                    {version ? (
                      <>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                          Available
                        </span>
                        {lang !== 'en' && (
                          <button
                            onClick={() => analyzeTranslation(lang)}
                            disabled={isLoadingAnalysis}
                            className={`px-3 py-1 rounded-lg text-sm font-medium flex items-center ${
                              isLoadingAnalysis 
                                ? 'bg-gray-100 text-gray-500' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                          >
                            {isLoadingAnalysis ? (
                              <>
                                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                                Analyzing...
                              </>
                            ) : (
                              <>
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Check Quality
                              </>
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleEditClick(version, lang)}
                          className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          title="Edit this version"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                        Not Available
                      </span>
                    )}
                  </div>
                </div>

                {version ? (
                  <div className="space-y-6">
                    {/* Media Display */}
                    {version.image && (
                      <div className="rounded-lg overflow-hidden bg-slate-100">
                        <img 
                          src={version.image} 
                          alt={version.title}
                          className="w-full h-auto max-h-30 object-contain"
                        />
                      </div>
                    )}

                    {version.video && (
                      <div className="rounded-lg overflow-hidden bg-black">
                        <video 
                          controls
                          className="w-full h-auto max-h-96"
                        >
                          <source src={version.video} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}

                    {/* Translation Analysis Results */}
                    {analysis && lang !== 'en' && (
                      <TranslationAnalysis 
                        analysis={analysis} 
                        language={lang}
                        originalContent={articleVersions.en?.content}
                        translatedContent={version.content}
                      />
                    )}

                    <div className="bg-slate-50 rounded-lg p-6">
                      <h4 className="text-2xl font-bold text-slate-900 mb-4">
                        {version.title}
                      </h4>
                      
                      <div className="flex items-center justify-between text-sm text-slate-500 mb-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full ${getCategoryColor(version.category)}`}>
                          <Tag className="h-3 w-3 mr-1" />
                          {getCategoryName(version.category)}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(version.created_at)}
                        </span>
                      </div>

                      <div className="prose max-w-none text-slate-700">
                        {version.content.split('\n').map((paragraph, i) => (
                          <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Globe className="h-8 w-8 text-slate-400" />
                    </div>
                    <p className="text-slate-600 font-medium">This version is not available</p>
                    <p className="text-slate-500 text-sm mt-2">Translation may have failed or not been created</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden border border-slate-200">
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-900">Edit {getLanguageName(editingVersion)} Version</h2>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-slate-700 mb-1">Content</label>
                  <textarea
                    id="content"
                    name="content"
                    value={editFormData.content}
                    onChange={handleEditFormChange}
                    rows={8}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditFormChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-slate-700 mb-1">
                    Image (optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-slate-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-slate-600">
                        <label
                          htmlFor="image"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload an image</span>
                          <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                  {previewImage && (
                    <div className="mt-4">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-48 w-full object-cover rounded-md shadow-sm"
                      />
                    </div>
                  )}
                </div>

                {/* Video Upload */}
                <div>
                  <label htmlFor="video" className="block text-sm font-medium text-slate-700 mb-1">
                    Video (optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-slate-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-slate-600">
                        <label
                          htmlFor="video"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                        >
                          <span>Upload a video</span>
                          <input
                            id="video"
                            name="video"
                            type="file"
                            accept="video/*"
                            onChange={handleFileChange}
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-slate-500">MP4, WebM up to 50MB</p>
                    </div>
                  </div>
                  {previewVideo && (
                    <div className="mt-4">
                      <video
                        src={previewVideo}
                        controls
                        className="h-48 w-full rounded-md shadow-sm"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                  disabled={isSaving}
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
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 border border-slate-200">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="mt-3 text-lg font-medium text-slate-900">Delete Article</h3>
              <div className="mt-2 text-sm text-slate-500">
                <p>Are you sure you want to delete this article and all its translations?</p>
                <p className="mt-2 font-medium">This action cannot be undone.</p>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 flex justify-center space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteArticle}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminArticleDetails;