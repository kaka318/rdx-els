import { combineReducers } from 'redux';
// import {boxReducer} from './boxDown_reducer';
import {downReducer,initDown,boxReducer} from './boxDown_reducer';
export const initialState = {
  box: boxReducer,
  // down:downReducer,
  // downinit:initDown

};
const rootReducer = combineReducers(initialState)
export default rootReducer