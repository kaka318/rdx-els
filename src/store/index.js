import {createStore} from 'redux'
import boxReducer from '../reducers/boxDown_reducer'
import stateHistory from '../reducers/stateHistory'
let store = createStore(boxReducer)
export default store