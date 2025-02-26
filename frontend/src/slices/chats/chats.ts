import {
  createChat,
  createMessage,
  deleteChat,
  generateReply,
  getAllChats,
  getCurrentChatMessages,
} from './actions.js';
import { actions } from './chats.slice.js';

const allActions = {
  ...actions,
  getAllChats,
  createChat,
  deleteChat,
  generateReply,
  getCurrentChatMessages,
  createMessage,
};

export { allActions as actions };
export { reducer } from './chats.slice.js';
