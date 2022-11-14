/* eslint-disable */
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import history from '@history';

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
	async (boardId, { getState, dispatch }) => {
		dispatch(setLoading(true));
		const response = await axios.get(`/api/scrum/getScrum/${boardId}`);
		const data = await response.data;

		return { data };
	}
)

export const getDetailAplikasi = createAsyncThunk(
	'dataScrum/getDetailAplikasi',
	async (selectData, { getState, dispatch }) => {
		dispatch(setLoading(true));
		const response = await axios.get(`/api/scrum/getAplikasiDetail/${selectData.id}`);
		const data = await response.data;

		return { data };
	}
)

export const newBoard = createAsyncThunk(
	'dataScrum/newBoard',
	async (dataParams, { dispatch, getState }) => {
		const response = await axios.post('/api/scrum/addScrum', { ...dataParams });
		const data = await response.data;

		history.push({
			pathname: `/scrumboard/boards/${data.aplikasi_id}`,
		});

		return data;
	}
);

export const updateBoard = createAsyncThunk(
	'dataScrum/updateBoard',
	async (routeParams, { dispatch, getState }) => {
		dispatch(setLoading(true));
		const response = await axios.put(`/api/scrum/updateScrum/${routeParams.id}`, { ...routeParams });
		const data = await response.data;

		return { data };
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
	state => state.scrumboardApp.data
);

const dataSlice = createSlice({
	name: 'scrumboardApp',
	initialState: datasAdapter.getInitialState({
		loading: false,
		searchText: {},
		routeParams: {},
		count: 0,
		count_all: 0,
		keypress: Math.random(),
		member: [],
		boards: [],
		board: null,
		aplikasi: {
			aplikasi : {},
			tasks: []
		},
		tasks_dialog: {
			open: false,
			form: {}
		}
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
		setLoading: (state, action) => {
			state.loading = action.payload;
		},
		resetBoards: (state, action) => {
			// code...
		},
		setOpenDialog: (state, action) => {
			state.tasks_dialog = {
				open: true,
				form: action.payload
			}
		},
		setCloseDialog: (state, action) => {
			state.tasks_dialog = { open: false, form: {} }
		}
	},
	extraReducers: {
		[getMembers.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.halaman = data;
		},
		[getBoards.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.boards = data;
		},
		[getBoard.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.board = data;
			state.loading = false;
		},
		[updateBoard.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.board = data;
			state.loading = false;
		},
		[getDetailAplikasi.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.aplikasi = data;
		},
	}
});

export const {
	setSearchText,
	changeKey,
	resetBoards,
	setLoading,
	setOpenDialog,
	setCloseDialog
} = dataSlice.actions;

export default dataSlice.reducer;
