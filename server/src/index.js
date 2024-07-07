import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';

import sequelize from './db.js';
import { router } from './routes/regular.js';
import errorHandler from './middlewares/error-middleware.js';
import { Message } from './models/index.js';
import userService from './services/user-service.js';
import { initEventHandlers } from './initEventHandlers.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  },
});
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
  }),
);

app.use('/api', router);
app.use(errorHandler);

initEventHandlers({ io });

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      // force: true
      // alter: true
    });
    server.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

start();
