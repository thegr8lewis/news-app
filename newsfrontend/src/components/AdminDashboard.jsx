
// newsfrontend/src/components/AdminDashboard.jsx
import { useState } from 'react';
import CreateArticleForm from './CreateArticleForm';
import AdminArticleList from './AdminArticleList';
import { Transition } from '@headlessui/react';

const AdminDashboard = () => {
  const [language, setLanguage] = useState('en');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Add refresh key to force updates

  const handleArticleCreated = (newArticle) => {
    // Instead of managing articles state here, we'll trigger a refresh
    setRefreshKey(prev => prev + 1); // Increment key to force refresh
    setIsModalOpen(false); // Close modal after article creation
  };

  const handleArticleDeleted = () => {
    setRefreshKey(prev => prev + 1); // Refresh after deletion
  };

  const handleArticleUpdated = () => {
    setRefreshKey(prev => prev + 1); // Refresh after update
  };

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-4">

            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Create New Article
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <AdminArticleList 
            key={refreshKey} // Use key to force refresh when changed
            language={language} 
            onArticleDeleted={handleArticleDeleted}
            onArticleUpdated={handleArticleUpdated}
          />
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
                <CreateArticleForm 
                  onArticleCreated={handleArticleCreated} 
                  language={language}
                />
              </div>
            </Transition.Child>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default AdminDashboard;