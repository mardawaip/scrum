import { combineReducers } from '@reduxjs/toolkit';
import board from './boardSlice';
import boards from './boardsSlice';
import card from './cardSlice';
import cards from './cardsSlice';
import lists from './listsSlice';
import labels from './labelsSlice';
import members from './membersSlice';
import aplikasi from './aplikasi';

const scrumboardAppReducers = combineReducers({
  boards,
  board,
  card,
  cards,
  lists,
  labels,
  members,
  aplikasi
});

export default scrumboardAppReducers;
