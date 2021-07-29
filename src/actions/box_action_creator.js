import store from '../store/index'
const DIV_DOWN = 'DIV_DOWN';
const INITKEYDOWN = 'INIT_KEY_DOWN';
const DIVINIT = 'DIV_INIT';

const divDown = () =>({
  type: 'down',
});
const initKeyDown = (x,y) =>({
  type: 'keycol',
  payload: { x, y },
});
const divInit = () =>({
  type: 'downinit',
});
export default{
  divDown,DIV_DOWN,
  initKeyDown,INITKEYDOWN,
  divInit,DIVINIT
};