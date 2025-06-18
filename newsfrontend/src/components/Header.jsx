
// import { useState, useEffect } from 'react';
// import { getCategories } from '../services/api'; // You'll need to create this API function

// const Header = ({ language, setLanguage }) => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const data = await getCategories();
//         setCategories(data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <header className="bg-white">
//       {/* Country navigation */}
//       <div className="border-b border-gray-300">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-center space-x-8 py-2">
//             <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Diaspora</span>
//             <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Africa</span>
//             <span className="text-sm font-bold text-black cursor-pointer border-b-2 border-blue-600">Kenya</span>
//             <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Uganda</span>
//             <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">Tanzania</span>
//           </div>
//         </div>
//       </div>

//       {/* Top navigation bar */}
//       <div className="relative pb-2">
//         <div className=" mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
            
//             {/* Left side - Menu and ePaper */}
//             <div className="flex items-center space-x-4">
//               <button className="p-1 hover:bg-gray-100 rounded">
//                 <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 </svg>
//               </button>
//               <span className="text-sm text-gray-700 font-medium">ePaper | Buriani</span>
//             </div>

//             {/* Center - Logo */}
//             <div className="flex-1 flex justify-center">
//               <img 
//                 src="https://nation.africa/resource/crblob/5006890/1a8f8a473903060ef417dad0ba7701ac/dn-logo-svg-data.svg" 
//                 alt="Daily Nation" 
//                 className="h-15"
//               />
//             </div>

//             {/* Right side - Search and User */}
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
//                 <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <span className="text-sm font-medium text-gray-800">Search</span>
//               </div>
//               <span className="text-sm font-medium text-gray-800">Lewis Momanyi</span>
//               <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
//                 <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                 </svg>
//               </div>
//             </div>
//           </div>
//         </div>
        
//         {/* Custom bottom borders */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <div className="h-[1px] bg-black"></div>
//           <div className="h-1 bg-transparent"></div>
//           <div className="h-[1px] bg-black"></div>
//           <div className="h-1 bg-transparent"></div>
//           <div className="h-[1px] bg-black"></div>
//           <div className="h-1 bg-transparent"></div>
//           <div className="h-[2px] bg-sky-700"></div>
//         </div>
//       </div>

//       {/* Main navigation */}
//       <div className="border-b border-gray-300">
//         <div className="l mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between py-3">
            
//             {/* Language selection */}
//             <div className="flex items-center space-x-2">
//               <button 
//                 onClick={() => setLanguage('en')}
//                 className={`px-3 py-1.5 text-sm rounded-md flex items-center font-medium ${
//                   language === 'en' ? 'bg-gray-100 font-bold' : 'text-gray-700'
//                 }`}
//               >
//                 <img 
//                   src="https://flagcdn.com/w20/ke.png" 
//                   alt="Kenya Flag" 
//                   className="h-4 w-auto mr-2"
//                 />
//                 En
//               </button>
//               <button 
//                 onClick={() => setLanguage('so')}
//                 className={`px-3 py-1.5 text-sm rounded-md flex items-center font-medium ${
//                   language === 'so' ? 'bg-gray-100 font-bold' : 'text-gray-700'
//                 }`}
//               >
//                 <img 
//                   src="https://flagcdn.com/w20/so.png" 
//                   alt="Somalia Flag" 
//                   className="h-4 w-auto mr-2"
//                 />
//                 So
//               </button>
//             </div>

//             {/* Navigation links - Now using dynamic categories */}
//             <nav className="flex space-x-6">
//               {loading ? (
//                 <div className="flex space-x-6">
//                   {[...Array(5)].map((_, i) => (
//                     <div key={i} className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
//                   ))}
//                 </div>
//               ) : (
//                 <>
//                   {categories.map((category) => (
//                     <a 
//                       key={category.value}
//                       href={`/category/${category.value}`}
//                       className="text-sm font-bold text-black hover:text-black hover:underline transition-all capitalize"
//                     >
//                       {category.label}
//                     </a>
//                   ))}
//                   <a 
//                     href="#" 
//                     className="text-sm font-bold text-black hover:text-black hover:underline transition-all flex items-center"
//                   >
//                     <span className="mr-1 text-blue-600">•••</span>
//                     More
//                   </a>
//                 </>
//               )}
//             </nav>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;



import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';

