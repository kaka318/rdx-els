export const boxInitialState = {
    score: 0,
    x: -1,
    y: 3,
    nextArr: new Array(4).fill(new Array(4).fill(0)),
    arr: new Array(20).fill(new Array(10).fill(0)),
    squareArr: new Array(4).fill(new Array(4).fill(0)),
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
