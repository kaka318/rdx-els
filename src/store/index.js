import {createStore} from 'redux'
import {reducers} from '../reducers/index'
import stateHistory from '../reducers/stateHistory'
let store = createStore(reducers);
export default store