import {compose} from 'redux'
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
const aFuns = (actions) => {
  let comFuns = actions.map((action) => {
    switch (action.type) {
      case 'recordBeforeShape':
        return (state)=>{
            return { ...state, timeType: action.payload.timeType };
          }
      case 'recordShape':
        return (state)=>{
          return { ...state, timeNextType: action.payload.timeNextType };
        }
      case 'recordArr':
        return (state)=>{
          return { ...state, timeArr: action.payload.timeArr };
        }
      default:
        return null;
    }
  })
  let comresult = compose(...comFuns);
  return comresult(InitState);
}