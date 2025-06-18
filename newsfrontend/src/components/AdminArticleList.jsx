// import { useEffect, useState } from 'react';
// import { getArticles, deleteArticle } from '../services/api';
// import EditArticleForm from './EditArticleForm';
// import { Transition } from '@headlessui/react';

// const AdminArticleList = ({ language, onArticleDeleted, onArticleUpdated }) => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingArticle, setEditingArticle] = useState(null);

//   useEffect(() => {
//     fetchArticles();
//   }, [language]);

//   const fetchArticles = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const data = await getArticles(language);
//       setArticles(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load articles');
//       console.error('Fetch error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this article?')) return;
//     try {
//       await deleteArticle(id);
//       await fetchArticles();
//       onArticleDeleted && onArticleDeleted();
//     } catch (err) {
//       setError(err.message || 'Failed to delete article');
//       console.error('Delete error:', err);
//     }
//   };

//   const handleEditComplete = () => {
//     setEditingArticle(null);
//     fetchArticles();
//     onArticleUpdated && onArticleUpdated();
//   };

//   const formatTimeAgo = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = now - date;
//     const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
//     if (diffHours < 1) {
//       const diffMinutes = Math.floor(diffTime / (1000 * 60));
//       return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`;
//     } else if (diffHours < 24) {
//       return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
//     } else {
//       const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
//       return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900 mb-2">Article Management</h1>
//               <p className="text-gray-600">Manage and organize your content articles</p>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full">
//                 {language?.toUpperCase() || 'ALL'}
//               </div>
//               <div className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm rounded-full">
//                 {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Loading State */}
//         {loading && (
//           <div className="flex flex-col items-center justify-center py-16">
//             <div className="relative">
//               <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//               <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animation-delay-150"></div>
//             </div>
//             <p className="mt-4 text-gray-600 font-medium">Loading articles...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-6">
//             <div className="flex items-start">
//               <div className="flex-shrink-0">
//                 <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                 </svg>
//               </div>
//               <div className="ml-3 flex-1">
//                 <h3 className="text-sm font-medium text-red-800">Something went wrong</h3>
//                 <p className="mt-1 text-sm text-red-700">{error}</p>
//                 <button
//                   onClick={fetchArticles}
//                   className="mt-3 inline-flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-sm font-medium rounded-lg transition-colors duration-200"
//                 >
//                   <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                   </svg>
//                   Try Again
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Edit Article Modal */}
//         <Transition show={!!editingArticle}>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex min-h-screen items-center justify-center p-4">
//               {/* Backdrop */}
//               <Transition.Child
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0"
//                 enterTo="opacity-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100"
//                 leaveTo="opacity-0"
//               >
//                 <div
//                   className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
//                   onClick={() => setEditingArticle(null)}
//                 />
//               </Transition.Child>

//               {/* Modal Content */}
//               <Transition.Child
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95 translate-y-4"
//                 enterTo="opacity-100 scale-100 translate-y-0"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100 translate-y-0"
//                 leaveTo="opacity-0 scale-95 translate-y-4"
//               >
//                 <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-4xl mx-4 p-6">
//                   <button
//                     type="button"
//                     className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
//                     onClick={() => setEditingArticle(null)}
//                   >
//                     <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                   {editingArticle && (
//                     <EditArticleForm
//                       article={editingArticle}
//                       onCancel={() => setEditingArticle(null)}
//                       onSuccess={handleEditComplete}
//                     />
//                   )}
//                 </div>
//               </Transition.Child>
//             </div>
//           </div>
//         </Transition>

//         {/* Article List */}
//         {!loading && !error && (
//           <div>
//             {articles.length === 0 ? (
//               <div className="text-center py-16">
//                 <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
//                   <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
//                 <p className="text-gray-600 mb-6">Create your first article to get started with content management</p>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                 {articles.map((article, index) => (
//                   <div 
//                     key={article.id} 
//                     className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300/50 transition-all duration-300 hover:-translate-y-1"
//                     style={{ animationDelay: `${index * 50}ms` }}
//                   >
//                     <div className="flex flex-col h-full">
//                       {/* Article Header */}
//                       <div className="flex-1 mb-4">
//                         <div className="flex items-start justify-between mb-3">
//                           <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-200">
//                             {article.title}
//                           </h3>
//                           <div className="flex space-x-1 ml-2">
//                             <button
//                               onClick={() => setEditingArticle(article)}
//                               className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
//                               title="Edit article"
//                             >
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                               </svg>
//                             </button>
//                             <button
//                               onClick={() => handleDelete(article.id)}
//                               className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
//                               title="Delete article"
//                             >
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                               </svg>
//                             </button>
//                           </div>
//                         </div>
                        
//                         <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
//                           {article.content}
//                         </p>
//                       </div>
                      
