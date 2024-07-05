require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const cookieParser = require('cookie-parser');

const sequelize = require('./db');
const router = require('./routes/regular');
const errorHandler = require('./middlewares/error-middleware');
const { Message } = require('./models');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ['GET', 'POST'],
    },
});
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    cors({
        credentials: true,
        origin: [process.env.CLIENT_URL, 'http://localhost:3001'],
    }),
);

app.use('/api', router);
app.use(errorHandler);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('message', async (msg) => {
        try {
            await Message.create({
                chatId: msg.chatId,
                senderId: msg.senderId,
                content: msg.content,
                username: msg.username,
            });
        } catch (error) {
            console.log(error);
        }

        io.emit('message', msg);
    });

    socket.on('foo', (data) => {
        console.log('foo event received:', data);
        io.emit('foo', data);
    });
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({
            // force: true
            alter: true
        });
        server.listen(PORT, () =>
            console.log(`Server started on PORT = ${PORT}`),
        );
    } catch (error) {
        console.log(error);
    }
};

start();
