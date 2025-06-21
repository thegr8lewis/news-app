// import { useEffect, useState } from 'react';
// import { getArticles, deleteArticle } from '../services/api';
// import EditArticleForm from './EditArticleForm';
// import { Transition } from '@headlessui/react';
// import FeaturedLiveBlog from './FeaturedLiveBlog';
// import GridArticles from './GridArticles';
// import BottomArticle from './BottomArticle';
// import RightSidebar from './RightSidebar';

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
//       const data = await getArticles();
//       setArticles(data);
//     } catch (err) {
//       setError(err.message || 'Failed to load articles');
//       console.error('Fetch error:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredArticles = articles.filter(article => {
//     if (language === 'so') {
//       return article.language === 'so';
//     }
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
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Morion:wght@300;400;500;600;700;800&display=swap');
        
//         .morion-font {
//           font-family: 'Morion', serif;
//         }
        
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         .line-clamp-3 {
//           display: -webkit-box;
//           -webkit-line-clamp: 3;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>

//       <div className="bg-white min-h-screen">
//         {/* Loading State */}
//         {loading && (
//           <div className="text-center py-12">
//             <svg
//               className="animate-spin h-8 w-8 text-red-600 mx-auto"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               />
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               />
//             </svg>
//             <p className="mt-2 text-gray-600 morion-font">Loading articles...</p>
//           </div>
//         )}

//         {/* Error State */}
//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//             <p className="text-sm text-red-700 morion-font">Error: {error}</p>
//           </div>
//         )}

//         {/* Edit Article Modal */}
//         <Transition show={!!editingArticle}>
//           <div className="fixed inset-0 z-50 overflow-y-auto">
//             <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
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
//                   className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
//                   onClick={() => setEditingArticle(null)}
//                 />
//               </Transition.Child>

//               {/* Modal Content */}
//               <Transition.Child
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//                 enterTo="opacity-100 translate-y-0 sm:scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 translate-y-0 sm:scale-100"
//                 leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
//               >
//                 <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full sm:p-6">
//                   <button
//                     type="button"
//                     className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
//                     onClick={() => setEditingArticle(null)}
//                   >
//                     <span className="sr-only">Close</span>
//                     <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

//         {/* Main Content */}
//         {!loading && !error && !editingArticle && (
//           <div className="w-[80vw] mx-auto">
//             {filteredArticles.length === 0 ? (
//               <div className="text-center py-12">
//                 <p className="text-gray-500 text-lg morion-font">No articles found. Create one to get started!</p>
//               </div>
//             ) : (
//               <div className="flex gap-0 p-0 m-0">
//                 {/* Left Column - Main Content */}
//                 <div className="flex-1 p-0 m-0">
//                   <FeaturedLiveBlog 
//                     article={filteredArticles[0]} 
//                     language={language}
//                     onEdit={setEditingArticle}
//                     onDelete={handleDelete}
//                     formatTimeAgo={formatTimeAgo}
//                   />
                  
//                   <GridArticles 
//                     articles={filteredArticles.slice(1, 5)} 
//                     language={language}
//                     onEdit={setEditingArticle}
//                     onDelete={handleDelete}
//                     formatTimeAgo={formatTimeAgo}
//                   />
                  
//                   <BottomArticle 
//                     article={filteredArticles[5]} 
//                     language={language}
//                     onEdit={setEditingArticle}
//                     onDelete={handleDelete}
//                     formatTimeAgo={formatTimeAgo}
//                   />
//                 </div>

//                 <RightSidebar 
//                   articles={filteredArticles}
//                   language={language}
//                   onEdit={setEditingArticle}
//                   onDelete={handleDelete}
//                   formatTimeAgo={formatTimeAgo}
//                 />
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ArticleList;


import { useEffect, useState } from 'react';
import { getArticles, deleteArticle } from '../services/api';
import EditArticleForm from './EditArticleForm';
import { Transition } from '@headlessui/react';
import FeaturedLiveBlog from './FeaturedLiveBlog';
import GridArticles from './GridArticles';
import BottomArticle from './BottomArticle';
import RightSidebar from './RightSidebar';
import { useTranslation } from '../contexts/TranslationContext';
import { translateTimeAgo } from '../utils/translation';

const ArticleList = () => {
  const { language } = useTranslation();
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingArticle, setEditingArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    // Filter articles whenever language changes
    if (allArticles.length > 0) {
      filterArticlesByLanguage();
    }
  }, [language, allArticles]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getArticles();
      setAllArticles(data);
    } catch (err) {
      setError(err.message || 'Failed to load articles');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterArticlesByLanguage = () => {
    // First try to get articles in the selected language
    const langArticles = allArticles.filter(article => article.language === language);
    
    // If none found and not English, show English articles as fallback
    if (langArticles.length === 0 && language !== 'en') {
      const englishArticles = allArticles.filter(article => article.language === 'en');
      setFilteredArticles(englishArticles);
    } else {
      setFilteredArticles(langArticles);
    }
  };

  const handleDelete = async (id) => {
    const confirmMessage = 
      language === 'so' ? 'Ma hubtaa inaad rabto inaad tirtirto warqadan?' :
      language === 'sw' ? 'Una uhakika unataka kufuta makala hii?' :
      'Are you sure you want to delete this article?';
    
    if (!window.confirm(confirmMessage)) return;
    
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

  // Get featured articles (first 6 for main content)
  const featuredArticles = filteredArticles.slice(0, 6);

  // Group articles by categories for the sidebar
  const categorizedArticles = filteredArticles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {});

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
            <p className="mt-2 text-gray-600 morion-font">
              {language === 'so' ? 'Soo dejinta wararka...' : 
               language === 'sw' ? 'Inapakia makala...' : 
               'Loading articles...'}
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <p className="text-sm text-red-700 morion-font">
              {language === 'so' ? 'Khalad: ' : 
               language === 'sw' ? 'Hitilafu: ' : 
               'Error: '}{error}
            </p>
          </div>
        )}

        {/* Edit Article Modal */}
        <Transition show={!!editingArticle}>
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
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
                    <span className="sr-only">
                      {language === 'so' ? 'Xidh' : 
                       language === 'sw' ? 'Funga' : 
                       'Close'}
                    </span>
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
          <div className="w-[80vw] mx-auto">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg morion-font">
                  {language === 'so' ? 'Ma jiro warar la heli karo.' : 
                   language === 'sw' ? 'Hakuna makala zilizopatikana.' : 
                   'No articles found.'}
                </p>
                {language !== 'en' && (
                  <p className="text-gray-500 text-sm mt-2">
                    {language === 'so' ? 'Laga soo bandhigayo wararka Ingiriisiga' : 
                     language === 'sw' ? 'Inaonyesha makala ya Kiingereza' : 
                     'Showing English articles'}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex gap-0 p-0 m-0">
                {/* Left Column - Main Content */}
                <div className="flex-1 p-0 m-0">
                  <FeaturedLiveBlog 
                    article={featuredArticles[0]} 
                    onEdit={setEditingArticle}
                    onDelete={handleDelete}
                    formatTimeAgo={translateTimeAgo}
                  />
                  
                  <GridArticles 
                    articles={featuredArticles.slice(1, 5)} 
                    onEdit={setEditingArticle}
                    onDelete={handleDelete}
                    formatTimeAgo={translateTimeAgo}
                  />
                  
                  <BottomArticle 
                    article={featuredArticles[5]} 
                    onEdit={setEditingArticle}
                    onDelete={handleDelete}
                    formatTimeAgo={translateTimeAgo}
                  />
                </div>

                <RightSidebar 
                  categorizedArticles={categorizedArticles}
                  onEdit={setEditingArticle}
                  onDelete={handleDelete}
                  formatTimeAgo={translateTimeAgo}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleList;