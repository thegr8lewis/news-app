// newsfrontend/src/components/ArticleAdminButtons.jsx
const ArticleAdminButtons = ({ article, onEdit, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onEdit(article)}
        className="bg-blue-600 text-white px-3 py-1 text-xs rounded hover:bg-blue-700 transition-colors morion-font"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(article.id)}
        className="bg-red-600 text-white px-3 py-1 text-xs rounded hover:bg-red-700 transition-colors morion-font"
      >
        Delete
      </button>
    </div>
  );
};

export default ArticleAdminButtons;