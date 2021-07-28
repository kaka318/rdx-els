export const boxInitialState = {
    x: -1,
    y: 3,
};
export default(state = boxInitialState, action)=> {
    const x = state.x;
    const y = state.y;
    let {type,payload} = action
    switch (type) {
        case 83:
            return { ...state, x: x + 1 }
        case 65:
            return { ...state, y: y - 1 }
        case 68:
            return { ...state, y: y + 1 }
        case 'downinit':
            return {x: -1, y: 3 }
        case 'down':
            return { ...state, x: x + 1 }
        case 'keycol':
            return {x:payload.x,y:payload.y};
        default:
            return state
    }
}
