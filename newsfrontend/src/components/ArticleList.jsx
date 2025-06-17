// import { useEffect, useState } from 'react';
// import { getArticles, deleteArticle } from '../services/api';
// import EditArticleForm from './EditArticleForm';

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
//       const data = await getArticles(language === 'so' ? 'so' : 'en');
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
//     } catch (err) {
//       setError(err.message || 'Failed to delete article');
//       console.error('Delete error:', err);
//     }
//   };

//   const handleEditComplete = () => {
//     setEditingArticle(null);
//     fetchArticles();
//   };

//   if (loading) return <div className="text-center py-8">Loading articles...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
//   if (editingArticle) return <EditArticleForm article={editingArticle} onCancel={() => setEditingArticle(null)} onSuccess={handleEditComplete} />;

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="flex justify-center mb-8">
//         <button 
//           onClick={() => onLanguageChange('original')}
//           className={`mx-2 px-4 py-2 rounded ${language === 'original' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           Original Language
//         </button>
//         <button 
//           onClick={() => onLanguageChange('so')}
//           className={`mx-2 px-4 py-2 rounded ${language === 'so' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           <img src="/somali-flag.png" alt="Somali Flag" className="h-6 w-auto mr-2 inline" />
//           Somali
//         </button>
//       </div>
      
//       <div className="space-y-8">
//         {articles.length === 0 ? (
//           <div className="text-center py-12 text-gray-500">
//             No articles found. Create one to get started!
//           </div>
//         ) : (
//           articles.map(article => (
//             <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//               {article.image && (
//                 <div className="w-full h-64 bg-gray-100 overflow-hidden">
//                   <img 
//                     src={article.image}
//                     alt={article.title}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = '/placeholder-image.jpg';
//                     }}
//                   />
//                 </div>
//               )}
//               <div className="p-6">
//                 <div className="flex justify-between items-start">
//                   <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
//                   {language === 'original' && (
//                     <div className="flex space-x-2">
//                       <button 
//                         onClick={() => setEditingArticle(article)}
//                         className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
//                       >
//                         Edit
//                       </button>
//                       <button 
//                         onClick={() => handleDelete(article.id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   )}
//                 </div>
//                 <p className="text-gray-700 mb-4 whitespace-pre-line">{article.content}</p>
//                 {article.video && (
//                   <div className="mt-4">
//                     <video controls className="w-full max-h-96">
//                       <source src={article.video} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   </div>
//                 )}
//                 <div className="text-sm text-gray-500 mt-4">
//                   Published on {new Date(article.created_at).toLocaleDateString()}
//                   {article.language === 'so' && (
//                     <span className="ml-2 text-blue-500">(Translated to Somali)</span>
//                   )}
//                 </div>
//               </div>
//             </article>
//           ))
//         )}
//       </div>
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Language Toggle with Flags */}
      <div className="flex justify-center mb-8 space-x-4">
        <button
          onClick={() => onLanguageChange('original')}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-all duration-200 ${
            language !== 'so'
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg"
            alt="Kenyan Flag"
            className="h-6 w-8 mr-2 object-cover"
          />
          Original Language
        </button>
        <button
          onClick={() => onLanguageChange('so')}
          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-all duration-200 ${
            language === 'so'
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Flag_of_Somalia.svg"
            alt="Somali Flag"
            className="h-6 w-8 mr-2 object-cover"
          />
          Somali
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <svg
            className="animate-spin h-8 w-8 text-indigo-600 mx-auto"
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
          <p className="mt-2 text-gray-600">Loading articles...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
          <p className="text-sm text-red-700">Error: {error}</p>
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

      {/* Article List */}
      {!loading && !error && !editingArticle && (
        <div className="space-y-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">No articles found. Create one to get started!</p>
            </div>
          ) : (
            filteredArticles.map(article => (
              <article
                key={article.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                {article.image && (
                  <div className="w-full h-64 bg-gray-100 overflow-hidden">
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
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">{article.title}</h2>
                    {language !== 'so' && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setEditingArticle(article)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(article.id)}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 whitespace-pre-line">
                    {article.content}
                  </p>
                  {article.video && (
                    <div className="mt-4">
                      <video controls className="w-full max-h-80 rounded-md">
                        <source src={article.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <div className="text-xs text-gray-500 mt-4 flex items-center">
                    <span>Published on {new Date(article.created_at).toLocaleDateString()}</span>
                    <span className="ml-2 text-indigo-600">
                      {article.language === 'so' ? '(Somali)' : `(${article.language || 'Original'})`}
                    </span>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ArticleList;