// // newsfrontend/src/components/BottomArticle.jsx
// import ArticleAdminButtons from './ArticleAdminButtons';

// const BottomArticle = ({ article, language, onEdit, onDelete, formatTimeAgo }) => {
//   if (!article) return null;

//   return (
//     <div className="border-t border-gray-200 pt-6">
//       <div className="flex gap-6">
//         <div className="flex-1">
//           <h2 className="text-3xl font-bold text-black morion-font mb-3">
//             {article.title}
//           </h2>
//           <p className="text-gray-700 morion-font text-lg leading-relaxed">
//             {article.content.length > 200 
//               ? article.content.substring(0, 200) + '...'
//               : article.content
//             }
//           </p>
//           <div className="flex items-center text-sm text-gray-600 morion-font mt-3">
//             <span className="font-medium">News</span>
//             <span className="mx-2">•</span>
//             <span>{formatTimeAgo(article.created_at)}</span>
//             <div className="ml-4 flex items-center text-blue-600">
//               <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
//               </svg>
//               <span>Listen</span>
//             </div>
//           </div>

//           {/* Admin buttons */}
//           {language !== 'so' && (
//             <div className="mt-3">
//               <ArticleAdminButtons 
//                 article={article} 
//                 onEdit={onEdit} 
//                 onDelete={onDelete} 
//               />
//             </div>
//           )}
//         </div>
        
//         {article.image && (
//           <div className="w-32 h-24 bg-gray-200 flex-shrink-0">
//             <img
//               src={article.image}
//               alt={article.title}
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

// export default BottomArticle;

import { useNavigate } from 'react-router-dom';
import ArticleAdminButtons from './ArticleAdminButtons';

const BottomArticle = ({ article, language, onEdit, onDelete, formatTimeAgo }) => {
  const navigate = useNavigate();

  const handleArticleClick = () => {
    navigate(`/articles/${article.id}`);
  };

  if (!article) return null;

  return (
    <div className="border-t border-gray-200 pt-6">
      <div className="flex gap-6">
        <div 
          className="flex-1 cursor-pointer hover:opacity-90 transition-opacity"
          onClick={handleArticleClick}
        >
          <h2 className="text-3xl font-bold text-black morion-font mb-3">
            {article.title}
          </h2>
          <p className="text-gray-700 morion-font text-lg leading-relaxed">
            {article.content.length > 200 
              ? article.content.substring(0, 200) + '...'
              : article.content
            }
          </p>
          <div className="flex items-center text-sm text-gray-600 morion-font mt-3">
            <span className="font-medium">News</span>
            <span className="mx-2">•</span>
            <span>{formatTimeAgo(article.created_at)}</span>
            <div className="ml-4 flex items-center text-blue-600">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <span>Listen</span>
            </div>
          </div>

          {/* Admin buttons */}
          {language !== 'so' && (
            <div 
              className="mt-3"
              onClick={(e) => e.stopPropagation()}
            >
              <ArticleAdminButtons 
                article={article} 
                onEdit={onEdit} 
                onDelete={onDelete} 
              />
            </div>
          )}
        </div>
        
        {article.image && (
          <div 
            className="w-32 h-24 bg-gray-200 flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              handleArticleClick();
            }}
          >
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
      </div>
    </div>
  );
};

export default BottomArticle;