import {boxInitialState} from './boxDown_reducer'
export function isCollision(state = boxInitialState,action){
    const x = state.x;
    switch(action.type){
        case 'collision':
            return {...state,}
    }
}