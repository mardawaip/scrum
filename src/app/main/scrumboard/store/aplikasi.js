import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { showMessage } from 'app/store/fuse/messageSlice';

/**
 * Update Card
 */
export const getDetailAplikasi = createAsyncThunk(
  'scrumboardApp/aplikasi/getDetail',
  async (selectData, { dispatch, getState }) => {
    const response = await axios.get(`/api/scrum/getAplikasiDetail/${selectData.id}`);
    const data = await response.data;

    return data;
  }
);

/**
 * Remove Card
 */
export const removeCard = createAsyncThunk(
  'scrumboardApp/card/removeCard',
  async (params, { dispatch, getState }) => {
    const { board, card } = getState().scrumboardApp;

    const response = await axios.delete(`/api/scrumboard/boards/${board.id}/cards/${card.data.id}`);

    const data = await response.data;

    dispatch(closeCardDialog());

    return data;
  }
);

const aplikasiSlice = createSlice({
  name: 'scrumboardApp/aplikasi',
  initialState: {
    aplikasi_detail : {},
  },
  reducers: {
    // code...    
  },
  extraReducers: {
    [getDetailAplikasi.fulfilled]: (state, action) => {
      state.aplikasi_detail = action.payload;
    },
  },
});

export const { openCardDialog, closeCardDialog } = aplikasiSlice.actions;

export const selectCardDialogOpen = ({ scrumboardApp }) => scrumboardApp.card.dialogOpen;
export const selectCardData = ({ scrumboardApp }) => scrumboardApp.card.data;

export default aplikasiSlice.reducer;