const Header = ({ language, setLanguage }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Translation mappings
  const translations = {
    en: {
      diaspora: "Diaspora",
      africa: "Africa",
      kenya: "Kenya",
      uganda: "Uganda",
      tanzania: "Tanzania",
      epaper: "ePaper",
      buriani: "Buriani",
      search: "Search",
      more: "More",
      categories: {
        politics: "Politics",
        sports: "Sports",
        entertainment: "Entertainment",
        technology: "Technology",
        health: "Health",
        business: "Business"
      }
    },
    so: {
      diaspora: "Diaspora",
      africa: "Afrika",
      kenya: "Kenya",
      uganda: "Uganda",
      tanzania: "Tanzania",
      epaper: "ePaper",
      buriani: "Buriani",
      search: "Raadi",
      more: "Dheeraad ah",
      categories: {
        politics: "Siyaasadda",
        sports: "Ciyaaraha",
        entertainment: "Madadaalo",
        technology: "Teknoolojiyada",
        health: "Caafimaadka",
        business: "Ganacsiga"
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        
        const translatedCategories = data.map(cat => ({
          value: cat.value,
          label: translations[language].categories[cat.value] || cat.label
        }));
        
        setCategories(translatedCategories);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
        // Fallback to default categories
        setCategories([
          { value: 'politics', label: translations[language].categories.politics },
          { value: 'sports', label: translations[language].categories.sports },
          { value: 'business', label: translations[language].categories.business }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [language]);

  return (
    <header className="bg-white">
      {/* Country navigation */}
      <div className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-2">
            <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">
              {translations[language].diaspora}
            </span>
            <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">
              {translations[language].africa}
            </span>
            <span className="text-sm font-bold text-black cursor-pointer border-b-2 border-blue-600">
              {translations[language].kenya}
            </span>
            <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">
              {translations[language].uganda}
            </span>
            <span className="text-sm text-gray-700 hover:text-black cursor-pointer font-medium">
              {translations[language].tanzania}
            </span>
          </div>
        </div>
      </div>

      {/* Top navigation bar */}
      <div className="relative pb-2">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left side - Menu and ePaper */}
            <div className="flex items-center space-x-4">
              <button className="p-1 hover:bg-gray-100 rounded">
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="text-sm text-gray-700 font-medium">
                {translations[language].epaper} | {translations[language].buriani}
              </span>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <img 
                src="https://nation.africa/resource/crblob/5006890/1a8f8a473903060ef417dad0ba7701ac/dn-logo-svg-data.svg" 
                alt="Daily Nation" 
                className="h-15"
              />
            </div>

            {/* Right side - Search and User */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-800">
                  {translations[language].search}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-800">Lewis Momanyi</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Custom bottom borders */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-[1px] bg-black"></div>
          <div className="h-1 bg-transparent"></div>
          <div className="h-[1px] bg-black"></div>
          <div className="h-1 bg-transparent"></div>
          <div className="h-[1px] bg-black"></div>
          <div className="h-1 bg-transparent"></div>
          <div className="h-[2px] bg-sky-700"></div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-gray-300">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Language selection */}
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm rounded-md flex items-center font-medium ${
                  language === 'en' ? 'bg-gray-100 font-bold' : 'text-gray-700'
                }`}
              >
                <img 
                  src="https://flagcdn.com/w20/ke.png" 
                  alt="Kenya Flag" 
                  className="h-4 w-auto mr-2"
                />
                En
              </button>
              <button 
                onClick={() => setLanguage('so')}
                className={`px-3 py-1.5 text-sm rounded-md flex items-center font-medium ${
                  language === 'so' ? 'bg-gray-100 font-bold' : 'text-gray-700'
                }`}
              >
                <img 
                  src="https://flagcdn.com/w20/so.png" 
                  alt="Somalia Flag" 
                  className="h-4 w-auto mr-2"
                />
                So
              </button>
            </div>

            {/* Navigation links */}
            <nav className="flex space-x-6 pr-150">
              {loading ? (
                <div className="flex space-x-6">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
                  ))}
                </div>
              ) : error ? (
                <div className="text-red-500 text-sm">{error}</div>
              ) : (
                <>
                  {categories.map((category) => (
                    <a 
                      key={category.value}
                      href={`/${language}/category/${category.value}`}
                      className="text-sm font-bold text-black hover:text-black hover:underline transition-all"
                    >
                      {category.label}
                    </a>
                  ))}
                  <a 
                    href="#" 
                    className="text-sm font-bold text-black hover:text-black hover:underline transition-all flex items-center"
                  >
                    <span className="mr-1 text-blue-600">•••</span>
                    {translations[language].more}
                  </a>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;