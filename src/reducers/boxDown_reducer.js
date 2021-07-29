import stateHistory from './stateHistory'
import {boxInitialState} from './index'
// export default 
export default function(state = boxInitialState, action){
    let {type,payload} = action
    switch (type) {
        case 'keycol':
            return {...state,x:payload.x,y:payload.y};
        case 'changeCount':
            return {...state,collisionCount:payload.collisionCount};
        case 'changetype':
            return {...state,type:payload.type};
        case 'changebeforetype':
            return {...state,beforeType:payload.pretype};
        default:
            return state;

    }
}
