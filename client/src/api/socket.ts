// import { Socket, io } from 'socket.io-client';

// class SocketApi {
//     static socket: null | Socket = null;

//     static createConnection(userId: string): void {
//         this.socket = io('http://localhost:8080', {
//             query: {
//                 userId,
//             },
//         });
//     }

//     static createRoom(): void {}

//     static getConnection(): boolean | undefined {
//         return this.socket?.connected;
//     }
// }

// export default SocketApi;

import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
const URL = 'http://localhost:8080';

export const socket = io(URL);
