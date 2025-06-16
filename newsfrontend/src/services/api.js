// newsfrontend/src/services/api.js
const API_BASE_URL = 'http://localhost:8000/api';

export const getArticles = async (language = 'en') => {
  const response = await fetch(`${API_BASE_URL}/articles/?language=${language}`);
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }
  return await response.json();
};

export const createArticle = async (articleData) => {
  const formData = new FormData();
  
  formData.append('title', articleData.title);
  formData.append('content', articleData.content);
  if (articleData.image) {
    formData.append('image', articleData.image);
  }
  if (articleData.video) {
    formData.append('video', articleData.video);
  }

  const response = await fetch(`${API_BASE_URL}/articles/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to create article');
  }
  return await response.json();
};



export const updateArticle = async (id, articleData) => {
  const formData = new FormData();
  
  formData.append('title', articleData.title);
  formData.append('content', articleData.content);
  if (articleData.image) {
    formData.append('image', articleData.image);
  }
  if (articleData.video) {
    formData.append('video', articleData.video);
  }

  const response = await fetch(`${API_BASE_URL}/articles/${id}/`, {
    method: 'PATCH',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to update article');
  }
  return await response.json();
};

export const deleteArticle = async (id) => {
  const response = await fetch(`${API_BASE_URL}/articles/${id}/delete_article/`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete article');
  }
  return true;
};