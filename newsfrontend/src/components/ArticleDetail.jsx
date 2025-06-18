// import { useParams, useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { getArticleById, getArticles } from '../services/api';
// import { Transition } from '@headlessui/react';

// const ArticleDetail = ({ language, onLanguageChange }) => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [translationId, setTranslationId] = useState(null);
//   const [isSearching, setIsSearching] = useState(false);
//   const [currentSlug, setCurrentSlug] = useState(null);

//   useEffect(() => {
//     const fetchArticleAndTranslation = async () => {
//       try {
//         setLoading(true);
//         setError(null);
//         const currentArticle = await getArticleById(id);
//         setArticle(currentArticle);
//         setCurrentSlug(currentArticle.slug);

//         // Check for direct translation
//         if (currentArticle.translation_id) {
//           setTranslationId(currentArticle.translation_id);
//           return;
//         }

//         // Search for potential translations
//         const allArticles = await getArticles();
//         const translation = allArticles.find(a => 
//           a.translation_id === currentArticle.id || 
//           (a.slug === currentArticle.slug && a.language !== currentArticle.language)
//         );

//         if (translation) {
//           setTranslationId(translation.id);
//         }
//       } catch (err) {
//         setError(err.message || 'Failed to load article');
//         console.error('Fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArticleAndTranslation();
//   }, [id]);

//   useEffect(() => {
//     // Only try to find translation if we're not already showing the correct language
//     if (!article || article.language === language) return;

//     const findAndSwitchToTranslation = async () => {
//       try {
//         setIsSearching(true);
        
//         // First try direct translation ID
//         if (translationId) {
//           const translatedArticle = await getArticleById(translationId);
//           if (translatedArticle.language === language) {
//             navigate(`/articles/${translationId}`, { replace: true });
//             return;
//           }
//         }

//         // Fallback search by slug if available
//         if (currentSlug) {
//           const allArticles = await getArticles();
//           const translation = allArticles.find(a => 
//             a.slug === currentSlug && a.language === language
//           );

//           if (translation) {
//             navigate(`/articles/${translation.id}`, { replace: true });
//             return;
//           }
//         }

//         // If no translation found, stay on current article but show message
//       } catch (err) {
//         console.error('Translation search error:', err);
//       } finally {
//         setIsSearching(false);
//       }
//     };

//     findAndSwitchToTranslation();
//   }, [language, article, navigate, translationId, currentSlug]);

//   const isLanguageMatch = article && article.language === language;
//   const shouldShowNotFound = !loading && !error && article && !isLanguageMatch && !isSearching;

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   return (
//     <>
//       <style jsx global>{`
//         @import url('https://fonts.googleapis.com/css2?family=Morion:wght@300;400;500;600;700;800&display=swap');
        
//         .morion-font {
//           font-family: 'Morion', serif;
//         }
        
//         .article-content p {
//           margin-bottom: 1.5rem;
//           line-height: 1.8;
//         }
//       `}</style>

//       <div className="bg-white min-h-screen">
//         {loading && (
//           <div className="text-center py-12">
//             <svg
//               className="animate-spin h-8 w-8 text-red-600 mx-auto"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//             </svg>
//             <p className="mt-2 text-gray-600 morion-font">Loading article...</p>
//           </div>
//         )}

//         {error && (
//           <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
//             <p className="text-sm text-red-700 morion-font">Error: {error}</p>
//           </div>
//         )}

//         {shouldShowNotFound && (
//           <div className="text-center py-12">
//             <p className="text-gray-500 text-lg morion-font">
//               {`This article is not available in ${language === 'so' ? 'Somali' : 'English'}.`}
//             </p>
//             <button
//               onClick={() => navigate(-1)}
//               className="mt-4 flex items-center text-blue-600 morion-font mx-auto"
//             >
//               <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//               </svg>
//               Back to articles
//             </button>
//           </div>
//         )}

//         {!loading && !error && article && (isLanguageMatch || isSearching) && (
//           <div className="max-w-4xl mx-auto px-4 py-8">
//             <div className="flex justify-between items-center mb-6">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex items-center text-blue-600 morion-font"
//               >
//                 <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
//                 </svg>
//                 Back to articles
//               </button>

//               <div className="flex space-x-2">
//                 <button
//                   onClick={() => onLanguageChange('en')}
//                   className={`px-3 py-1 rounded-md text-sm ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//                 >
//                   English
//                 </button>
//                 <button
//                   onClick={() => onLanguageChange('so')}
//                   className={`px-3 py-1 rounded-md text-sm ${language === 'so' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
//                 >
//                   Somali
//                 </button>
//               </div>
//             </div>

//             <article className="bg-white rounded-lg shadow-sm overflow-hidden">
//               <div className="p-6">
//                 <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight morion-font mb-4">
//                   {article.title}
//                 </h1>
                
//                 <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 morion-font mb-6">
//                   <span className="bg-black text-white px-2 py-1 text-xs rounded">News</span>
//                   <span>{formatDate(article.created_at)}</span>
//                   <span className="capitalize">{article.language === 'so' ? 'Somali' : 'English'} Version</span>
//                 </div>
//               </div>

//               {article.image && (
//                 <div className="w-full h-64 md:h-96 bg-gray-100">
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

//               {article.video && (
//                 <div className="mt-6 px-6">
//                   <video controls className="w-full rounded-lg">
//                     <source src={article.video} type="video/mp4" />
//                     Your browser does not support the video tag.
//                   </video>
//                 </div>
//               )}

//               <div className="p-6">
//                 <div className="prose max-w-none morion-font text-gray-800 article-content">
//                   {article.content.split('\n').map((paragraph, i) => (
//                     <p key={i} className="mb-6">{paragraph}</p>
//                   ))}
//                 </div>
//               </div>

//               <div className="border-t border-gray-200 p-6">
//                 <h3 className="text-lg font-bold text-black morion-font mb-4">
//                   More from our newsroom
//                 </h3>
//                 {translationId && (
//                   <button 
//                     onClick={() => {
//                       const newLanguage = language === 'so' ? 'en' : 'so';
//                       onLanguageChange(newLanguage);
//                     }}
//                     className="text-blue-600 hover:underline text-sm"
//                   >
//                     Read this article in {language === 'so' ? 'English' : 'Somali'}
//                   </button>
//                 )}
//               </div>
//             </article>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ArticleDetail;


import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../services/api';

const ArticleDetail = ({ language }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id || !language) return;
    
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        const data = await getArticleById(id, language);
        setArticle(data);
      } catch (err) {
        console.error('❌ Error fetching article:', err);
        setError('Failed to load article.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, language]);

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading article...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight" 
              style={{ fontFamily: 'Georgia, serif' }}>
            {article.title}
          </h1>
          

        </header>

        {/* Media */}
        {article.image && (
          <div className="mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto rounded-lg shadow-sm border border-gray-200"
            />
          </div>
        )}

        {article.video && !article.image && (
          <div className="mb-8">
            <video
              controls
              src={article.video}
              className="w-full rounded-lg shadow-sm border border-gray-200"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none pb-5">
          <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line"
               style={{ fontFamily: 'Morion, Georgia, serif' }}>
            {article.content}
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;