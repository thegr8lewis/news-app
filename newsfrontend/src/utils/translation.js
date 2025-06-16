// newsfrontend/src/utils/translation.js
const API_ENDPOINTS = [
  "https://libretranslate.de/translate",
  "https://translate.argosopentech.com/translate",
  "https://libretranslate.com/translate"
];

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
  localStorage.setItem(cacheKey, translatedText);
};

const getCachedTranslation = (text, targetLang) => {
  const cacheKey = `translation_${targetLang}_${hashString(text)}`;
  return localStorage.getItem(cacheKey);
};

export const translateText = async (text, targetLang = 'so') => {
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
      target: targetLang
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
          body: JSON.stringify(translationData)
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
  cacheTranslation(text, targetLang, translatedText.trim());
  return translatedText.trim();
};