import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chat.js';
import modalsReducer from './modals.js';

const store = configureStore({
  reducer: {
    chats: chatReducer,
    modals: modalsReducer,
  },
});

export default store;
