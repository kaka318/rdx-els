import {createStore} from 'redux'
import Reducer from '../reducers/boxDown_reducer'
import stateHistory from '../reducers/stateHistory'
let store = createStore(Reducer)
// console.log(store.)
export default store