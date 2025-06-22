
// import React, { useState, useEffect } from 'react';
// import { Edit, Trash2, X, Globe, Calendar, Tag, Image, Video, ChevronLeft, Save, AlertTriangle } from 'lucide-react';

// const AdminArticleDetails = () => {
//   const [articleId] = useState('123'); // Mock article ID
//   const [articleVersions, setArticleVersions] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingVersion, setEditingVersion] = useState(null);
//   const [editingLanguage, setEditingLanguage] = useState(null);
//   const [editForm, setEditForm] = useState({
//     title: '',
//     content: '',
//     category: '',
//     image: '',
//     video: ''
//   });
//   const [imageFile, setImageFile] = useState(null);
//   const [videoFile, setVideoFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState(null);
//   const [videoPreview, setVideoPreview] = useState(null);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);

//   const API_BASE_URL = 'http://localhost:8000';

//   // Mock data for demonstration
//   const mockData = {
//     en: {
//       id: 1,
//       title: "Breaking: Major Technology Breakthrough Announced",
//       content: "In a groundbreaking announcement today, researchers have unveiled a revolutionary technology that promises to transform the way we interact with digital devices. The innovation, developed over the past three years, represents a significant leap forward in human-computer interaction and has already garnered attention from major tech companies worldwide.",
//       category: "technology",
//       image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
//       video: "sample-video.mp4",
//       created_at: "2024-06-22T10:30:00Z",
//       language: "en"
//     },
//     so: {
//       id: 2,
//       title: "Deg deg: Horumar weyn oo tignoolajiyeed oo la shaaciyay",
//       content: "Maanta oo ah maalin muhiim ah, cilmi-baarayaashu waxay shaaciyeen tignoolajiyad cusub oo adag oo isbeddel weyn ku keeni doonta sida aan ula macaamilno aaladaha dijitaalka ah. Hal-abuurkani, oo la sameeyay muddo saddex sano ah, wuxuu matala tallaabo weyn oo hore u socota isdhexgalka aadanaha iyo kumbuyuutarka.",
//       category: "technology",
//       image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
//       video: "sample-video.mp4",
//       created_at: "2024-06-22T10:30:00Z",
//       language: "so"
//     },
//     sw: {
//       id: 3,
//       title: "Habari za haraka: Ubunifu mkuu wa teknolojia umetangazwa",
//       content: "Katika tangazo la kihistoria leo, watafiti wametangaza teknolojia ya mapinduzi ambayo inaahidi kubadilisha jinsi tunavyoshirikiana na vifaa vya kidijitali. Ubunifu huu, uliotengenezwa kwa miaka mitatu iliyopita, unawakilisha hatua kubwa ya mbele katika mwingiliano wa binadamu na kompyuta.",
//       category: "technology",
//       image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
//       video: "sample-video.mp4",
//       created_at: "2024-06-22T10:30:00Z",
//       language: "sw"
//     }
//   };

//   // Simulate API call
//   const fetchArticleVersions = async () => {
//     try {
//       setLoading(true);
//       // Simulate network delay
//       await new Promise(resolve => setTimeout(resolve, 1000));
//       setArticleVersions(mockData);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditVersion = (version, language) => {
//     setEditingVersion(version);
//     setEditingLanguage(language);
//     setEditForm({
//       title: version.title,
//       content: version.content,
//       category: version.category,
//       image: version.image || '',
//       video: version.video || ''
//     });
    
//     // Reset file states
//     setImageFile(null);
//     setVideoFile(null);
//     setImagePreview(version.image || null);
//     setVideoPreview(version.video || null);
    
