import { io } from 'socket.io-client';

const SERVER_URL = import.meta.env.VITE_DEV_SERVER_URL;

export const socket = io(SERVER_URL, {
  withCredentials: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
  auth: {
    token: localStorage.getItem('token'),
  },
});
