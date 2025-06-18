

// newsfrontend/src/services/api.js
const API_BASE_URL = 'http://localhost:8000';  // Removed /api from base URL

export const getArticles = async (language = 'en') => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/?language=${language}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to fetch articles (${response.status})`);
    }
    const data = await response.json();
    return data.map(article => ({
      ...article,
      // Handle both relative and absolute URLs from backend
      image: article.image ? ensureAbsoluteUrl(article.image) : null,
      video: article.video ? ensureAbsoluteUrl(article.video) : null
    }));
  } catch (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }
};


export const getArticleById = async (id, language = 'en') => {
  const response = await fetch(`${API_BASE_URL}/api/articles/${id}/?language=${language}`);
  if (!response.ok) {
    throw new Error('Failed to fetch article');
  }
  return response.json();
};



export const createArticle = async (articleData) => {
  try {
    const formData = new FormData();
    formData.append('title', articleData.title);
    formData.append('content', articleData.content);
    if (articleData.image) formData.append('image', articleData.image);
    if (articleData.video) formData.append('video', articleData.video);

    const response = await fetch(`${API_BASE_URL}/api/articles/`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create article');
    }

    const result = await response.json();
    return {
      ...result,
      image: result.image ? ensureAbsoluteUrl(result.image) : null,
      video: result.video ? ensureAbsoluteUrl(result.video) : null
    };
  } catch (error) {
    console.error('Error creating article:', error);
    throw error;
  }
};

export const updateArticle = async (id, articleData) => {
  try {
    const formData = new FormData();
    formData.append('title', articleData.title);
    formData.append('content', articleData.content);
    if (articleData.image instanceof File) formData.append('image', articleData.image);
    if (articleData.video instanceof File) formData.append('video', articleData.video);

    const response = await fetch(`${API_BASE_URL}/api/articles/${id}/`, {
      method: 'PATCH',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to update article');
    }

    const result = await response.json();
    return {
      ...result,
      image: result.image ? ensureAbsoluteUrl(result.image) : null,
      video: result.video ? ensureAbsoluteUrl(result.video) : null
    };
  } catch (error) {
    console.error('Error updating article:', error);
    throw error;
  }
};

export const deleteArticle = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/articles/${id}/delete_article/`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete article');
    }
    return true;
  } catch (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
};



// Helper function to ensure proper URL formatting
function ensureAbsoluteUrl(path) {
  if (!path) return null;
  if (path.startsWith('http')) return path;
  if (path.startsWith('/')) return `${API_BASE_URL}${path}`;
  return `${API_BASE_URL}/${path}`;
}