<<<<<<< HEAD
// Create src/contexts/TranslationContext.jsx
=======
// // Create src/contexts/TranslationContext.jsx
// import { createContext, useContext, useState, useEffect } from 'react';

// const TranslationContext = createContext();

// export const TranslationProvider = ({ children }) => {
//   const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
//   const [availableLanguages, setAvailableLanguages] = useState([]);

//   useEffect(() => {
//     localStorage.setItem('language', language);
//   }, [language]);

//   return (
//     <TranslationContext.Provider value={{ language, setLanguage, availableLanguages, setAvailableLanguages }}>
//       {children}
//     </TranslationContext.Provider>
//   );
// };

// export const useTranslation = () => useContext(TranslationContext);


// src/contexts/TranslationContext.jsx
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
import { createContext, useContext, useState, useEffect } from 'react';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
<<<<<<< HEAD
  const [availableLanguages, setAvailableLanguages] = useState([]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, availableLanguages, setAvailableLanguages }}>
=======
  const [availableLanguages] = useState([
    { code: 'en', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'so', name: 'Somali', flag: 'https://flagcdn.com/w20/so.png' },
    { code: 'sw', name: 'Kiswahili', flag: 'https://flagcdn.com/w20/ke.png' }
  ]);

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, availableLanguages }}>
>>>>>>> 612db8ebfe5af6bc261c1d676ea905327c4b3be9
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => useContext(TranslationContext);