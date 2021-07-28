export const boxInitialState = {
    x: -1,
    y: 3,
};
export function boxReducer(state = boxInitialState, action) {
    const x = state.x;
    const y = state.y;
    switch (action.type) {
        case 83:
            return { ...state, x: x + 1 }
        case 65:
            return { ...state, y: y - 1 }
        case 68:
            return { ...state, y: y + 1 }
        case 'downinit':
            return { ...state, x: -1, y: 3 }
        case 'down':
            return { ...state, x: x + 1 }
        case 'keycol':
            return state;
        default:
            return state
    }
}
