import { combineReducers } from 'redux';
// import {boxReducer} from './boxDown_reducer';
import stateHistory from './stateHistory'
import {boxReducer} from './boxDown_reducer';
export const initialState = {
  box: boxReducer,
};
const rootReducer = combineReducers(initialState)
export default rootReducer