interface User {
  id: number;
  email: string;
  username: string;

  accessToken?: string;
}

interface Interlocutor {
  username: string;
  lastVisit?: string;
}

interface Message {
  id: number;
  chatId: number;
  senderId: number;
  content: string;
}

interface Contact {
  id: number;
  chatId: number;
  username: string;
  message: string;
  isOnline?: boolean;
}

interface MessagesChatApiResponse {
  data: Message[];
  nextCursor?: string;
  isLastPage: boolean;
}

interface ChatMembers {
  users: Pick<User, 'id'>;
}
