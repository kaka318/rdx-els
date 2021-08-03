const INITKEYDOWN = 'INIT_KEY_DOWN';
const CHANGE_COUNT = 'CHANGE_COUNT';
const CHANGE_TYPE = 'CHANGE_TYPE';
const CHANGE_BEFORETYPE = 'CHANGE_BEFORETYPE';
// const RECORD = 'RECORD';
const CHANGE_ARR = 'CHANGE_ARR';


const initKeyDown = (x,y) =>({
  type: 'keycol',
  payload: { x, y },
});
const changeCount = (collisionCount) => ({
  type:'changeCount',
  payload:{collisionCount}
})
const changeType = (type) => ({
  type:'changetype',
  payload:{type}
})
const changeBeforeType = (pretype) => ({
  type:'changebeforetype',
  payload:{pretype}
})
const changeArr = (arr) => ({
  type:'changearr',
  payload:{arr}
})
// const redo = () => ({
//   type:'previous'
// })
// const undo = () => ({
//   type:'present'
// })
// const gotoState = (stateIndex) => ({
//   type:'next',
//   stateIndex
// })
export default{
  initKeyDown,INITKEYDOWN,
  changeCount,CHANGE_COUNT,
  changeBeforeType,CHANGE_BEFORETYPE,
  changeType,CHANGE_TYPE,
  changeArr,CHANGE_ARR,
  // record,RECORD,
};