// // newsfrontend/src/components/ArticleList.jsx
// import { useEffect, useState } from 'react';
// import { getArticles, deleteArticle } from '../services/api';
// import EditArticleForm from './EditArticleForm';
// import { Transition } from '@headlessui/react';

// const ArticleList = ({ language, onLanguageChange }) => {
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
//       // Fetch all articles (both original and translations)
//       const data = await getArticles();
//       setArticles(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load articles');
//       console.error('Fetch error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter articles based on selected language
//   const filteredArticles = articles.filter(article => {
//     if (language === 'so') {
//       return article.language === 'so';
//     }
//     // For original language view, show only non-Somali articles
//     return article.language !== 'so';
//   });

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this article?')) return;
//     try {
//       await deleteArticle(id);
//       await fetchArticles();
//     } catch (err) {
//       setError(err.message || 'Failed to delete article');
//       console.error('Delete error:', err);
//     }
//   };

//   const handleEditComplete = () => {
//     setEditingArticle(null);
//     fetchArticles();
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = now - date;
//     const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//     if (diffHours < 1) {
//       const diffMinutes = Math.floor(diffTime / (1000 * 60));
//       return `${diffMinutes} min${diffMinutes !== 1 ? 's' : ''} ago`;
//     } else if (diffHours < 24) {
//       return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
//     } else if (diffDays < 7) {
//       return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-white">
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Morion:wght@300;400;500;600;700&display=swap');
        
//         .morion-font {
//           font-family: 'Morion', serif;
//         }
//       `}</style>

//       {/* Loading State */}
//       {loading && (
//         <div className="text-center py-12">
//           <svg
//             className="animate-spin h-8 w-8 text-red-600 mx-auto"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <circle
//               className="opacity-25"
//               cx="12"
//               cy="12"
//               r="10"
//               stroke="currentColor"
//               strokeWidth="4"
//             />
//             <path
//               className="opacity-75"
//               fill="currentColor"
//               d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//             />
//           </svg>
//           <p className="mt-2 text-gray-600 morion-font">Loading articles...</p>
//         </div>
//       )}

//       {/* Error State */}
//       {error && (
//         <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//           <p className="text-sm text-red-700 morion-font">Error: {error}</p>
//         </div>
//       )}

//       {/* Edit Article Modal */}
//       <Transition show={!!editingArticle}>
//         <div className="fixed inset-0 z-50 overflow-y-auto">
//           <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
//             {/* Backdrop */}
//             <Transition.Child
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div
//                 className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
//                 onClick={() => setEditingArticle(null)}
//               />
//             </Transition.Child>

//             {/* Modal Content */}
//             <Transition.Child
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               enterTo="opacity-100 translate-y-0 sm:scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//               leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//             >
//               <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full sm:p-6">
//                 <button
//                   type="button"
//                   className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
//                   onClick={() => setEditingArticle(null)}
//                 >
//                   <span className="sr-only">Close</span>
//                   <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 </button>
//                 {editingArticle && (
//                   <EditArticleForm
//                     article={editingArticle}
//                     onCancel={() => setEditingArticle(null)}
//                     onSuccess={handleEditComplete}
//                   />
//                 )}
//               </div>
//             </Transition.Child>
//           </div>
//         </div>
//       </Transition>

//       {/* Article List */}
//       {!loading && !error && !editingArticle && (
//         <div className="max-w-7xl mx-auto px-4 py-6">
//           {filteredArticles.length === 0 ? (
//             <div className="text-center py-12">
//               <p className="text-gray-500 text-lg morion-font">No articles found. Create one to get started!</p>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//               {/* Main Featured Article */}
//               {filteredArticles[0] && (
//                 <div className="lg:col-span-2">
//                   <article className="group cursor-pointer">
//                     <div className="relative">
//                       {filteredArticles[0].image && (
//                         <div className="aspect-[16/10] bg-gray-100 overflow-hidden rounded-lg">
//                           <img
//                             src={filteredArticles[0].image}
//                             alt={filteredArticles[0].title}
//                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                             onError={(e) => {
//                               e.target.onerror = null;
//                               e.target.src = '/placeholder-image.jpg';
//                             }}
//                           />
//                         </div>
//                       )}
                      
