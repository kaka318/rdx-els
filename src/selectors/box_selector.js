import {compose} from 'redux';
import {boxInitialState}  from '../reducers/index';
import {InitState} from '../reducers/timetravel_reducer';
import {SHAPE_ARR} from '../components/app';
import time_action from '../actions/time_action';


// export default function (state){
//   time_action.record(state.timeType);
//   time_action.recordtop(state.timeArr);
//   return state;
// }
export default function (state){
  time_action.record(boxInitialState.beforeType,boxInitialState.type,boxInitialState.arr);
  return state;
}
// export default {

//   // getUsername: state => state.user.std.username,
//   // getRoleId: state => state.user.std.roleId,
//   // hasAccess: state => state.user.std.access,
//   // getActionResult: state => state.user.std.actionResult || {}
// };
