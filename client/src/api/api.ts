import axios from 'axios';

const API_URL =
    import.meta.env.IS_PRODUCTION === 'prod'
        ? import.meta.env.VITE_PROD_API_URL
        : import.meta.env.VITE_DEV_API_URL;

export const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL,
});
