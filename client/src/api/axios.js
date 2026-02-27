import axios from 'axios';

const API = axios.create({
  // Sirf '/api' likhein, ab ye apne aap same domain ko point karega
  baseURL: '/api', 
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem('token')) {
    req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  }
  return req;
});

export default API;