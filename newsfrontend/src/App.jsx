// newsfrontend/src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import AdminDashboard from './components/AdminDashboard';
import Header from './components/Header';

const App = () => {
  const [language, setLanguage] = useState('original');

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header language={language} setLanguage={setLanguage} />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<ArticleList language={language} onLanguageChange={setLanguage} />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;