import {compose} from 'redux';
import {boxInitialState}  from '../reducers/index';
import {InitState} from '../reducers/timetravel_reducer'
function previous(type,arr){
  boxInitialState.beforeType = type;
  return arr; 
}
function next(type,arr){
  return type+2;
}
let result = compose(previous,next);
export default {
  composeresult: result(),
  // getUsername: state => state.user.std.username,
  // getRoleId: state => state.user.std.roleId,
  // hasAccess: state => state.user.std.access,
  // getActionResult: state => state.user.std.actionResult || {}
};
