/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: {},
  currentChannelId: null,
  messages: [],
};

const chatReducer = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    initChat: (state, { payload }) => {
      const { channels, currentChannelId, messages } = payload;
      state.channels = channels;
      state.currentChannelId = currentChannelId;
      state.messages = messages;
    },
    changeChat: (state, { payload }) => {
      state.currentChannelId = payload;
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
  },
});

export const {
  initChat,
  changeChat,
  addMessage,
} = chatReducer.actions;

export default chatReducer.reducer;
