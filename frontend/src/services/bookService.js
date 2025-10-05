import api, { handleApiError } from './api';

export const getBooks = async (page = 1, search = '', genre = '') => {
  try {
    const response = await api.get('/books', {
      params: { page, search, genre }
    });
    // Return the whole response data
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
// Get single book by ID
export const getBookById = async (id) => {
  try {
    const response = await api.get(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Create new book
export const createBook = async (bookData) => {
  try {
    const response = await api.post('/books', bookData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update book
export const updateBook = async (id, bookData) => {
  try {
    const response = await api.put(`/books/${id}`, bookData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete book
export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`/books/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};