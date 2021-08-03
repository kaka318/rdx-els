import {boxInitialState}  from './index'
export const InitState = {
  timeNextType:0,
  timeArr:[],
  timeType:0,
}
export default function(state = InitState,action){
  let {type,payload} = action;
  switch(type){
    case 'recordBeforeShape':
      return {...state,timeType:payload.timeType};
    case 'recordShape':
      return {...state,timeNextType:payload.timeNextType};
    case 'recordArr':
      return {...state,timeArr:payload.timeArr}
    default:
      return state;
  }
}