import { useNavigate } from 'react-router-dom';
import ArticleAdminButtons from './ArticleAdminButtons';

const GridArticles = ({ articles, language, onEdit, onDelete, formatTimeAgo }) => {
  const navigate = useNavigate();

  const handleArticleClick = (id) => {
    navigate(`/articles/${id}`);
  };

  if (!articles || articles.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-0 mb-8">
      {articles.map((article) => (
        <div key={article.id} className="group relative border-b border-b-gray-400 border-r border-r-gray-300">
          <div 
            className="bg-gray-50 p-4 h-full flex gap-3 cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => handleArticleClick(article.id)}
          >
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
              <div 
                className="w-20 h-16 bg-gray-200 flex-shrink-0 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleArticleClick(article.id);
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
            
            {/* Admin buttons */}
            {language !== 'so' && (
              <div 
                className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
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
        </div>
      ))}
    </div>
  );
};

export default GridArticles;