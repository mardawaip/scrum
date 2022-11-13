/* eslint-disable */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getMembers = createAsyncThunk(
	'dataScrum/getMembers',
	async (routeParams) => {
		const response = await axios.post('/api/scrum/getMembers', routeParams);
		const data = await response.data;

		return { data };
	}
)

export const getBoards = createAsyncThunk(
	'dataScrum/getBoards',
	async (routeParams, { getState }) => {
		const response = await axios.post(`/api/scrum/getScrum`);
		const data = await response.data;

		return { data };
	}
)

export const getBoard = createAsyncThunk(
	'dataScrum/getBoard',
	async (boardId, { getState }) => {
		const response = await axios.get(`/api/scrum/getScrum/${boardId}`);
		const data = await response.data;

		return { data };
	}
)

export const getDetailAplikasi = createAsyncThunk(
	'dataScrum/getDetailAplikasi',
	async (selectData, { getState }) => {
		const response = await axios.get(`/api/scrum/getAplikasiDetail/${selectData.id}`);
		const data = await response.data;

		return { data };
	}
)

export const addData = createAsyncThunk(
	'dataScrum/addData',
	async (dataParams, { dispatch, getState }) => {
		const response = await axios.post('/api/scrum/store', { ...dataParams });
		const data = await response.data;

		// dispatch(getDatas());

		return data;
	}
);

export const updateData = createAsyncThunk(
	'dataScrum/updateData',
	async (routeParams, { dispatch, getState }) => {
		const response = await axios.put(`/api/scrum/update/${routeParams.banner_id}`, { ...routeParams });
		const data = await response.data;

		// dispatch(getDatas());

		return data;
	}
);

export const removeData = createAsyncThunk(
	'dataScrum/removeData',
	async (id, { dispatch }) => {
		const response = await axios.delete(`/api/scrum/destroy/${id}`);
		const data = await response.data;
		// dispatch(getDatas());

		return data;
	}
);

const datasAdapter = createEntityAdapter({ selectId: (data) => data.banner_id });

export const { selectAll: selectData, selectById: selectDataById } = datasAdapter.getSelectors(
	state => state.dataBanner.databanner
);

const dataSlice = createSlice({
	name: 'dataBanner',
	initialState: datasAdapter.getInitialState({
		searchText: {},
		routeParams: {},
		count: 0,
		count_all: 0,
		keypress: Math.random(),
		member: []
	}),
	reducers: {
		setSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
		},
		changeKey: (state, action) => {
			state.keypress = Math.random()
		},
		resetBoards: (statem, action) => {
			// code...
		}
	},
	extraReducers: {
		[getMembers.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.halaman = data;
		},
		// [getDatas.fulfilled]: (state, action) => {
		// 	const { data, routeParams } = action.payload;
		// 	datasAdapter.setAll(state, data.data);
		// 	state.routeParams = routeParams;
		// 	state.count = data.to;
		// 	state.count_all = data.total;
		// },
		[getDetailAplikasi.fulfilled]: (state, action) => {
			state.perdata = action.payload.data;
		},
	}
});

export const {
	setSearchText,
	changeKey,
	resetBoards
} = dataSlice.actions;

export default dataSlice.reducer;
