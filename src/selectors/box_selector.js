import { compose } from 'redux';
import { boxInitialState } from '../reducers/index';
// import { InitState } from '../reducers/timetravel_reducer';
import { SHAPE_ARR } from '../components/app';
import time_action from '../actions/time_action';

//   let composeResult = compose(...arrFuns)
//   return composeResult(InitState);
//   // time_action.recordBeforeShape(boxInitialState.beforeType);
//   // time_action.recordShape(boxInitialState.type);
//   // time_action.recordArr(boxInitialState.arr);
//   // return state;
// }
// export default function(state){
//   time_action.recordBeforeShape(boxInitialState.beforeType);
//   time_action.recordShape(boxInitialState.type);
//   time_action.recordArr(boxInitialState.arr);
//   // time_action.recordBeforeShape(boxInitialState.beforeType);
//   // time_action.recordShape(boxInitialState.type);
//   // time_action.recordArr(boxInitialState.arr);
//   return state;
// }


// const aFuns = (actions,state) => {
//   let comFuns = actions.map((action) => {
//     switch (action.type) {
//       case 'recordBeforeShape':
//         // return (state) =>{
//         //   changeState(state);
//           return { ...state, timeType: action.payload.timeType };
//       // }
//       case 'recordShape':
//         // return (state) => {
//         //   changeState(state);
//           return { ...state, timeNextType: action.payload.timeNextType }
//         // };
//       case 'recordArr':
//         // return (state) => {
//         //   changeState(state);
//           return { ...state, timeArr: action.payload.timeArr }
//         // };
//       default:
//         return state;
//     }
//   })


const InitState = {
  timeNextType: 0,
  timeArr: [],
  timeType: 0,
}
const recordBeforeShape = (timeType) => ({
  type: 'recordBeforeShape',
  payload: { timeType },
})
const recordShape = (timeNextType) => ({
  type: 'recordShape',
  payload: { timeNextType },
})
const recordArr = (timeArr) => ({
  type: 'recordArr',
  payload: { timeArr },
})
// console.log(recordBeforeShape(boxInitialState.beforeType))
const actions = [recordBeforeShape(boxInitialState.beforeType), recordShape(boxInitialState.type), recordArr(boxInitialState.arr)];
export const aFuns = (actions) => {
  let comFuns = actions.map((action) => {
    switch (action.type) {
      case 'recordBeforeShape':
        return (state) => {
          return { ...state, timeType: action.payload.timeType }
        };
      case 'recordShape':
        return (state) => {
          return { ...state, timeNextType: action.payload.timeNextType }
        };
      case 'recordArr':
        return (state) => {
          return { ...state, timeArr: action.payload.timeArr }
        };
      default:
        return;
    }
  })
}
// export default {

//   // getUsername: state => state.user.std.username,
//   // getRoleId: state => state.user.std.roleId,
//   // hasAccess: state => state.user.std.access,
//   // getActionResult: state => state.user.std.actionResult || {}
// };
