export const boxInitialState = {
    score: 0,
    x: -1,
    y: 3,
    nextArr: new Array(4).fill(new Array(4).fill(0)),
    arr: new Array(20).fill(new Array(10).fill(0)),
    squareArr: new Array(4).fill(new Array(4).fill(0)),
};
// export function downReducer(state = boxInitialState, action) {
//     const x = state.x;
//     // console.log(state.arr);
//     switch (action.type) {
//         case 'down':
//             return { ...state, x: x + 1 }
//         default:
//             return state
//     }
// }
// export function initDown(state = boxInitialState,action){
//     switch (action.type) {
//         case 'downinit':
//             return { ...state,x:-1,y:3 }
//         default:
//             return state
//     }
// }
export function boxReducer(state = boxInitialState, action) {
    const x = state.x;
    const y = state.y;
    switch (action.type) {
        case 83:
            //   console.log('down')
            return { ...state, x: x + 1 }
        case 65:
            // console.log(y)
            return { ...state, y: y - 1 }
        case 68:
            // console.log('right')
            return { ...state, y: y + 1 }
        case 'downinit':
            return { ...state, x: -1, y: 3 }
        case 'down':
            return { ...state, x: x + 1 }
        case 'keycol':
            return state;
        // case 'creatShape':
        //     return {...state,arr:}
        // case 'creatNext':
        //     return state
        default:
            return state
    }
}
