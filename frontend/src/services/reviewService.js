import api, { handleApiError } from './api';

// Add review to a book
export const addReview = async (bookId, reviewData) => {
  try {
    const response = await api.post(`/reviews/${bookId}`, reviewData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Update review
export const updateReview = async (reviewId, reviewData) => {
  try {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Delete review
export const deleteReview = async (reviewId) => {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

// Get my reviews (for profile page)
export const getMyReviews = async () => {
  try {
    const response = await api.get('/reviews/my-reviews');
    return response.data;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};