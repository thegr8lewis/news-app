
// src/utils/translation.js
const API_ENDPOINTS = [
  "https://libretranslate.de/translate",
  "https://translate.argosopentech.com/translate",
  "https://libretranslate.com/translate"
];

// Language mapping for translation services
const LANGUAGE_MAPPING = {
  'so': 'so',   // Somali
  'sw': 'sw',   // Kiswahili
  // Add more as needed
};

// Translation cache configuration
const CACHE_EXPIRY_DAYS = 7; // Cache translations for 7 days

// Split text into chunks of max 500 characters at sentence boundaries
const chunkText = (text, maxLength = 500) => {
  if (!text) return [];
  
  const chunks = [];
  let currentChunk = '';
  
  // Split by sentences if possible
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  for (const sentence of sentences) {
    if (currentChunk.length + sentence.length <= maxLength) {
      currentChunk += (currentChunk ? ' ' : '') + sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk);
      currentChunk = sentence;
    }
  }
  
  if (currentChunk) chunks.push(currentChunk);
  
  return chunks.length > 0 ? chunks : [text];
};

const hashString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString();
};

const cacheTranslation = (text, targetLang, translatedText) => {
  const cacheKey = `translation_${targetLang}_${hashString(text)}`;
  const cacheData = {
    text: translatedText,
    timestamp: Date.now()
  };
  localStorage.setItem(cacheKey, JSON.stringify(cacheData));
};

const getCachedTranslation = (text, targetLang) => {
  const cacheKey = `translation_${targetLang}_${hashString(text)}`;
  const cachedData = localStorage.getItem(cacheKey);
  
  if (!cachedData) return null;
  
  try {
    const { text: translatedText, timestamp } = JSON.parse(cachedData);
    const cacheAgeDays = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
    
    if (cacheAgeDays > CACHE_EXPIRY_DAYS) {
      localStorage.removeItem(cacheKey);
      return null;
    }
    
    return translatedText;
  } catch (e) {
    console.error('Error parsing cached translation:', e);
    localStorage.removeItem(cacheKey);
    return null;
  }
};

export const translateText = async (text, targetLang = 'so') => {
  if (!text || !LANGUAGE_MAPPING[targetLang]) return text;
  
  // Check cache first
  const cached = getCachedTranslation(text, targetLang);
  if (cached) return cached;

  // Split text into chunks if needed
  const chunks = chunkText(text);
  let translatedText = '';

  for (const chunk of chunks) {
    const translationData = {
      q: chunk,
      source: 'en',
      target: LANGUAGE_MAPPING[targetLang]
    };

    const headers = {
      "Content-Type": "application/json"
    };

    // Try different endpoints until one works
    let translatedChunk = chunk; // Default to original if translation fails
    for (const endpoint of API_ENDPOINTS) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(translationData),
          timeout: 5000 // 5 second timeout
        });

        if (response.ok) {
          const data = await response.json();
          translatedChunk = data.translatedText || chunk;
          break;
        }
      } catch (error) {
        console.error(`Translation failed with ${endpoint}:`, error);
      }
    }

    translatedText += translatedChunk + ' ';
  }

  // Cache the translation
  const finalTranslation = translatedText.trim();
  cacheTranslation(text, targetLang, finalTranslation);
  return finalTranslation;
};

// Date/time formatter with language support
export const formatDateTime = (dateString, language) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    
    // Add language-specific formatting
    switch (language) {
      case 'so':
        // Somali date formatting
        return date.toLocaleDateString('so-SO', options);
      case 'sw':
        // Kiswahili date formatting
        return date.toLocaleDateString('sw-KE', options);
      default:
        // Default to English
        return date.toLocaleDateString('en-US', options);
    }
  } catch (e) {
    console.error('Error formatting date:', e);
    return dateString; // Return original string if formatting fails
  }
};

// Time ago translations
export const translateTimeAgo = (value, unit, language) => {
  const translations = {
    en: {
      minutes: value === 1 ? `${value} minute ago` : `${value} minutes ago`,
      hours: value === 1 ? `${value} hour ago` : `${value} hours ago`,
      days: value === 1 ? `${value} day ago` : `${value} days ago`,
      just_now: 'just now'
    },
    so: {
      minutes: value === 1 ? `${value} daqiiqad kahor` : `${value} daqiiqo kahor`,
      hours: value === 1 ? `${value} saacad kahor` : `${value} saacado kahor`,
      days: value === 1 ? `${value} maalin kahor` : `${value} maalmood kahor`,
      just_now: 'dhawaan'
    },
    sw: {
      minutes: value === 1 ? `${value} dakika iliyopita` : `${value} dakika zilizopita`,
      hours: value === 1 ? `${value} saa iliyopita` : `${value} saa zilizopita`,
      days: value === 1 ? `${value} siku iliyopita` : `${value} siku zilizopita`,
      just_now: 'sasa hivi'
    }
  };

  // Handle just now case (value = 0)
  if (value === 0) return translations[language]?.just_now || translations.en.just_now;

  return translations[language]?.[unit] || translations.en[unit];
};

// Short date formatter (e.g., "Jun 21")
export const formatShortDate = (dateString, language) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const options = {
      month: 'short',
      day: 'numeric'
    };
    
    switch (language) {
      case 'so':
        // Somali short month names
        const somaliMonths = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
        return `${somaliMonths[date.getMonth()]} ${date.getDate()}`;
      case 'sw':
        // Kiswahili short month names
        const swahiliMonths = [
          'Jan', 'Feb', 'Mac', 'Apr', 'Mei', 'Jun',
          'Jul', 'Ago', 'Sep', 'Okt', 'Nov', 'Des'
        ];
        return `${swahiliMonths[date.getMonth()]} ${date.getDate()}`;
      default:
        return date.toLocaleDateString('en-US', options);
    }
  } catch (e) {
    console.error('Error formatting short date:', e);
    return dateString;
  }
};

// Number formatter with language support
export const formatNumber = (number, language) => {
  if (isNaN(number)) return number;
  
  try {
    switch (language) {
      case 'so':
        // Somali uses Western Arabic numerals
        return new Intl.NumberFormat('en-US').format(number);
      case 'sw':
        // Kiswahili typically uses Western Arabic numerals
        return new Intl.NumberFormat('en-US').format(number);
      default:
        return new Intl.NumberFormat('en-US').format(number);
    }
  } catch (e) {
    console.error('Error formatting number:', e);
    return number;
  }
};



export const cleanTranslationCache = () => {
  const now = Date.now();
  const expiryMs = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith('translation_')) {
      try {
        const cachedItem = localStorage.getItem(key);
        
        // Skip if the item doesn't look like JSON
        if (!cachedItem?.startsWith('{')) {
          localStorage.removeItem(key);
          return;
        }
        
        const cachedData = JSON.parse(cachedItem);
        if (now - (cachedData.timestamp || 0) > expiryMs) {
          localStorage.removeItem(key);
        }
      } catch (e) {
        console.error('Error cleaning cache item:', key, e);
        localStorage.removeItem(key);
      }
    }
  });
};


// Initialize cache cleaning on load
if (typeof window !== 'undefined') {
  cleanTranslationCache();
}