//                       {/* Live Badge */}
//                       <div className="absolute top-4 left-4">
//                         <div className="flex items-center space-x-2">
//                           <span className="bg-black text-white px-3 py-1 text-xs font-medium rounded morion-font">
//                             News
//                           </span>
//                           <div className="flex items-center bg-black text-white px-3 py-1 rounded">
//                             <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
//                             <span className="text-xs font-medium morion-font">LIVE</span>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Edit/Delete Buttons for Non-Somali */}
//                       {language !== 'so' && (
//                         <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               setEditingArticle(filteredArticles[0]);
//                             }}
//                             className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition-colors morion-font"
//                           >
//                             Edit
//                           </button>
//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(filteredArticles[0].id);
//                             }}
//                             className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 transition-colors morion-font"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </div>

//                     <div className="mt-4">
//                       <h1 className="text-4xl font-bold text-gray-900 leading-tight morion-font group-hover:text-gray-700 transition-colors">
//                         {filteredArticles[0].title}
//                       </h1>
//                       <p className="mt-3 text-gray-600 text-lg leading-relaxed morion-font line-clamp-3">
//                         {filteredArticles[0].content.substring(0, 200)}...
//                       </p>
                      
//                       {/* Video if available */}
//                       {filteredArticles[0].video && (
//                         <div className="mt-4">
//                           <video controls className="w-full max-h-80 rounded-lg">
//                             <source src={filteredArticles[0].video} type="video/mp4" />
//                             Your browser does not support the video tag.
//                           </video>
//                         </div>
//                       )}

//                       <div className="mt-4 flex items-center text-sm text-gray-500 morion-font">
//                         <span className="font-medium">News</span>
//                         <span className="mx-2">•</span>
//                         <span>{formatDate(filteredArticles[0].created_at)}</span>
//                         <span className="mx-2">•</span>
//                         <span className="text-blue-600">
//                           {filteredArticles[0].language === 'so' ? 'Somali' : filteredArticles[0].language || 'Original'}
//                         </span>
//                       </div>
//                     </div>
//                   </article>
//                 </div>
//               )}

//               {/* Sidebar Articles */}
//               <div className="space-y-6">
//                 {/* Latest Section */}
//                 <div>
//                   <h2 className="text-red-600 text-sm font-bold mb-4 morion-font tracking-wide">LATEST</h2>
//                   <div className="space-y-4">
//                     {filteredArticles.slice(1, 4).map((article) => (
//                       <article key={article.id} className="group cursor-pointer">
//                         <div className="flex space-x-3">
//                           {article.image && (
//                             <div className="flex-shrink-0 w-20 h-16 bg-gray-100 rounded overflow-hidden">
//                               <img
//                                 src={article.image}
//                                 alt={article.title}
//                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                                 onError={(e) => {
//                                   e.target.onerror = null;
//                                   e.target.src = '/placeholder-image.jpg';
//                                 }}
//                               />
//                             </div>
//                           )}
//                           <div className="flex-1 min-w-0">
//                             <h3 className="text-sm font-semibold text-gray-900 leading-tight morion-font group-hover:text-gray-700 transition-colors line-clamp-2">
//                               {article.title}
//                             </h3>
//                             <div className="mt-1 flex items-center text-xs text-gray-500 morion-font">
//                               <span className="font-medium">News</span>
//                               <span className="mx-1">•</span>
//                               <span>{formatDate(article.created_at)}</span>
//                             </div>
                            
