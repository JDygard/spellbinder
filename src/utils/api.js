import axios from 'axios';

// Set up the base API instance
const api = axios.create({
  baseURL: 'http://localhost:3001',
});

// Refresh token function
async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await axios.post('http://localhost:3001/refresh-token', { refreshToken });
  localStorage.setItem('accessToken', response.data.accessToken);
  return response.data.accessToken;
}

// Axios interceptor for handling token expiration
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    const originalRequest = error.config;

    // Check for 401 Unauthorized response and no previous token refresh attempt
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried

      try {
        const newAccessToken = await refreshToken(); // Refresh the token
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`; // Update the request with the new token
        return api(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        // Handle refresh token failure, e.g., log out the user
      }
    }

    return Promise.reject(error); // Pass through other errors
  }
);

export default api;