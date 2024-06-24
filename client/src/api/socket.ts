import { io } from 'socket.io-client';

const API_URL =
    import.meta.env.IS_PRODUCTION === 'prod'
        ? import.meta.env.VITE_PROD_API_URL
        : import.meta.env.VITE_DEV_API_URL;

export const socket = io(API_URL);