//                             {/* Edit/Delete Buttons */}
//                             {language !== 'so' && (
//                               <div className="mt-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     setEditingArticle(article);
//                                   }}
//                                   className="bg-blue-600 text-white px-2 py-1 text-xs rounded hover:bg-blue-700 transition-colors morion-font"
//                                 >
//                                   Edit
//                                 </button>
//                                 <button
//                                   onClick={(e) => {
//                                     e.stopPropagation();
//                                     handleDelete(article.id);
//                                   }}
//                                   className="bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700 transition-colors morion-font"
//                                 >
//                                   Delete
//                                 </button>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       </article>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Video Section */}
//                 {filteredArticles.find(article => article.video) && (
//                   <div>
//                     <div className="bg-red-600 text-white px-2 py-1 text-xs font-bold inline-block morion-font">
//                       VIDEO
//                     </div>
//                     <div className="mt-2">
//                       {filteredArticles.filter(article => article.video).slice(0, 1).map((article) => (
//                         <article key={`video-${article.id}`} className="group cursor-pointer">
//                           <div className="aspect-video bg-gray-100 rounded overflow-hidden mb-2">
//                             <video 
//                               className="w-full h-full object-cover"
//                               poster={article.image}
//                             >
//                               <source src={article.video} type="video/mp4" />
//                             </video>
//                           </div>
//                           <h3 className="text-sm font-semibold text-gray-900 morion-font group-hover:text-gray-700 transition-colors">
//                             {article.title}
//                           </h3>
//                           <div className="mt-1 text-xs text-gray-500 morion-font">
//                             Video: {article.title.split(' ').slice(0, 5).join(' ')}...
//                           </div>
//                         </article>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Additional Articles Grid */}
//           {filteredArticles.length > 4 && (
//             <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {filteredArticles.slice(4).map((article) => (
//                 <article key={article.id} className="group cursor-pointer">
//                   {article.image && (
//                     <div className="aspect-[4/3] bg-gray-100 rounded overflow-hidden mb-3">
//                       <img
//                         src={article.image}
//                         alt={article.title}
//                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                         onError={(e) => {
//                           e.target.onerror = null;
//                           e.target.src = '/placeholder-image.jpg';
//                         }}
//                       />
//                     </div>
//                   )}
                  
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900 morion-font group-hover:text-gray-700 transition-colors line-clamp-2">
//                       {article.title}
//                     </h3>
//                     <p className="mt-2 text-sm text-gray-600 morion-font line-clamp-2">
//                       {article.content.substring(0, 120)}...
//                     </p>
                    
//                     <div className="mt-3 flex items-center text-xs text-gray-500 morion-font">
//                       <span className="font-medium">News</span>
//                       <span className="mx-1">•</span>
//                       <span>{formatDate(article.created_at)}</span>
//                     </div>

//                     {/* Edit/Delete Buttons */}
//                     {language !== 'so' && (
//                       <div className="mt-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             setEditingArticle(article);
//                           }}
//                           className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition-colors morion-font"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDelete(article.id);
//                           }}
//                           className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 transition-colors morion-font"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </article>
//               ))}
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ArticleList;


// newsfrontend/src/components/ArticleList.jsx
import { useEffect, useState } from 'react';
import { getArticles, deleteArticle } from '../services/api';
import EditArticleForm from './EditArticleForm';
import { Transition } from '@headlessui/react';

