import axios from 'axios';

const API_URL =
  import.meta.env.IS_PRODUCTION === 'prod'
    ? import.meta.env.VITE_PROD_API_URL
    : import.meta.env.VITE_DEV_API_URL;

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

$api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const response = await axios.get<{ accessToken: string }>(
          `${API_URL}/refresh`,
          {
            withCredentials: true,
          },
        );
        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.log('Пользователь не авторизован');
      }
    }

    return Promise.reject(error);
  },
);
