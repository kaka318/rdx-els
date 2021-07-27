import { combineReducers } from 'redux';
import {boxReducer, boxInitialState } from '../reducers/box_reducer';

export const initialState = {
  box: boxReducer
};
const rootReducer = combineReducers(initialState)
export default rootReducer