/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const DEFAULT_CHANNEL_ID = 1;

const initialState = {
  channels: [],
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
    addChannel: (state, { payload }) => {
      state.channels.push(payload);
    },
    removeChannel: (state, { payload }) => {
      state.channels = state.channels.filter(({ id }) => id !== payload.id);
      state.messages = state.messages.filter(({ channelId }) => channelId !== payload.id);
      if (state.currentChannelId === payload.id) {
        state.currentChannelId = DEFAULT_CHANNEL_ID;
      }
    },
    renameChannel: (state, { payload }) => {
      const desiredChannel = state.channels.find(({ id }) => payload.id === id);
      desiredChannel.name = payload.name;
    },
  },
});

export const {
  initChat,
  changeChat,
  addMessage,
  addChannel,
  removeChannel,
  renameChannel,
} = chatReducer.actions;

export default chatReducer.reducer;
