// import stateHistory from './stateHistory'
// import {boxInitialState}  from './boxDown_reducer'
// import {reducers} from './index'
// export default (state = boxInitialState,action) => {
//   switch(action.type){
//     case 'previous':
//       stateHistory.undo();
//       break;
//     case 'present':
//       stateHistory.redo();
//       break;
//     case 'next':
//       stateHistory.gotoState(action.stateIndex);
//       break;
//     default:
//       const newState = reducers(state,action);
//       stateHistory.push(newState);
//   }
//   return stateHistory.present;
// }
// import stateHistory from './stateHistory'
import {boxInitialState}  from './index'
// import {reducers} from './index'
export default function(state = boxInitialState,action){
  let {type,payload} = action;
  switch(type){
    case 'record':
      return {...state,beforeType:payload.beforeType};
    default:
      return state;
  }
}