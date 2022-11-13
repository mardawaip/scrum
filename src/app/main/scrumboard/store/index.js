import { combineReducers } from '@reduxjs/toolkit';
import databanner from './dataSlice';
import user from './userSlice';

const reducer = combineReducers({
	databanner,
	user
});

export default reducer;
