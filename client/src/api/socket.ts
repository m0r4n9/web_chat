import { io } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_DEV_SERVER_URL;

export const socket = io(SERVER_URL, {
  autoConnect: false,
  transports: ['websocket'],
  withCredentials: true,
  auth: {
    token: localStorage.getItem('token'),
  },
});
