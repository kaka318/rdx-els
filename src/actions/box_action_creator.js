const INITKEYDOWN = 'INIT_KEY_DOWN';
const CHANGE_COUNT = 'CHANGE_COUNT';
const CHANGE_TYPE = 'CHANGE_TYPE';
const CHANGE_BEFORETYPE = 'CHANGE_BEFORETYPE';


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
export default{
  initKeyDown,INITKEYDOWN,
  changeCount,CHANGE_COUNT,
  changeBeforeType,CHANGE_BEFORETYPE,
  changeType,CHANGE_TYPE,
};