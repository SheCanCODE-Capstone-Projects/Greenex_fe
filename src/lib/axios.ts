import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://greenex-be-28wt.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/signin') && !currentPath.includes('/signup')) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_info');
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