const ArticleList = ({ language, onLanguageChange }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [language]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch all articles (both original and translations)
      const data = await getArticles();
      setArticles(data);
    } catch (err) {
      setError(err.message || 'Failed to load articles');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter articles based on selected language
  const filteredArticles = articles.filter(article => {
    if (language === 'so') {
      return article.language === 'so';
    }
    // For original language view, show only non-Somali articles
    return article.language !== 'so';
  });

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteArticle(id);
      await fetchArticles();
    } catch (err) {
      setError(err.message || 'Failed to delete article');
      console.error('Delete error:', err);
    }
  };

  const handleEditComplete = () => {
    setEditingArticle(null);
    fetchArticles();
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
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Morion:wght@300;400;500;600;700;800&display=swap');
        
        .morion-font {
          font-family: 'Morion', serif;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      <div className="bg-white min-h-screen">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <svg
              className="animate-spin h-8 w-8 text-red-600 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <p className="mt-2 text-gray-600 morion-font">Loading articles...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-sm text-red-700 morion-font">Error: {error}</p>
          </div>
        )}

        {/* Edit Article Modal */}
        <Transition show={!!editingArticle}>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
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
                  className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                  onClick={() => setEditingArticle(null)}
                />
              </Transition.Child>

              {/* Modal Content */}
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full sm:p-6">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                    onClick={() => setEditingArticle(null)}
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  {editingArticle && (
                    <EditArticleForm
                      article={editingArticle}
                      onCancel={() => setEditingArticle(null)}
                      onSuccess={handleEditComplete}
                    />
                  )}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Transition>

        {/* Main Content */}
        {!loading && !error && !editingArticle && (
          <div className="max-w-7xl mx-auto">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg morion-font">No articles found. Create one to get started!</p>
              </div>
            ) : (
              <div className="flex gap-8">
                {/* Left Column - Main Content */}
                <div className="flex-1">

                  {/* Featured Live Blog Article */}
                  {filteredArticles[0] && (
                    <div className="mb-8">
                      <div className="relative bg-gray-50 p-6 flex gap-6">
                        {/* Left side: Content */}
                        <div className="flex-1">
                          <h1 className="text-5xl font-bold text-black leading-tight morion-font mb-4">
                            Live Blog: {filteredArticles[0].title}
                          </h1>
                          
                          <p className="text-lg text-gray-700 leading-relaxed morion-font mb-4">
                            {filteredArticles[0].content.length > 150 
                              ? filteredArticles[0].content.substring(0, 150) + '...'
                              : filteredArticles[0].content
                            }
                          </p>
                          
                          <div className="flex items-center space-x-4 text-sm text-gray-600 morion-font">
                            <div className="flex items-center">
                              <span className="bg-black text-white px-2 py-1 text-xs rounded mr-2">News</span>
                              <div className="flex items-center bg-black text-white px-2 py-1 rounded">
                                <div className="w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></div>
                                <span className="text-xs font-medium">LIVE</span>
                              </div>
                            </div>
                          </div>
                          
                          {filteredArticles[0].video && (
                            <div className="mt-6">
                              <video controls className="w-full max-h-80 rounded">
                                <source src={filteredArticles[0].video} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                        </div>
                        
                        {/* Right side: Image */}
                        {filteredArticles[0].image && (
                          <div className="w-80 h-80 bg-gray-100 overflow-hidden flex-shrink-0">
                            <img
                              src={filteredArticles[0].image}
                              alt={filteredArticles[0].title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                              }}
                            />
                          </div>
                        )}
                        
                        {/* Admin buttons overlay */}
                        {language !== 'so' && (
                          <div className="absolute top-4 right-4 flex space-x-2">
                            <button
                              onClick={() => setEditingArticle(filteredArticles[0])}
                              className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition-colors morion-font"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(filteredArticles[0].id)}
                              className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 transition-colors morion-font"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Additional Articles in Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {filteredArticles.slice(1, 5).map((article) => (
                      <div key={article.id} className="group relative">
                        <div className="bg-gray-50 p-4 h-full flex gap-3">
                          {/* Left side: Title and Content */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-black morion-font mb-2 line-clamp-2">
                              {article.title}
                            </h3>
                            
                            <div className="flex items-center text-sm text-gray-600 morion-font mb-3">
                              <span className="font-medium">Guest Blogs</span>
                              <span className="mx-2">•</span>
                              <span>{formatTimeAgo(article.created_at)}</span>
                            </div>
                            
                            {article.content && (
                              <p className="text-gray-700 text-sm morion-font line-clamp-3">
                                {article.content.substring(0, 120)}...
                              </p>
                            )}
                          </div>
                          
                          {/* Right side: Image */}
                          {article.image && (
                            <div className="w-20 h-16 bg-gray-200 flex-shrink-0">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/placeholder-image.jpg';
                                }}
                              />
                            </div>
                          )}
                          
                          {/* Admin buttons */}
                          {language !== 'so' && (
                            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setEditingArticle(article)}
                                className="bg-blue-600 text-white px-2 py-1 text-xs rounded hover:bg-blue-700 morion-font"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700 morion-font"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                                    {/* Additional Articles in Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-8">
                    {filteredArticles.slice(1, 5).map((article) => (
                      <div key={article.id} className="group relative">
                        <div className="bg-gray-50 p-4 h-full flex gap-3">
                          {/* Left side: Title and Content */}
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-black morion-font mb-2 line-clamp-2">
                              {article.title}
                            </h3>
                            
                            <div className="flex items-center text-sm text-gray-600 morion-font mb-3">
                              <span className="font-medium">Guest Blogs</span>
                              <span className="mx-2">•</span>
                              <span>{formatTimeAgo(article.created_at)}</span>
                            </div>
                            
                            {article.content && (
                              <p className="text-gray-700 text-sm morion-font line-clamp-3">
                                {article.content.substring(0, 120)}...
                              </p>
                            )}
                          </div>
                          
                          {/* Right side: Image */}
                          {article.image && (
                            <div className="w-20 h-16 bg-gray-200 flex-shrink-0">
                              <img
                                src={article.image}
                                alt={article.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = '/placeholder-image.jpg';
                                }}
                              />
                            </div>
                          )}
                          
                          {/* Admin buttons */}
                          {language !== 'so' && (
                            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setEditingArticle(article)}
                                className="bg-blue-600 text-white px-2 py-1 text-xs rounded hover:bg-blue-700 morion-font"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700 morion-font"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Article */}
                  {filteredArticles[5] && (
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex gap-6">
                        <div className="flex-1">
                          <h2 className="text-3xl font-bold text-black morion-font mb-3">
                            {filteredArticles[5].title}
                          </h2>
                          <p className="text-gray-700 morion-font text-lg leading-relaxed">
                            {filteredArticles[5].content.length > 200 
                              ? filteredArticles[5].content.substring(0, 200) + '...'
                              : filteredArticles[5].content
                            }
                          </p>
                          <div className="flex items-center text-sm text-gray-600 morion-font mt-3">
                            <span className="font-medium">News</span>
                            <span className="mx-2">•</span>
                            <span>{formatTimeAgo(filteredArticles[5].created_at)}</span>
                            <div className="ml-4 flex items-center text-blue-600">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                              </svg>
                              <span>Listen</span>
                            </div>
                          </div>

                          {/* Admin buttons */}
                          {language !== 'so' && (
                            <div className="mt-3 flex space-x-2">
                              <button
                                onClick={() => setEditingArticle(filteredArticles[5])}
                                className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 morion-font"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(filteredArticles[5].id)}
                                className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 morion-font"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                        
                        {filteredArticles[5].image && (
                          <div className="w-32 h-24 bg-gray-200 flex-shrink-0">
                            <img
                              src={filteredArticles[5].image}
                              alt={filteredArticles[5].title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder-image.jpg';
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Sidebar */}
                <div className="w-80 flex-shrink-0">
                  {/* Video Section */}
                  {filteredArticles.find(article => article.video) && (
                    <div className="mb-8">
                      <div className="bg-white text-red-600 text-xs font-bold px-2 py-1 inline-block morion-font mb-3">
                        VIDEO
                      </div>
                      
                      {filteredArticles.filter(article => article.video).slice(0, 1).map((article) => (
                        <div key={`video-${article.id}`} className="mb-6 group relative">
                          <div className="aspect-video bg-gray-900 rounded overflow-hidden mb-3 relative">
                            <video 
                              className="w-full h-full object-cover"
                              poster={article.image}
                            >
                              <source src={article.video} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                              <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M8 5v10l8-5-8-5z"/>
                                </svg>
                              </div>
                            </div>
                            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded morion-font">
                              {article.title.split(' ').slice(0, 8).join(' ')}...
                            </div>
                          </div>
                          <h3 className="text-lg font-bold text-black morion-font line-clamp-2">
                            {article.title}
                          </h3>

                          {/* Admin buttons */}
                          {language !== 'so' && (
                            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setEditingArticle(article)}
                                className="bg-blue-600 text-white px-2 py-1 text-xs rounded hover:bg-blue-700 morion-font"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700 morion-font"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Latest Section */}
                  <div>
                    <div className="bg-white text-red-600 text-xs font-bold px-2 py-1 inline-block morion-font mb-4">
                      LATEST
                    </div>
                    
                    <div className="space-y-6">
                      {filteredArticles.slice(-3).reverse().map((article) => (
                        <div key={`latest-${article.id}`} className="group relative">
                          <h3 className="text-lg font-bold text-black morion-font mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          
                          <div className="flex items-center text-sm text-gray-600 morion-font">
                            <span className="font-medium">News</span>
                            <span className="mx-2">•</span>
                            <span>{formatTimeAgo(article.created_at)}</span>
                          </div>

                          {/* Admin buttons */}
                          {language !== 'so' && (
                            <div className="absolute top-0 right-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => setEditingArticle(article)}
                                className="bg-blue-600 text-white px-2 py-1 text-xs rounded hover:bg-blue-700 morion-font"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(article.id)}
                                className="bg-red-600 text-white px-2 py-1 text-xs rounded hover:bg-red-700 morion-font"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Live Blog Section */}
                  <div className="mt-8 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-black morion-font mb-4">
                      Live Blog: {filteredArticles[0]?.title}
                    </h3>
                    {filteredArticles[0]?.image && (
                      <div className="w-full h-32 bg-gray-200 mb-3">
                        <img
                          src={filteredArticles[0].image}
                          alt={filteredArticles[0].title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleList;