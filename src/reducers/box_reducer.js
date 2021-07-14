import BoxActionCreator from '../actions/box_action_creator';

export const boxInitialState = {
  blocks: []
};

export default function(state = boxInitialState, action){
  switch(action.type){
    case BoxActionCreator.BLOCKS_REMOVE:
      return {
        ...state,
        blocks: []
      };
    case BoxActionCreator.BLOCKS_CLEAR:
      return {
        ...state,
        blocks: []
      };
    default:
      return state;
  }
}
