import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://greenex-be.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000,
});

export default axiosInstance;
