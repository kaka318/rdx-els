import {boxInitialState}  from './index'
export const InitState = {
  timeNextType:0,
  timeArr:[],
  timeType:0,
}
export default function(state = InitState,action){
  let {type,payload} = action;
  switch(type){
    case 'record':
      return {timeType:payload.timeType,timeNextType:payload.timeNextType,timeArr:payload.timeArr};
    // case 'recordtop':
    //   return {...state};
    default:
      return state;
  }
}