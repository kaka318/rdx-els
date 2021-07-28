import {createStore} from 'redux'
import rootReducer from '../reducers/index'
import stateHistory from '../reducers/stateHistory'
let store = createStore(rootReducer)
// console.log(store.)
export default store