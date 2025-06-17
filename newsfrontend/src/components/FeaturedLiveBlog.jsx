import { useNavigate } from 'react-router-dom';
import ArticleAdminButtons from './ArticleAdminButtons';

const FeaturedLiveBlog = ({ article, language, onEdit, onDelete, formatTimeAgo }) => {
  const navigate = useNavigate();

  const handleArticleClick = () => {
    navigate(`/articles/${article.id}`);
  };

  if (!article) return null;

  return (
    <div className="mb-8 border-b-1 border-black">
      <div className="relative bg-gray-50 p-6 flex gap-6">
        {/* Left side: Content */}
        <div 
          className="flex-1 cursor-pointer hover:opacity-90 transition-opacity" 
          onClick={handleArticleClick}
        >
          <h1 className="text-5xl font-bold text-black leading-tight morion-font mb-4">
             {article.title}
          </h1>
          
          <p className="text-lg text-gray-700 leading-relaxed morion-font mb-4">
            {article.content.length > 150 
              ? article.content.substring(0, 150) + '...'
              : article.content
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
          
          {article.video && (
            <div className="mt-6">
              <video controls className="w-full max-h-80 rounded">
                <source src={article.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
        
        {/* Right side: Image */}
        {article.image && (
          <div 
            className="w-80 h-80 bg-gray-100 overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={handleArticleClick}
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
        
        {/* Admin buttons overlay */}
        {language !== 'so' && (
          <div className="absolute top-4 right-4">
            <ArticleAdminButtons 
              article={article} 
              onEdit={onEdit} 
              onDelete={onDelete} 
            />
          </div>
        )}
      </div>
        </div>
  );
};

export default FeaturedLiveBlog;