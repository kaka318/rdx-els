// const BLOCKS_REMOVE = 'BLOCKS_REMOVE';
// const BLOCKS_CLEAR = 'BLOCKS_CLEAR';
// const MOVE_DOWN = 'MOVE_DOWN';
// const MOVE_LEFT = 'MOVE_LEFT';
// const MOVE_RIGHT = 'MOVE_RIGHT';

// export const remove = actionId => ({
//   type: BLOCKS_REMOVE,
//   payload: {actionId}
// });

// export const clear = () => ({
//   type: BLOCKS_CLEAR,
// });
import store from'../store/index'
export const moveLeft = () => ({
  type:65,
});
export const moveRight = () => ({
  type:68,
});
export const moveDown = () => ({
  type:83,
});
export const divDown = () => ({
  type:'down',
})
export const initDown = () => ({
  type:'downinit',
})
export const initKeyDown = (x,y) => ({
  type:'keycol',
  payload:{x,y},
})
// const isRevolve = () => ({type:84});
// export default {
//   // remove: BLOCKS_REMOVE,
//   moveDown:MOVE_DOWN,
//   moveLeft:MOVE_LEFT,
//   moveRight:MOVE_RIGHT,
//   // clear:BLOCKS_CLEAR
// };