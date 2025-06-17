// // newsfrontend/src/components/RightSidebar.jsx
// import ArticleAdminButtons from './ArticleAdminButtons';

// const RightSidebar = ({ articles, language, onEdit, onDelete, formatTimeAgo }) => {
//   if (!articles || articles.length === 0) return null;

//   const videoArticle = articles.find(article => article.video);
//   const latestArticles = articles.slice(-3).reverse();

//   return (
//     <div className="w-80 flex-shrink-0">
//       {/* Video Section */}
//       {videoArticle && (
//         <div className="mb-8">
//           <div className="bg-white text-red-600 text-xs font-bold px-2 py-1 inline-block morion-font mb-3">
//             VIDEO
//           </div>
          
//           <div className="mb-6 group relative">
//             <div className="aspect-video bg-gray-900 rounded overflow-hidden mb-3 relative">
//               <video 
//                 className="w-full h-full object-cover"
//                 poster={videoArticle.image}
//               >
//                 <source src={videoArticle.video} type="video/mp4" />
//               </video>
//               <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
//                 <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
//                   <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
//                     <path d="M8 5v10l8-5-8-5z"/>
//                   </svg>
//                 </div>
//               </div>
//               <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded morion-font">
//                 {videoArticle.title.split(' ').slice(0, 8).join(' ')}...
//               </div>
//             </div>
//             <h3 className="text-lg font-bold text-black morion-font line-clamp-2">
//               {videoArticle.title}
//             </h3>

//             {/* Admin buttons */}
//             {language !== 'so' && (
//               <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                 <ArticleAdminButtons 
//                   article={videoArticle} 
//                   onEdit={onEdit} 
//                   onDelete={onDelete} 
//                   small
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* Latest Section */}
//       <div>
//         <div className="bg-white text-red-600 text-xs font-bold px-2 py-1 inline-block morion-font mb-4">
//           LATEST
//         </div>
        
//         <div className="space-y-6">
//           {latestArticles.map((article) => (
//             <div key={`latest-${article.id}`} className="group relative">
//               <h3 className="text-lg font-bold text-black morion-font mb-2 line-clamp-2">
//                 {article.title}
//               </h3>
              
//               <div className="flex items-center text-sm text-gray-600 morion-font">
//                 <span className="font-medium">News</span>
//                 <span className="mx-2">•</span>
//                 <span>{formatTimeAgo(article.created_at)}</span>
//               </div>

//               {/* Admin buttons */}
//               {language !== 'so' && (
//                 <div className="absolute top-0 right-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                   <ArticleAdminButtons 
//                     article={article} 
//                     onEdit={onEdit} 
//                     onDelete={onDelete} 
//                     small
//                   />
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Live Blog Section */}
//       <div className="mt-8 border-t border-gray-200 pt-6">
//         <h3 className="text-lg font-bold text-black morion-font mb-4">
//           Live Blog: {articles[0]?.title}
//         </h3>
//         {articles[0]?.image && (
//           <div className="w-full h-32 bg-gray-200 mb-3">
//             <img
//               src={articles[0].image}
//               alt={articles[0].title}
//               className="w-full h-full object-cover"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = '/placeholder-image.jpg';
//               }}
//             />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RightSidebar;

import { useNavigate } from 'react-router-dom';
import ArticleAdminButtons from './ArticleAdminButtons';

const RightSidebar = ({ articles, language, onEdit, onDelete, formatTimeAgo }) => {
  const navigate = useNavigate();

  const handleArticleClick = (id) => {
    navigate(`/articles/${id}`);
  };

  if (!articles || articles.length === 0) return null;

  const videoArticle = articles.find(article => article.video);
  const latestArticles = articles.slice(-3).reverse();

  return (
    <div className="w-80 flex-shrink-0">
      {/* Video Section */}
      {videoArticle && (
        <div className="mb-8">
          <div className="bg-white text-red-600 text-xs font-bold px-2 py-1 inline-block morion-font mb-3">
            VIDEO
          </div>
          
          <div 
            className="mb-6 group relative cursor-pointer"
            onClick={() => handleArticleClick(videoArticle.id)}
          >
            <div className="aspect-video bg-gray-900 rounded overflow-hidden mb-3 relative">
              <video 
                className="w-full h-full object-cover"
                poster={videoArticle.image}
              >
                <source src={videoArticle.video} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-black ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 5v10l8-5-8-5z"/>
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded morion-font">
                {videoArticle.title.split(' ').slice(0, 8).join(' ')}...
              </div>
            </div>
            <h3 className="text-lg font-bold text-black morion-font line-clamp-2">
              {videoArticle.title}
            </h3>

            {/* Admin buttons */}
            {language !== 'so' && (
              <div 
                className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <ArticleAdminButtons 
                  article={videoArticle} 
                  onEdit={onEdit} 
                  onDelete={onDelete} 
                  small
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Latest Section */}
      <div>
        <div className="bg-white text-red-600 text-xs font-bold px-2 py-1 inline-block morion-font mb-4">
          LATEST
        </div>
        
        <div className="space-y-6">
          {latestArticles.map((article) => (
            <div 
              key={`latest-${article.id}`} 
              className="group relative cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleArticleClick(article.id)}
            >
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
                <div 
                  className="absolute top-0 right-0 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArticleAdminButtons 
                    article={article} 
                    onEdit={onEdit} 
                    onDelete={onDelete} 
                    small
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Live Blog Section */}
      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 
          className="text-lg font-bold text-black morion-font mb-4 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={() => articles[0] && handleArticleClick(articles[0].id)}
        >
          Live Blog: {articles[0]?.title}
        </h3>
        {articles[0]?.image && (
          <div 
            className="w-full h-32 bg-gray-200 mb-3 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => handleArticleClick(articles[0].id)}
          >
            <img
              src={articles[0].image}
              alt={articles[0].title}
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
  );
};

export default RightSidebar;