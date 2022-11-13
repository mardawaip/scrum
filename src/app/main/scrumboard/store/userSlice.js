import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getUserData = createAsyncThunk('dataGurusApp/user/getUserData', async () => {
	const response = await axios.get('/api/dataGurus-app/user');
	const data = await response.data;
	return data;
});

const userSlice = createSlice({
	name: 'dataGurusApp/user',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getUserData.fulfilled]: (state, action) => action.payload
	}
});

export default userSlice.reducer;
