import axios from 'axios';

export const UNAUTHORIZED = 401;

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_API_ENDPOINT || ''}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => config, (error) => Promise.reject(error));

const whiteListUrls = ['/login', '/profile'];

instance.interceptors.response.use((response) => response, (error) => {
  const isAllowedWithoutPermissions = whiteListUrls.some((url) => error.config.url.endsWith(url));
  if (!isAllowedWithoutPermissions && error.response.status === UNAUTHORIZED) {
    window.location.href = '/';
  }
  return Promise.reject(error);
});

export default instance;
