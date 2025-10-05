import axiosInstance from '../api/axiosInstance';

export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data.message || "'Something went wrong'";
  } else if (error.request) {
    return 'Unable to connect to server'
  } else {
    return error.message || 'Error occurred'
  }
};

export default axiosInstance;