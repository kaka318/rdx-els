import {boxInitialState}  from './index'
export const InitState = {
  timeNextType:0,
  timeArr:null,
  timeType:0,
}
export default function(state = InitState,action){
  let {type,payload} = action;
  switch(type){
    case 'record':
      return {...state,timeNextType:payload.timeNextType};
    case 'recordtop':
      return {...state,timeType:payload.timeType,timeArr:payload.timeArr};
    default:
      return state;
  }
}