//                       {/* Article Footer */}
//                       <div className="flex items-center justify-between pt-4 border-t border-gray-100">
//                         <div className="flex items-center space-x-2">
//                           <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full">
//                             {article.category}
//                           </span>
//                           <span className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
//                             {article.language.toUpperCase()}
//                           </span>
//                         </div>
                        
//                         <div className="flex items-center text-xs text-gray-500">
//                           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                           </svg>
//                           {formatTimeAgo(article.created_at)}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminArticleList;

import { useEffect, useState } from 'react';
import { getArticles, deleteArticle } from '../services/api';
import EditArticleForm from './EditArticleForm';
import { Transition } from '@headlessui/react';

const AdminArticleList = ({ language, onArticleDeleted, onArticleUpdated }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);
  const [deletingArticle, setDeletingArticle] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, [language]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticles(language);
      setArticles(data);
    } catch (err) {
      setError(err.message || 'Failed to load articles');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingArticle) return;
    
    setIsDeleting(true);
    try {
      await deleteArticle(deletingArticle.id);
      await fetchArticles();
      onArticleDeleted && onArticleDeleted();
      setDeletingArticle(null);
    } catch (err) {
      setError(err.message || 'Failed to delete article');
      console.error('Delete error:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditComplete = () => {
    setEditingArticle(null);
    fetchArticles();
    onArticleUpdated && onArticleUpdated();
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = now - date;
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    } else {
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Article Management</h1>
              <p className="text-gray-600">Manage and organize your content articles</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-full">
                {language?.toUpperCase() || 'ALL'}
              </div>
              <div className="px-3 py-1 bg-white/60 backdrop-blur-sm border border-gray-200 text-gray-700 text-sm rounded-full">
                {articles.length} {articles.length === 1 ? 'Article' : 'Articles'}
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-400 rounded-full animate-spin animation-delay-150"></div>
            </div>
            <p className="mt-4 text-gray-600 font-medium">Loading articles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50/80 backdrop-blur-sm border border-red-200 rounded-xl p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <h3 className="text-sm font-medium text-red-800">Something went wrong</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
                <button
                  onClick={fetchArticles}
                  className="mt-3 inline-flex items-center px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 text-sm font-medium rounded-lg transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Article Modal */}
        <Transition show={!!editingArticle}>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              {/* Backdrop */}
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                  onClick={() => setEditingArticle(null)}
                />
              </Transition.Child>

              {/* Modal Content */}
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 translate-y-4"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-4"
              >
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 w-full max-w-4xl mx-4">
                  
                  {/* Modal Body */}
                  <div className="p-6">
                    {editingArticle && (
                      <EditArticleForm
                        article={editingArticle}
                        onCancel={() => setEditingArticle(null)}
                        onSuccess={handleEditComplete}
                      />
                    )}
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Transition>

        {/* Delete Confirmation Modal */}
        <Transition show={!!deletingArticle}>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4">
              {/* Backdrop */}
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                  onClick={() => !isDeleting && setDeletingArticle(null)}
                />
              </Transition.Child>

              {/* Modal Content */}
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 translate-y-4"
                enterTo="opacity-100 scale-100 translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100 translate-y-0"
                leaveTo="opacity-0 scale-95 translate-y-4"
              >
                <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 w-full max-w-md mx-4 p-6">
                  {/* Warning Icon */}
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>

                  {/* Modal Content */}
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Delete Article</h3>
                    <p className="text-gray-600 mb-4">
                      Are you sure you want to delete this article? This action cannot be undone.
                    </p>
                    
                    {deletingArticle && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          "{deletingArticle.title}"
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Category: {deletingArticle.category} • {deletingArticle.language.toUpperCase()}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    <button
                      type="button"
                      className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
                      onClick={() => setDeletingArticle(null)}
                      disabled={isDeleting}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      onClick={handleDelete}
                      disabled={isDeleting}
                    >
                      {isDeleting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Deleting...
                        </>
                      ) : (
                        'Delete Article'
                      )}
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Transition>

        {/* Article List */}
        {!loading && !error && (
          <div>
            {articles.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles yet</h3>
                <p className="text-gray-600 mb-6">Create your first article to get started with content management</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {articles.map((article, index) => (
                  <div 
                    key={article.id} 
                    className="group bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-300/50 transition-all duration-300 hover:-translate-y-1"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="flex flex-col h-full">
                      {/* Article Header */}
                      <div className="flex-1 mb-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-700 transition-colors duration-200">
                            {article.title}
                          </h3>
                          <div className="flex space-x-1 ml-2">
                            <button
                              onClick={() => setEditingArticle(article)}
                              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                              title="Edit article"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={() => setDeletingArticle(article)}
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                              title="Delete article"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4">
                          {article.content}
                        </p>
                      </div>
                      
                      {/* Article Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <span className="inline-flex items-center px-2.5 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-medium rounded-full">
                            {article.category}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                            {article.language.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-500">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {formatTimeAgo(article.created_at)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminArticleList;