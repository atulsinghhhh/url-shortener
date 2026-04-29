import axios from 'axios';

const api = axios.create({
  baseURL: 'https://url-shortener-backend-2i00.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
