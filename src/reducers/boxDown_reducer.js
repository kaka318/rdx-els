import stateHistory from './stateHistory'
export const boxInitialState = {
    x: -1,
    y: 3,
};
// export default 
export default function(state = boxInitialState, action){
    const x = state.x;
    let {type,payload} = action
    switch (type) {
        case 'downinit':
            return {x: -1, y: 3 }
        case 'down':
            return { ...state, x: x + 1 }
        case 'keycol':
            return {x:payload.x,y:payload.y};
        default:
            return state;
    }
}
