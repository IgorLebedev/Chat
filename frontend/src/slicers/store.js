import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat.js';

const store = configureStore({
  reducer: {
    chats: chatReducer,
  },
});

export default store;
