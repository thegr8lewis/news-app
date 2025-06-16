// newsfrontend/src/components/AdminDashboard.jsx
import { useState } from 'react';
import CreateArticleForm from './CreateArticleForm';
import ArticleList from './ArticleList';

const AdminDashboard = () => {
  const [language, setLanguage] = useState('en');
  const [articles, setArticles] = useState([]);

  const handleArticleCreated = (newArticle) => {
    setArticles(prev => [newArticle, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
            <CreateArticleForm onArticleCreated={handleArticleCreated} />
          </div>
        </div>
        
        <div className="px-4 py-6 sm:px-0 mt-8">
          <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
          <ArticleList language={language} onLanguageChange={setLanguage} />
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;