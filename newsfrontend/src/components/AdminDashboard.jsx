// // newsfrontend/src/components/AdminDashboard.jsx
// import { useState } from 'react';
// import CreateArticleForm from './CreateArticleForm';
// import ArticleList from './ArticleList';

// const AdminDashboard = () => {
//   const [language, setLanguage] = useState('en');
//   const [articles, setArticles] = useState([]);

//   const handleArticleCreated = (newArticle) => {
//     setArticles(prev => [newArticle, ...prev]);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
//         </div>
//       </header>
      
//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
//           <div className="border-4 border-dashed border-gray-200 rounded-lg p-4">
//             <CreateArticleForm onArticleCreated={handleArticleCreated} />
//           </div>
//         </div>
        
//         <div className="px-4 py-6 sm:px-0 mt-8">
//           <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
//           <ArticleList language={language} onLanguageChange={setLanguage} />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

// newsfrontend/src/components/AdminDashboard.jsx
import { useState } from 'react';
import CreateArticleForm from './CreateArticleForm';
import ArticleList from './ArticleList';
import { Transition } from '@headlessui/react';

const AdminDashboard = () => {
  const [language, setLanguage] = useState('en');
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArticleCreated = (newArticle) => {
    setArticles(prev => [newArticle, ...prev]);
    setIsModalOpen(false); // Close modal after article creation
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            Create New Article
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Articles</h2>
          <ArticleList language={language} onLanguageChange={setLanguage} />
        </div>
      </main>

      {/* Modal for CreateArticleForm */}
      <Transition show={isModalOpen}>
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            {/* Backdrop */}
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                onClick={() => setIsModalOpen(false)}
              />
            </Transition.Child>

            {/* Modal Content */}
            <Transition.Child
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:max-w-3xl sm:w-full sm:p-6">
                <button
                  type="button"
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <CreateArticleForm onArticleCreated={handleArticleCreated} />
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default AdminDashboard;