//     setShowEditModal(true);
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setImagePreview(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleVideoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setVideoFile(file);
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         setVideoPreview(e.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const removeImage = () => {
//     setImageFile(null);
//     setImagePreview(null);
//     setEditForm({...editForm, image: ''});
//   };

//   const removeVideo = () => {
//     setVideoFile(null);
//     setVideoPreview(null);
//     setEditForm({...editForm, video: ''});
//   };

//   const handleSaveEdit = async () => {
//     setIsSaving(true);
//     try {
//       // Simulate API call - in real app, you'd upload files to server first
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       // Create form data for file uploads (in real app)
//       const formData = new FormData();
//       formData.append('title', editForm.title);
//       formData.append('content', editForm.content);
//       formData.append('category', editForm.category);
      
//       if (imageFile) {
//         formData.append('image', imageFile);
//       }
//       if (videoFile) {
//         formData.append('video', videoFile);
//       }
      
//       // Update the local state with new data
//       setArticleVersions(prev => ({
//         ...prev,
//         [editingLanguage]: {
//           ...prev[editingLanguage],
//           ...editForm,
//           image: imagePreview || prev[editingLanguage].image,
//           video: videoPreview || prev[editingLanguage].video
//         }
//       }));
      
//       setShowEditModal(false);
//       setEditingVersion(null);
//       setEditingLanguage(null);
//       setImageFile(null);
//       setVideoFile(null);
//       setImagePreview(null);
//       setVideoPreview(null);
//     } catch (err) {
//       alert('Error saving changes: ' + err.message);
//     } finally {
//       setIsSaving(false);
//     }
//   };

//   const handleDeleteArticle = async () => {
//     setIsDeleting(true);
//     try {
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       // In real app, navigate back to articles list
//       alert('Article deleted successfully!');
//       setShowDeleteModal(false);
//     } catch (err) {
//       alert('Error deleting article: ' + err.message);
//     } finally {
//       setIsDeleting(false);
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

//   const truncateText = (text, maxLength = 150) => {
//     if (!text) return '';
//     return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
//   };

//   useEffect(() => {
//     fetchArticleVersions();
//   }, []);

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
//             onClick={() => window.history.back()}
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
//                 onClick={() => window.history.back()}
//                 className="p-2 hover:bg-slate-100 rounded-xl transition-all duration-200"
//               >
//                 <ChevronLeft className="h-6 w-6 text-slate-700" />
//               </button>
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
//                   Article Management
//                 </h1>
//                 <p className="mt-2 text-slate-600">Managing translations for article #{articleId}</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowDeleteModal(true)}
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
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {['en', 'so', 'sw'].map((lang) => {
//             const version = articleVersions[lang];
//             return (
//               <div key={lang} className="group relative">
//                 <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200/50 hover:border-slate-300/50 overflow-hidden">
//                   {/* Article Image */}
//                   {version?.image && (
//                     <div className="h-48 w-full overflow-hidden">
//                       <img 
//                         src={version.image} 
//                         alt={version.title}
//                         className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
//                       />
//                     </div>
//                   )}
                  
//                   <div className="p-6">
//                     {/* Language and Status */}
//                     <div className="flex items-center justify-between mb-4">
//                       <div className="flex items-center">
//                         <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
//                           <Globe className="h-4 w-4 text-blue-600" />
//                         </div>
//                         <span className="font-semibold text-slate-900">{getLanguageName(lang)}</span>
//                       </div>
//                       {version ? (
//                         <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
//                           Available
//                         </span>
//                       ) : (
//                         <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">
//                           Not Available
//                         </span>
//                       )}
//                     </div>

//                     {version ? (
//                       <>
//                         {/* Category and Date */}
//                         <div className="flex items-center justify-between mb-4">
//                           <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(version.category)}`}>
//                             <Tag className="h-3 w-3 mr-1" />
//                             {getCategoryName(version.category)}
//                           </span>
//                           <span className="text-xs text-slate-500 flex items-center">
//                             <Calendar className="h-3 w-3 mr-1" />
//                             {formatDate(version.created_at)}
//                           </span>
//                         </div>

//                         {/* Title */}
//                         <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2">
//                           {version.title}
//                         </h3>

//                         {/* Content Preview */}
//                         <p className="text-slate-600 text-sm mb-4 line-clamp-3 leading-relaxed">
//                           {truncateText(version.content)}
//                         </p>

//                         {/* Media Indicators */}
//                         {(version.image || version.video) && (
//                           <div className="flex items-center space-x-4 mb-4">
//                             {version.image && (
//                               <span className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
//                                 <Image className="h-3 w-3 mr-1" />
//                                 Image
//                               </span>
//                             )}
//                             {version.video && (
//                               <span className="flex items-center text-xs text-slate-500 bg-slate-50 px-2 py-1 rounded-lg">
//                                 <Video className="h-3 w-3 mr-1" />
//                                 Video
//                               </span>
//                             )}
//                           </div>
//                         )}

//                         {/* Footer */}
//                         <div className="flex justify-between items-center pt-4 border-t border-slate-100">
//                           <span className="text-xs text-slate-400 font-mono">ID: {version.id}</span>
//                           <button
//                             onClick={() => handleEditVersion(version, lang)}
//                             className="text-xs text-blue-600 hover:text-blue-700 font-medium"
//                           >
//                             Edit Version
//                           </button>
//                         </div>
//                       </>
//                     ) : (
//                       <div className="text-center py-8">
//                         <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
//                           <Globe className="h-8 w-8 text-slate-400" />
//                         </div>
//                         <p className="text-slate-500 font-medium mb-2">This version is not available</p>
//                         <p className="text-slate-400 text-sm">Translation may have failed or not been created yet</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Edit Button - Positioned absolute for available versions */}
//                 {version && (
//                   <button
//                     onClick={() => handleEditVersion(version, lang)}
//                     className="absolute top-4 right-4 p-2 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-blue-600 transition-all duration-200 shadow-lg"
//                     title="Edit this version"
//                   >
//                     <Edit className="h-4 w-4" />
//                   </button>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
//             <div className="text-center">
//               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <AlertTriangle className="h-8 w-8 text-red-600" />
//               </div>
//               <h3 className="text-xl font-semibold text-slate-900 mb-2">Delete Article?</h3>
//               <p className="text-slate-600 mb-6">
//                 This action cannot be undone. This will permanently delete the article and all its translations.
//               </p>
//               <div className="flex space-x-4">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   disabled={isDeleting}
//                   className="flex-1 px-4 py-2 bg-slate-200 text-slate-800 rounded-xl hover:bg-slate-300 transition-all duration-200 font-medium disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteArticle}
//                   disabled={isDeleting}
//                   className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-200 font-medium disabled:opacity-50 flex items-center justify-center"
//                 >
//                   {isDeleting ? (
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
//                   ) : (
//                     'Delete Forever'
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Edit Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
//           <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl my-8">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-xl font-semibold text-slate-900 flex items-center">
//                 <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
//                   <Edit className="h-4 w-4 text-blue-600" />
//                 </div>
//                 Edit {getLanguageName(editingLanguage)} Version
//               </h3>
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//               >
//                 <X className="h-5 w-5" />
//               </button>
//             </div>
            
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
//                 <input
//                   type="text"
//                   value={editForm.title}
//                   onChange={(e) => setEditForm({...editForm, title: e.target.value})}
//                   className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                   placeholder="Enter article title"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
//                 <textarea
//                   value={editForm.content}
//                   onChange={(e) => setEditForm({...editForm, content: e.target.value})}
//                   rows={6}
//                   className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
//                   placeholder="Enter article content"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
//                 <select
//                   value={editForm.category}
//                   onChange={(e) => setEditForm({...editForm, category: e.target.value})}
//                   className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
//                 >
//                   <option value="politics">Politics</option>
//                   <option value="business">Business</option>
//                   <option value="technology">Technology</option>
//                   <option value="sports">Sports</option>
//                   <option value="entertainment">Entertainment</option>
//                   <option value="health">Health</option>
//                   <option value="science">Science</option>
//                   <option value="world">World News</option>
//                 </select>
//               </div>
              
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Image Upload</label>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageChange}
//                     className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//                   />
//                   {imagePreview && (
//                     <div className="relative mt-3">
//                       <img 
//                         src={imagePreview} 
//                         alt="Preview" 
//                         className="w-full h-32 object-cover rounded-xl border border-slate-200"
//                       />
//                       <button
//                         onClick={removeImage}
//                         className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   )}
//                 </div>
                
//                 <div>
//                   <label className="block text-sm font-medium text-slate-700 mb-2">Video Upload</label>
//                   <input
//                     type="file"
//                     accept="video/*"
//                     onChange={handleVideoChange}
//                     className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
//                   />
//                   {videoPreview && (
//                     <div className="relative mt-3">
//                       <video 
//                         src={videoPreview} 
//                         controls
//                         className="w-full h-32 object-cover rounded-xl border border-slate-200"
//                       />
//                       <button
//                         onClick={removeVideo}
//                         className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                       >
//                         <X className="h-3 w-3" />
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
            
//             <div className="flex space-x-4 mt-6">
//               <button
//                 onClick={() => setShowEditModal(false)}
//                 disabled={isSaving}
//                 className="flex-1 px-4 py-2 bg-slate-200 text-slate-800 rounded-xl hover:bg-slate-300 transition-all duration-200 font-medium disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSaveEdit}
//                 disabled={isSaving}
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium disabled:opacity-50 flex items-center justify-center"
//               >
//                 {isSaving ? (
//                   <>
//                     <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
//                     Saving...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="h-4 w-4 mr-2" />
//                     Save Changes
//                   </>
//                 )}
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
import { Edit, Trash2, X, Globe, Calendar, Tag, Image as ImageIcon, Video as VideoIcon, ChevronLeft, Save, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';

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

  // Fetch all versions of a specific article
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
        navigate('/admin/articles'); // Redirect back to list
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