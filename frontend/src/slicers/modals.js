/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentEditingId: null,
  currentModal: null,
};

const modalsReducer = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      state.currentEditingId = payload.id;
      state.currentModal = payload.modalName;
    },
    closeModal: (state) => {
      state.currentEditingId = null;
      state.currentModal = null;
    },
  },
});

export const { openModal, closeModal } = modalsReducer.actions;

export default modalsReducer.reducer;
