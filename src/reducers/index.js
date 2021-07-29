import { combineReducers } from "redux";
import boxReducer from './boxDown_reducer'
export const boxInitialState = {
    x: -1,
    y: 3,
};
export const reducers = combineReducers({
    box:boxReducer,
})