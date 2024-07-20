import sequelize from '../db.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: 'users',
    timestamps: false,
  },
);

const Chat = sequelize.define(
  'Chat',
  {
    chatId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chatName: {
      type: DataTypes.STRING(100),
    },
    chatType: {
      type: DataTypes.STRING(20),
      defaultValue: 'private',
    },
  },
  {
    tableName: 'chats',
    timestamps: false,
  },
);

const ChatMember = sequelize.define(
  'ChatMember',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
      references: {
        model: Chat,
        key: 'chatId',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    role: {
      type: DataTypes.STRING(20),
      defaultValue: 'member',
    },
  },
  {
    tableName: 'chat_members',
    timestamps: false,
  },
);

const Message = sequelize.define(
  'Message',
  {
    messageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    chatId: {
      type: DataTypes.INTEGER,
      references: {
        model: Chat,
        key: 'chatId',
      },
    },
    senderId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.STRING(20),
      defaultValue: 'sent',
    },
  },
  {
    tableName: 'messages',
    timestamps: false,
  },
);

const Contact = sequelize.define(
  'Contact',
  {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    contactId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    addedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: 'contacts',
    timestamps: false,
  },
);

const Token = sequelize.define(
  'Token',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.TEXT, allowNull: false },
  },
  { timestamps: false, tableName: 'tokens' },
);

const UnreadMessage = sequelize.define(
  'UnreadMessage',
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: User,
        key: 'id',
      },
    },
    message_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Message,
        key: 'messageId',
      },
    },
  },
  {
    timestamps: false,
    tableName: 'unread_messages',
  },
);

Chat.hasMany(Message, { foreignKey: 'chatId' });
Message.belongsTo(Chat, { foreignKey: 'chatId' });

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' });

Chat.belongsToMany(User, { through: ChatMember, foreignKey: 'chatId' });
User.belongsToMany(Chat, { through: ChatMember, foreignKey: 'userId' });

User.hasMany(Contact, { foreignKey: 'userId' });
User.hasMany(Contact, { foreignKey: 'contactId' });

User.hasOne(Token);
Token.belongsTo(User);

UnreadMessage.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
UnreadMessage.belongsTo(Message, {
  foreignKey: 'message_id',
  onDelete: 'CASCADE',
});

export { User, Chat, ChatMember, Message, Contact, Token };
