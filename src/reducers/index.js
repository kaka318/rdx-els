import { combineReducers } from "redux";
import boxReducer from './boxDown_reducer';
import timeRedecer from './timetravel_reducer'
export const boxInitialState = {
    x: -1,
    y: 3,
    type:parseInt(Math.random() * 7),
    beforeType:parseInt(Math.random() * 7),
    collisionCount:0,
    arr:new Array(20).fill(new Array(10).fill(0)),
};
export const reducers = combineReducers({
    box:boxReducer,
    time:timeRedecer,
})

// export default reducers(
//     combineReducers({
//         box:boxReducer
//     })
// )