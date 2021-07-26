const BLOCKS_REMOVE = 'BLOCKS_REMOVE';
const BLOCKS_CLEAR = 'BLOCKS_CLEAR';


const remove = actionId => ({
  type: BLOCKS_REMOVE,
  payload: {actionId}
});

const clear = () => ({
  type: BLOCKS_CLEAR,
  payload: true
});
export const redo = () => ({
  type: 'REDO'
});
 
export const undo = () => ({
  type: 'UNDO'
});
 
export const gotoState = stateIndex => ({
  type: 'GOTO',
  stateIndex
});
export default {
  remove, BLOCKS_REMOVE,
  clear, BLOCKS_CLEAR
};