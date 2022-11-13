import { combineReducers } from '@reduxjs/toolkit';
import data from './dataSlice';
import user from './userSlice';

const reducer = combineReducers({
	data,
	user
});

export default reducer;
