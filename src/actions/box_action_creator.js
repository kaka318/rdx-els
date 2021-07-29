import store from '../store/index'
export default {
  divDown(){
    let action = {
      type: 'down',
    }
    store.dispatch(action)
  },
  initDown(){
    let action = {
      type: 'downinit',
    }
    store.dispatch(action)
  },
  initKeyDown(x, y){
    let action = {
      type: 'keycol',
      payload: { x, y },
    }
    store.dispatch(action)
  },
  eButton(x,y){
    let action = {
      type : 'ebutton',
      payload:{x,y}
    }
    store.dispatch(action)
  }
}