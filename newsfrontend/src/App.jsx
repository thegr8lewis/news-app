// export default App;

import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';
import ArticleDetail from './components/ArticleDetail';
import { TranslationProvider } from './contexts/TranslationContext';
import AdminArticleList from './components/AdminArticleList';
import AdminArticleDetails from './components/AdminArticleDetails';

const App = () => {
  const [language, setLanguage] = useState('en'); // Default to English

  return (
    <TranslationProvider>
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header language={language} setLanguage={setLanguage} />
        
        <main className=" mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ArticleList language={language} onLanguageChange={setLanguage} />} />
            <Route path="/admin" element={<AdminDashboard language={language} onLanguageChange={setLanguage} />} />
            {/* <Route path="/articles" element={<ArticleDetail language={language} onLanguageChange={setLanguage} />} /> */}
            <Route path="/articles/:id" element={<ArticleDetail language={language} onLanguageChange={setLanguage} />} />

            <Route path="/admin/articles" element={<AdminArticleList />} />
            <Route path="/admin/articles/:articleId" element={<AdminArticleDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
    </TranslationProvider>
  );
};

export default App;

