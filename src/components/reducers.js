
import stateHistory from './stateHistory';// 引入我们之前声明的history对象
 
// 原本我们是这样返回reducers的
// export default combineReducers({
//     books: fetchReducer,
//     displayMode: bookDisplayReducer,
//     currentStatus: statusReducer,
//     topic: topicReducer
// })
// 改造后如下：
export default history(
  combineReducers({
    books: fetchReducer,
    displayMode: bookDisplayReducer,
    currentStatus: statusReducer,
    topic: topicReducer
  })
);
// 我们用history包裹combineReducer,history实现如下
const history = reducers => (state, aciton) => {
  switch (action.type) {
    case 'UNDO': // 后退
      stateHistory.undo();
      break;
    case 'REDO': // 前进
      stateHistory.redo();
      break;
    case 'GOTO': // 定点指向
      stateHistory.gotoState(action.stateIndex);
      break;
    default:
      const newState = reducer(state, action);
      stateHistory.push(newState);// 每次dipatch(action)都会像将状态保存到stateHistory
  }
  return stateHistory.present; // 返回当前状态
}