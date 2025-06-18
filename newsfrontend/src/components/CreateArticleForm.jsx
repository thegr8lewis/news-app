// import { useState } from 'react';
// import { createArticle } from '../services/api';

// const CreateArticleForm = ({ onArticleCreated }) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     image: null,
//     video: null,
//     category: 'politics', // Default category
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [previewVideo, setPreviewVideo] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   const categories = [
//     { value: 'politics', label: 'Politics' },
//     { value: 'sports', label: 'Sports' },
//     { value: 'entertainment', label: 'Entertainment' },
//     { value: 'technology', label: 'Technology' },
//     { value: 'health', label: 'Health' },
//     { value: 'business', label: 'Business' },
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (files[0]) {
//       setFormData(prev => ({ ...prev, [name]: files[0] }));

//       if (name === 'image') {
//         const reader = new FileReader();
//         reader.onload = () => setPreviewImage(reader.result);
//         reader.readAsDataURL(files[0]);
//       } else if (name === 'video') {
//         setPreviewVideo(URL.createObjectURL(files[0]));
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);

//     try {
//       const createdArticle = await createArticle(formData);
//       onArticleCreated(createdArticle);
//       setFormData({
//         title: '',
//         content: '',
//         image: null,
//         video: null,
//         category: 'politics',
//       });
//       setPreviewImage(null);
//       setPreviewVideo(null);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="px-4 py-6 sm:px-6">
//       <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Article</h2>
//       {error && (
//         <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
//           <p className="text-sm text-red-700">{error}</p>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Left column - Text inputs */}
//           <div className="md:col-span-2 space-y-6">
//             <div>
//               <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
//                 placeholder="Enter article title"
//               />
//             </div>

//             <div>
//               <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
//                 Content
//               </label>
//               <textarea
//                 id="content"
//                 name="content"
//                 value={formData.content}
//                 onChange={handleChange}
//                 required
//                 rows={12}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
//                 placeholder="Write your article content here..."
//               />
//             </div>

//             <div>
//               <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
//                 Category
//               </label>
//               <select
//                 id="category"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleChange}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
//               >
//                 {categories.map((category) => (
//                   <option key={category.value} value={category.value}>
//                     {category.label}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Right column - File uploads */}
//           <div className="space-y-6">
//             <div>
//               <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
//                 Image (optional)
//               </label>
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                   <svg
//                     className="mx-auto h-12 w-12 text-gray-400"
//                     stroke="currentColor"
//                     fill="none"
//                     viewBox="0 0 48 48"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                       strokeWidth={2}
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                   <div className="flex text-sm text-gray-600">
//                     <label
//                       htmlFor="image"
//                       className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
//                     >
//                       <span>Upload an image</span>
//                       <input
//                         id="image"
//                         name="image"
//                         type="file"
//                         accept="image/*"
//                         onChange={handleFileChange}
//                         className="sr-only"
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
//                 </div>
//               </div>
//               {previewImage && (
//                 <div className="mt-4">
//                   <img
//                     src={previewImage}
//                     alt="Preview"
//                     className="h-48 w-full object-cover rounded-md shadow-sm"
//                   />
//                 </div>
//               )}
//             </div>

//             <div>
//               <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
//                 Video (optional)
//               </label>
//               <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
//                 <div className="space-y-1 text-center">
//                   <svg
//                     className="mx-auto h-12 w-12 text-gray-400"
//                     stroke="currentColor"
//                     fill="none"
//                     viewBox="0 0 48 48"
//                     aria-hidden="true"
//                   >
//                     <path
//                       d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                       strokeWidth={2}
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                     />
//                   </svg>
//                   <div className="flex text-sm text-gray-600">
//                     <label
//                       htmlFor="video"
//                       className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
//                     >
//                       <span>Upload a video</span>
//                       <input
//                         id="video"
//                         name="video"
//                         type="file"
//                         accept="video/*"
//                         onChange={handleFileChange}
//                         className="sr-only"
//                       />
//                     </label>
//                     <p className="pl-1">or drag and drop</p>
//                   </div>
//                   <p className="text-xs text-gray-500">MP4, WebM up to 50MB</p>
//                 </div>
//               </div>
//               {previewVideo && (
//                 <div className="mt-4">
//                   <video
//                     src={previewVideo}
//                     controls
//                     className="h-48 w-full rounded-md shadow-sm"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end space-x-3 pt-6">
//           <button
//             type="button"
//             className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             onClick={() => onArticleCreated(null)}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//           >
//             {isSubmitting ? (
//               <svg
//                 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 />
//               </svg>
//             ) : null}
//             {isSubmitting ? 'Publishing...' : 'Publish Article'}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default CreateArticleForm;

import { useState } from 'react';
import { createArticle } from '../services/api';

const CreateArticleForm = ({ onArticleCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null,
    video: null,
    category: 'politics',
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  // New state for translation status
  const [translationStatus, setTranslationStatus] = useState({
    isTranslating: false,
    progress: null,
    error: null,
    timeTaken: null
  });

  const categories = [
    { value: 'politics', label: 'Politics' },
    { value: 'sports', label: 'Sports' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'technology', label: 'Technology' },
    { value: 'health', label: 'Health' },
    { value: 'business', label: 'Business' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));

      if (name === 'image') {
        const reader = new FileReader();
        reader.onload = () => setPreviewImage(reader.result);
        reader.readAsDataURL(files[0]);
      } else if (name === 'video') {
        setPreviewVideo(URL.createObjectURL(files[0]));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setTranslationStatus({
      isTranslating: true,
      progress: 'Starting translation...',
      error: null,
      timeTaken: null
    });

    try {
      // Simulate translation progress (you'll replace this with your actual API calls)
      const translationInterval = setInterval(() => {
        setTranslationStatus(prev => ({
          ...prev,
          progress: 'Translating content...',
          timeTaken: prev.timeTaken ? prev.timeTaken + 0.5 : 0.5
        }));
      }, 500);

      const createdArticle = await createArticle(formData, (translationData) => {
        // This callback would be called from your API service with translation updates
        setTranslationStatus({
          isTranslating: translationData.isTranslating,
          progress: translationData.progress,
          error: translationData.error,
          timeTaken: translationData.timeTaken
        });
      });

      clearInterval(translationInterval);
      
      onArticleCreated(createdArticle);
      setFormData({
        title: '',
        content: '',
        image: null,
        video: null,
        category: 'politics',
      });
      setPreviewImage(null);
      setPreviewVideo(null);
      setTranslationStatus({
        isTranslating: false,
        progress: 'Translation complete!',
        error: null,
        timeTaken: null
      });
    } catch (err) {
      setError(err.message);
      setTranslationStatus({
        isTranslating: false,
        progress: null,
        error: err.message.includes('API key') ? 
          'Translation service requires an API key. Visit https://portal.libretranslate.com to get one.' : 
          'Translation failed',
        timeTaken: null
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Create New Article</h2>
      
      {/* Error display */}
      {error && (
        <div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      
      {/* Translation status display */}
      {translationStatus.isTranslating && (
        <div className="mb-4 bg-blue-50 border-l-4 border-blue-400 p-4">
          <p className="text-sm text-blue-700">
            {translationStatus.progress}
            {translationStatus.timeTaken && (
              <span className="text-blue-600 ml-2">({translationStatus.timeTaken.toFixed(2)}s)</span>
            )}
          </p>
        </div>
      )}
      
      {translationStatus.error && !translationStatus.isTranslating && (
        <div className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <p className="text-sm text-yellow-700">
            {translationStatus.error}
            {translationStatus.error.includes('API key') && (
              <a href="https://portal.libretranslate.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 ml-1 underline">
                Get API key
              </a>
            )}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left column - Text inputs */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                placeholder="Enter article title"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={12}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
                placeholder="Write your article content here..."
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right column - File uploads */}
          <div className="space-y-6">
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Image (optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="image"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload an image</span>
                      <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {previewImage && (
                <div className="mt-4">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="h-48 w-full object-cover rounded-md shadow-sm"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="video" className="block text-sm font-medium text-gray-700 mb-1">
                Video (optional)
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="video"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                    >
                      <span>Upload a video</span>
                      <input
                        id="video"
                        name="video"
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">MP4, WebM up to 50MB</p>
                </div>
              </div>
              {previewVideo && (
                <div className="mt-4">
                  <video
                    src={previewVideo}
                    controls
                    className="h-48 w-full rounded-md shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-6">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => onArticleCreated(null)}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {translationStatus.isTranslating ? 'Translating...' : 'Publishing...'}
              </>
            ) : 'Publish Article'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticleForm;