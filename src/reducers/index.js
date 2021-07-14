import { combineReducers } from 'redux';
import boxReducer, { boxInitialState } from '../reducers/box_reducer';

export const initialState = {
  box: boxInitialState
};

export const reducers = combineReducers({
  box: boxReducer
});