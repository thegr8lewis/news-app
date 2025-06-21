
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleById } from '../services/api';
import { useTranslation } from '../contexts/TranslationContext';
import { formatDateTime } from '../utils/translation';

const ArticleDetail = () => {
  const { id } = useParams();
  const { language } = useTranslation();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getArticleById(id, language);
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(
          language === 'so' ? 'Khalad soo dejinta wararka' :
          language === 'sw' ? 'Hitilafu ya kupakia makala' :
          'Failed to load article'
        );
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchArticle();
  }, [id, language]);

  // Translations for UI text
  const translations = {
    en: {
      loading: "Loading article...",
      videoNotSupported: "Your browser does not support the video tag.",
      published: "Published",
      by: "by",
      unknownAuthor: "Unknown Author"
    },
    so: {
      loading: "Soo dejinta wararka...",
      videoNotSupported: "Browserkaagu ma taageerin muqaalka.",
      published: "La daabacay",
      by: "by",
      unknownAuthor: "Qoraa aan la aqoon"
    },
    sw: {
      loading: "Inapakia makala...",
      videoNotSupported: "Kivinjari chako hakiungi video.",
      published: "Ilichapishwa",
      by: "na",
      unknownAuthor: "Mwandishi asiyejulikana"
    }
  };

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">{translations[language]?.loading}</span>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-600 text-center">
            {language === 'so' ? 'Wararkaan lama helin' :
             language === 'sw' ? 'Makala haijapatikana' :
             'Article not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <article className="bg-white">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight morion-font">
            {article.title}
          </h1>
          
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span className="mr-2">
              {translations[language]?.published} {formatDateTime(article.created_at, language)}
            </span>
            {article.author && (
              <>
                <span className="mx-1">{translations[language]?.by}</span>
                <span className="font-medium text-gray-700">
                  {article.author || translations[language]?.unknownAuthor}
                </span>
              </>
            )}
          </div>
        </header>

        {/* Media */}
        {article.image && (
          <div className="mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-auto rounded-lg shadow-sm border border-gray-200"
              loading="lazy"
            />
            {article.image_caption && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {article.image_caption}
              </p>
            )}
          </div>
        )}

        {article.video && !article.image && (
          <div className="mb-8">
            <video
              controls
              src={article.video}
              className="w-full rounded-lg shadow-sm border border-gray-200"
            >
              {translations[language]?.videoNotSupported}
            </video>
            {article.video_caption && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                {article.video_caption}
              </p>
            )}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none pb-5">
          <div className="text-gray-800 text-lg leading-relaxed whitespace-pre-line morion-font">
            {article.content}
          </div>
        </div>

        {/* Translation notice */}
        {article.language !== 'en' && article.original_article && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              {language === 'so' ? 'Laga soo turjumay Ingiriisiga' :
               language === 'sw' ? 'Imetafsiriwa kutoka Kiingereza' :
               'Translated from English'}
            </p>
          </div>
        )}
      </article>
    </div>
  );
};

export default ArticleDetail;