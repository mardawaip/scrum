import { combineReducers } from '@reduxjs/toolkit';
import data from './profilSlice';

const reducer = combineReducers({
  data,
});

export default reducer;
