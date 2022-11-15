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
		const id = selectData ? selectData.id : getState().scrumboardApp.data.id;
		const response = await axios.get(`/api/scrum/getAplikasiDetail/${id}`);
		const data = await response.data;

		return { data, id };
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

export const addTask = createAsyncThunk(
	'dataScrum/addTask',
	async (task, { dispatch, getState }) => {
		dispatch(setLoading(true));
		const response = await axios.post('/api/scrum/tasks', task);
		const data = await response.data;
		dispatch(setCloseDialog());
		dispatch(getDetailAplikasi());
	  	return data;
	}
);

export const updateTask = createAsyncThunk(
	'dataScrum/updateTask',
	async (task, { dispatch, getState }) => {
		const response = await axios.put(`/api/scrum/tasks/${task.id}`, task);
		const data = await response.data;
		dispatch(setCloseDialog());
		dispatch(getDetailAplikasi());
		return data;
	}
);

export const removeTask = createAsyncThunk(
	'dataScrum/removeTask',
	async (id, { dispatch, getState }) => {
		const response = await axios.delete(`/api/scrum/tasks/${id}`);
		await response.data;
		dispatch(getDetailAplikasi());
		dispatch(setCloseDialog());
		return id;
	}
);
export const reorderList = createAsyncThunk(
	'dataScrum/reorderList',
	async (task, { dispatch, getState }) => {
		dispatch(setLoading(true));
		const response = await axios.post('/api/scrum/tasks/reorderList', {datas: task});
		const data = await response.data;
		dispatch(setLoading(false));
		dispatch(getDetailAplikasi());
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
		id: '',
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
		},
		dialogOpen: false,
		data: null
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
		},
		handleChangeTask: (state, action) => {
			state.aplikasi.tasks = action.payload
		},
		openCardDialog: (state, action) => {
			state.dialogOpen = true;
			state.data = action.payload;
		},
		closeCardDialog: (state, action) => {
			state.dialogOpen = false;
			state.data = null;
		},
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
			const { data, id } = action.payload;
			state.aplikasi = data;
			state.loading = false;
			state.id = id;
		},
	}
});

export const {
	setSearchText,
	changeKey,
	resetBoards,
	setLoading,
	setOpenDialog,
	setCloseDialog,
	handleChangeTask,
	openCardDialog,
	closeCardDialog
} = dataSlice.actions;

export default dataSlice.reducer;
