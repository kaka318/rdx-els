import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app';
// import History from './components/History'
import { reducers, initialState } from './reducers/index';
const store = createStore(
  reducers,
  initialState
);

ReactDOM.render((
  <Provider store={store}>
    <div className='w-full h-full'>
	  <App />
    </div>
  </Provider>
), document.getElementById('root'));
