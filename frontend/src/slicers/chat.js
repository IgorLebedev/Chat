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
  },
});

export const { initChat } = chatReducer.actions;

export default chatReducer.reducer;
