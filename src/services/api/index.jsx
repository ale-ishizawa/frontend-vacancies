import axios from 'axios';

const defaultTimeout = 240000;

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: defaultTimeout
});

api.interceptors.request.use(async config => {
  // const token = getToken();
  // if (token && config.url !== 'auth/login_check') {
  //   if (isTokenExpired(token)) {
  //     document.location.href = '/';
  //   }
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  return config;
});

export default api;
export { api };