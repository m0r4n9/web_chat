import Ajv from "ajv";

export const ajv = new Ajv()


export function chatRoom(chatId) {
    return `chat:${chatId}`;
}

export function userRoom(userId) {
    return `user:${userId}`;
}