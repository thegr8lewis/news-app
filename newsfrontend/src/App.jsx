// // newsfrontend/src/App.jsx
// import { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ArticleList from './components/ArticleList';
// import AdminDashboard from './components/AdminDashboard';

// const App = () => {
//   const [language, setLanguage] = useState('en');

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-100">
//         <header className="bg-white shadow">
//           <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//             <h1 className="text-3xl font-bold text-gray-900">News Portal</h1>
//             <div className="flex space-x-2">
//               <button 
//                 onClick={() => setLanguage('en')}
//                 className={`px-4 py-2 rounded ${language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//               >
//                 <img src="/kenyan-flag.png" alt="Kenyan Flag" className="h-6 w-auto mr-2 inline" />
//                 English
//               </button>
//               <button 
//                 onClick={() => setLanguage('so')}
//                 className={`px-4 py-2 rounded ${language === 'so' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
//               >
//                 <img src="/somali-flag.png" alt="Somali Flag" className="h-6 w-auto mr-2 inline" />
//                 Somali
//               </button>
//             </div>
//           </div>
//         </header>
        
//         <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           <Routes>
//             <Route path="/" element={<ArticleList language={language} onLanguageChange={setLanguage} />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;

// newsfrontend/src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ArticleList from './components/ArticleList';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [language, setLanguage] = useState('original'); // Default to original language

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">News Portal</h1>
            <div className="flex space-x-2">
              <button 
                onClick={() => setLanguage('original')}
                className={`mx-2 px-4 py-2 rounded ${language === 'original' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                Original
              </button>
              <button 
                onClick={() => setLanguage('so')}
                className={`mx-2 px-4 py-2 rounded ${language === 'so' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                <img src="/somali-flag.png" alt="Somali Flag" className="h-6 w-auto mr-2 inline" />
                Somali
              </button>
            </div>
          </div>
        </header>
        
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