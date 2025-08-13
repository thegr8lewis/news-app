
import { useState, useEffect } from 'react';
import { getCategories } from '../services/api';
import { useTranslation } from '../contexts/TranslationContext';

const Header = () => {
  const { language, setLanguage, availableLanguages } = useTranslation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState('Musili Andrew');

  const users = [
    { name: 'Musili Andrew', initials: 'MA', color: 'bg-blue-600' },
    { name: 'Lewis Nyakaru', initials: 'LN', color: 'bg-green-600' }
  ];

  // Enhanced translations with all supported languages
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
      },
      loading: "Loading...",
      failedToLoad: "Failed to load categories"
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
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getCategories(language); // Pass language to API
        
        const translatedCategories = data.map(cat => ({
          ...cat,
          label: translations[language]?.categories?.[cat.value] || cat.label
        }));
        
        setCategories(translatedCategories);
        setError(null);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(translations[language]?.failedToLoad || 'Failed to load categories');
        // Fallback to default categories
        setCategories([
          { value: 'politics', label: translations[language]?.categories?.politics || 'Politics' },
          { value: 'sports', label: translations[language]?.categories?.sports || 'Sports' },
          { value: 'business', label: translations[language]?.categories?.business || 'Business' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [language]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageDropdownOpen && !event.target.closest('.language-dropdown')) {
        setIsLanguageDropdownOpen(false);
      }
      if (isUserDropdownOpen && !event.target.closest('.user-dropdown')) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageDropdownOpen, isUserDropdownOpen]);

  return (
    <header className="bg-white sticky top-0 z-50">
      {/* Country navigation */}
      <div className="border-b border-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-2 sm:space-x-8 py-2 overflow-x-auto">
            {['diaspora', 'africa', 'kenya', 'uganda', 'tanzania'].map((item) => (
              <span 
                key={item}
                className={`text-xs sm:text-sm cursor-pointer font-medium whitespace-nowrap ${
                  item === 'kenya' 
                    ? 'font-bold text-black border-b-2 border-blue-600' 
                    : 'text-gray-700 hover:text-black'
                }`}
              >
                {translations[language]?.[item]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Top navigation bar */}
      <div className="relative pb-2">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Left side - Menu and ePaper */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                className="p-1 hover:bg-gray-100 rounded"
                aria-label={language === 'so' ? 'Menu' : language === 'sw' ? 'Menyu' : 'Menu'}
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="hidden sm:inline text-sm text-gray-700 font-medium">
                {translations[language]?.epaper} | {translations[language]?.buriani}
              </span>
            </div>

            {/* Center - Logo */}
            <div className="flex-1 flex justify-center">
              <img 
                src="https://nation.africa/resource/crblob/5006890/1a8f8a473903060ef417dad0ba7701ac/dn-logo-svg-data.svg" 
                alt="Daily Nation" 
                className="h-10 sm:h-15"
                loading="lazy"
              />
            </div>

            {/* Right side - Search and User */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button 
                className="flex items-center space-x-1 sm:space-x-2 hover:bg-gray-100 px-1 sm:px-2 py-1 rounded"
                aria-label={translations[language]?.search}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="hidden sm:inline text-sm font-medium text-gray-800">
                  {translations[language]?.search}
                </span>
              </button>
              {/* User selection dropdown */}
              <div className="relative user-dropdown">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 hover:bg-gray-50 px-2 py-1 rounded-md transition-colors"
                  aria-expanded={isUserDropdownOpen}
                  aria-haspopup="true"
                >
                  <span className="hidden md:inline text-sm font-medium text-gray-800">{selectedUser}</span>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 ${users.find(u => u.name === selectedUser)?.color} rounded-full flex items-center justify-center hover:opacity-90 transition-opacity`}>
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {users.find(u => u.name === selectedUser)?.initials}
                    </span>
                  </div>
                  <svg 
                    className={`w-3 h-3 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {isUserDropdownOpen && (
                  <div 
                    className="absolute right-0 z-20 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200"
                    role="menu"
                  >
                    <div className="py-1">
                      {users.map((user) => (
                        <button
                          key={user.name}
                          onClick={() => {
                            setSelectedUser(user.name);
                            setIsUserDropdownOpen(false);
                          }}
                          className={`flex items-center px-4 py-2 text-sm w-full text-left transition-colors ${
                            selectedUser === user.name 
                              ? 'bg-gray-100 font-semibold' 
                              : 'text-gray-700 hover:bg-gray-50'
                          }`}
                          role="menuitem"
                        >
                          <div className={`w-6 h-6 ${user.color} rounded-full flex items-center justify-center mr-3`}>
                            <span className="text-white text-xs font-bold">{user.initials}</span>
                          </div>
                          {user.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Custom bottom borders */}
        <div className="absolute bottom-0 left-0 right-0">
          {[...Array(3)].map((_, i) => (
            <div key={`border-${i}`} className="flex flex-col">
              <div className="h-[1px] bg-black"></div>
              <div className="h-1 bg-transparent"></div>
            </div>
          ))}
          <div className="h-[2px] bg-sky-700"></div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-gray-300">
        <div className="w-full sm:w-[90vw] lg:w-[80vw] mx-auto px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between py-2 sm:py-3">
            {/* Language selection dropdown */}
            <div className="relative language-dropdown">
              <button 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm rounded-md font-medium hover:bg-gray-100"
                aria-expanded={isLanguageDropdownOpen}
                aria-haspopup="true"
              >
                <img 
                  src={availableLanguages.find(lang => lang.code === language)?.flag} 
                  alt="" 
                  className="h-3 sm:h-4 w-auto"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">{availableLanguages.find(lang => lang.code === language)?.name}</span>
                <svg 
                  className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
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
            </div>

            {/* Navigation links */}
            <nav className="flex space-x-2 sm:space-x-4 lg:space-x-6 flex-1 justify-center overflow-x-auto">
              {loading ? (
                <div className="flex space-x-2 sm:space-x-6">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={`skeleton-${i}`} 
                      className="h-3 sm:h-4 w-12 sm:w-16 bg-gray-200 animate-pulse rounded flex-shrink-0"
                      aria-label={translations[language]?.loading}
                    />
                  ))}
                </div>
              ) : error ? (
                <div className="text-red-500 text-xs sm:text-sm">{error}</div>
              ) : (
                <>
                  {categories.slice(0, 4).map((category) => (
                    <a 
                      key={category.value}
                      href={`/${language}/category/${category.value}`}
                      className="text-xs sm:text-sm font-bold text-black hover:text-black hover:underline transition-all whitespace-nowrap"
                    >
                      {category.label}
                    </a>
                  ))}
                  <a 
                    href="#" 
                    className="text-xs sm:text-sm font-bold text-black hover:text-black hover:underline transition-all flex items-center whitespace-nowrap"
                  >
                    <span className="mr-1 text-blue-600">•••</span>
                    <span className="hidden sm:inline">{translations[language]?.more}</span>
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