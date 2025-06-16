// // newsfrontend/src/components/ArticleList.jsx
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
//       const data = await getArticles(language);
//       setArticles(data);
//       setError(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm('Are you sure you want to delete this article?')) return;
    
//     try {
//       await deleteArticle(id);
//       fetchArticles(); // Refresh the list
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleEditComplete = () => {
//     setEditingArticle(null);
//     fetchArticles(); // Refresh the list
//   };

//   if (loading) return <div className="text-center py-8">Loading...</div>;
//   if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

//   if (editingArticle) {
//     return (
//       <EditArticleForm 
//         article={editingArticle} 
//         onCancel={() => setEditingArticle(null)}
//         onSuccess={handleEditComplete}
//       />
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <div className="flex justify-center mb-8">
//         <button 
//           onClick={() => onLanguageChange('en')}
//           className={`mx-2 px-4 py-2 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//         >
//           <img src="/kenyan-flag.png" alt="Kenyan Flag" className="h-6 w-auto mr-2 inline" />
//           English
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
//         {articles.map(article => (
//           <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             {article.image && (
//               <img 
//                 src={`http://localhost:8000${article.image}`} 
//                 alt={article.title} 
//                 className="w-full h-64 object-cover"
//               />
//             )}
//             <div className="p-6">
//               <div className="flex justify-between items-start">
//                 <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
//                 <div className="flex space-x-2">
//                   <button 
//                     onClick={() => setEditingArticle(article)}
//                     className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
//                   >
//                     Edit
//                   </button>
//                   <button 
//                     onClick={() => handleDelete(article.id)}
//                     className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//               <p className="text-gray-700 mb-4 whitespace-pre-line">{article.content}</p>
//               {article.video && (
//                 <div className="mt-4">
//                   <video controls className="w-full">
//                     <source src={`http://localhost:8000${article.video}`} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 </div>
//               )}
//               <div className="text-sm text-gray-500 mt-4">
//                 Published on {new Date(article.created_at).toLocaleDateString()}
//               </div>
//             </div>
//           </article>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ArticleList;

// newsfrontend/src/components/ArticleList.jsx
import { useEffect, useState } from 'react';
import { getArticles, deleteArticle } from '../services/api';
import EditArticleForm from './EditArticleForm';

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
      let data = await getArticles();
      
      // Filter based on language selection
      if (language === 'so') {
        // Show only Somali translations
        data = data.filter(article => article.language === 'so');
      } else {
        // Show original articles (English or any other original language)
        data = data.filter(article => !article.original_article);
      }
      
      setArticles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    
    try {
      await deleteArticle(id);
      fetchArticles(); // Refresh the list
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditComplete = () => {
    setEditingArticle(null);
    fetchArticles(); // Refresh the list
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  if (editingArticle) {
    return (
      <EditArticleForm 
        article={editingArticle} 
        onCancel={() => setEditingArticle(null)}
        onSuccess={handleEditComplete}
      />
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-center mb-8">
        <button 
          onClick={() => onLanguageChange('original')}
          className={`mx-2 px-4 py-2 rounded ${language === 'original' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          Original Language
        </button>
        <button 
          onClick={() => onLanguageChange('so')}
          className={`mx-2 px-4 py-2 rounded ${language === 'so' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          <img src="/somali-flag.png" alt="Somali Flag" className="h-6 w-auto mr-2 inline" />
          Somali
        </button>
      </div>
      
      <div className="space-y-8">
        {articles.map(article => (
          <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {article.image && (
              <img 
                src={`http://localhost:8000${article.image}`} 
                alt={article.title} 
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
                {language === 'original' && (
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setEditingArticle(article)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(article.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-700 mb-4 whitespace-pre-line">{article.content}</p>
              {article.video && (
                <div className="mt-4">
                  <video controls className="w-full">
                    <source src={`http://localhost:8000${article.video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
              <div className="text-sm text-gray-500 mt-4">
                Published on {new Date(article.created_at).toLocaleDateString()}
                {article.language === 'so' && (
                  <span className="ml-2 text-blue-500">(Translated to Somali)</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;