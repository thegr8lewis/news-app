
<<<<<<< HEAD
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
=======

import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import { useTranslation } from '../contexts/TranslationContext';

const Header = () => {
  const { language, setLanguage, availableLanguages } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Enhanced translations with all supported languages
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
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
<<<<<<< HEAD
      }
=======
      },
      loading: "Loading...",
      failedToLoad: "Failed to load categories"
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
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
<<<<<<< HEAD
      }
=======
      },
      loading: "Soo dejinta...",
      failedToLoad: "Khalad soo dejinta qaybaha"
    },
    sw: {
      diaspora: "Wakimbizi",
      africa: "Afrika",
      kenya: "Kenya",
      uganda: "Uganda",
      tanzania: "Tanzania",
      epaper: "Gazeti la Mtandaoni",
      buriani: "Buriani",
      search: "Tafuta",
      more: "Zaidi",
      categories: {
        politics: "Siasa",
        sports: "Michezo",
        entertainment: "Burudani",
        technology: "Teknolojia",
        health: "Afya",
        business: "Biashara"
      },
      loading: "Inapakia...",
      failedToLoad: "Hitilafu ya kupakia aina"
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
<<<<<<< HEAD
        const data = await getCategories();
        
        const translatedCategories = data.map(cat => ({
          value: cat.value,
          label: translations[language].categories[cat.value] || cat.label
=======
        const data = await getCategories(language); // Pass language to API
        
        const translatedCategories = data.map(cat => ({
          ...cat,
          label: translations[language]?.categories?.[cat.value] || cat.label
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
        }));
        
        setCategories(translatedCategories);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
<<<<<<< HEAD
        setError('Failed to load categories');
        // Fallback to default categories
        setCategories([
          { value: 'politics', label: translations[language].categories.politics },
          { value: 'sports', label: translations[language].categories.sports },
          { value: 'business', label: translations[language].categories.business }
=======
        setError(translations[language]?.failedToLoad || 'Failed to load categories');
        // Fallback to default categories
        setCategories([
          { value: 'politics', label: translations[language]?.categories?.politics || 'Politics' },
          { value: 'sports', label: translations[language]?.categories?.sports || 'Sports' },
          { value: 'business', label: translations[language]?.categories?.business || 'Business' }
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [language]);

<<<<<<< HEAD
  return (
    <header className="bg-white">
=======
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageDropdownOpen && !event.target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageDropdownOpen]);

  return (
    <header className="bg-white sticky top-0 z-50">
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
      {/* Country navigation */}
      <div className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-8 py-2">
<<<<<<< HEAD
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
=======
            {['diaspora', 'africa', 'kenya', 'uganda', 'tanzania'].map((item) => (
              <span 
                key={item}
                className={`text-sm cursor-pointer font-medium ${
                  item === 'kenya' 
                    ? 'font-bold text-black border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {translations[language]?.[item]}
              </span>
            ))}
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
          </div>
        </div>
      </div>

      {/* Top navigation bar */}
      <div className="relative pb-2">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left side - Menu and ePaper */}
            <div className="flex items-center space-x-4">
<<<<<<< HEAD
              <button className="p-1 hover:bg-gray-100 rounded">
=======
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                aria-label={language === 'so' ? 'Menu' : language === 'sw' ? 'Menyu' : 'Menu'}
              >
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
                <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="text-sm text-gray-700 font-medium">
<<<<<<< HEAD
                {translations[language].epaper} | {translations[language].buriani}
=======
                {translations[language]?.epaper} | {translations[language]?.buriani}
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
              </span>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <img 
                src="https://nation.africa/resource/crblob/5006890/1a8f8a473903060ef417dad0ba7701ac/dn-logo-svg-data.svg" 
                alt="Daily Nation" 
                className="h-15"
<<<<<<< HEAD
=======
                loading="lazy"
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
              />
            </div>

            {/* Right side - Search and User */}
            <div className="flex items-center space-x-4">
<<<<<<< HEAD
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">
=======
              <button 
                className="flex items-center space-x-2 hover:bg-gray-100 px-2 py-1 rounded"
                aria-label={translations[language]?.search}
              >
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
                <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-sm font-medium text-gray-800">
<<<<<<< HEAD
                  {translations[language].search}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-800">Lewis Momanyi</span>
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
=======
                  {translations[language]?.search}
                </span>
              </button>
              <span className="text-sm font-medium text-gray-800">Lewis Momanyi</span>
              <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </button>
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
            </div>
          </div>
        </div>
        
        {/* Custom bottom borders */}
        <div className="absolute bottom-0 left-0 right-0">
<<<<<<< HEAD
          <div className="h-[1px] bg-black"></div>
          <div className="h-1 bg-transparent"></div>
          <div className="h-[1px] bg-black"></div>
          <div className="h-1 bg-transparent"></div>
          <div className="h-[1px] bg-black"></div>
          <div className="h-1 bg-transparent"></div>
=======
          {[...Array(3)].map((_, i) => (
            <div key={`border-${i}`} className="flex flex-col">
              <div className="h-[1px] bg-black"></div>
              <div className="h-1 bg-transparent"></div>
            </div>
          ))}
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
          <div className="h-[2px] bg-sky-700"></div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-gray-300">
<<<<<<< HEAD
       
        <div className="w-[80vw] x-auto px-4 sm:px-6 lg:px-8">
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
=======
        <div className="w-[80vw] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Language selection dropdown */}
            <div className="relative language-dropdown">
              <button 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 text-sm rounded-md font-medium hover:bg-gray-100"
                aria-expanded={isLanguageDropdownOpen}
                aria-haspopup="true"
              >
                <img 
                  src={availableLanguages.find(lang => lang.code === language)?.flag} 
                  alt="" 
                  className="h-4 w-auto"
                  aria-hidden="true"
                />
                <span>{availableLanguages.find(lang => lang.code === language)?.name}</span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isLanguageDropdownOpen && (
                <div 
                  className="absolute z-10 mt-1 w-48 bg-white rounded-md shadow-lg"
                  role="menu"
                >
                  <div className="py-1">
                    {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLanguageDropdownOpen(false);
                        }}
                        className={`flex items-center px-4 py-2 text-sm w-full text-left ${
                          language === lang.code ? 'bg-gray-100 font-bold' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        role="menuitem"
                      >
                        <img 
                          src={lang.flag} 
                          alt="" 
                          className="h-4 w-auto mr-2"
                          aria-hidden="true"
                        />
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
            </div>

            {/* Navigation links */}
            <nav className="flex space-x-6 pr-80">
              {loading ? (
                <div className="flex space-x-6">
                  {[...Array(5)].map((_, i) => (
<<<<<<< HEAD
                    <div key={i} className="h-4 w-16 bg-gray-200 animate-pulse rounded"></div>
=======
                    <div 
                      key={`skeleton-${i}`} 
                      className="h-4 w-16 bg-gray-200 animate-pulse rounded"
                      aria-label={translations[language]?.loading}
                    />
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
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
<<<<<<< HEAD
                    {translations[language].more}
=======
                    {translations[language]?.more}
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
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