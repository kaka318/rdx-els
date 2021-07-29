import { combineReducers } from "redux";
import boxReducer from './boxDown_reducer'
export const boxInitialState = {
    x: -1,
    y: 3,
    type:parseInt(Math.random() * 7),
    beforeType:parseInt(Math.random() * 7),
    collisionCount:0,
};
export const reducers = combineReducers({
    box:boxReducer,
})