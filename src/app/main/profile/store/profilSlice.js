import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProfil = createAsyncThunk(
  'Profil/getProfil',
  async (params) => {
  const response = await axios.get('/api/profil/get_profil');
  const data = await response.data;

  return { data };
});

export const getLog = createAsyncThunk(
  'Profil/getLog',
  async (params) => {
  const response = await axios.get('/api/profil/get_log');
  const data = await response.data;

  return { data };
});

export const totalUmkms = createAsyncThunk(
  'Profil/getUmkm',
  async (params) => {
  const response = await axios.get('/api/totalUmkm');
  const data = await response.data;

  return { data };
});

export const totalUmkmVerifikasis = createAsyncThunk(
  'Profil/getUmkmVerifikasi',
  async (params) => {
  const response = await axios.get('/api/totalUmkmVerifikasi');
  const data = await response.data;

  return { data };
});

export const getGrafikTerdaftar = createAsyncThunk(
	'Profil/getGrafikTerdaftar',
	async (routeParams, { getState }) => {
		const response = await axios.get(`/api/grafiktime`);
		const data = await response.data;

		return { data, routeParams };
	}
)

export const getWidgetsPie = createAsyncThunk(
	'Profil/getWidgetsPie',
	async (routeParams) => {
		const response = await axios.post('/api/Profil/data_umkm', {
			...routeParams
		});
		const data = await response.data;

		return { data, routeParams };
	}
);

export const getWidgetPerKecamatan = createAsyncThunk(
	'Profil/getWidgetPerKecamatan',
	async (routeParams, { getState }) => {
		const response = await axios.get(`/api/Profil/umkm_perkecamatan`);
		const data = await response.data;

		return { data, routeParams };
	}
)

const profilsAdapter = createEntityAdapter({
});

const profilSlice = createSlice({
  name: 'Dashboard',
  initialState: profilsAdapter.getInitialState({
    profil: [],
    profil_log: [],
    grafik_terdaftar: {},
    umkm_perkecamatan: {},
    widgets_pie: {
      totalUmkm: 0,
      series: [],
      labels: []
		},
  }),
  reducers: {
    resetProfil: () => null,
  },
  extraReducers: {
    [getProfil.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.profil = data;
		},
    [getWidgetPerKecamatan.fulfilled]: (state, action) => {
      const { data } = action.payload;
			state.umkm_perkecamatan = data;
      console.log(data)
    },
    [getGrafikTerdaftar.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.grafik_terdaftar = data.data;
		},
    [getWidgetsPie.fulfilled]: (state, action) => {
			const { data } = action.payload;
			state.widgets_pie = data;
		},
    [getLog.fulfilled]: (state, action) => {
      const { data } = action.payload;
			state.profil_log = data;
    }
  },
});
export const selectWidgets = ({ dataProfil }) => dataProfil.data;
export const { resetProfil } = profilSlice.actions;

export default profilSlice.reducer;
