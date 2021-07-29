// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import App from './components/app';
// import 'antd/dist/antd.min.css';
// import store from './store/index';
// // import { reducers, initialState } from './reducers/index';
// // import Game from './components/game';
// ReactDOM.render((
//   <Provider store={store}>
//     <div className='w-full h-full'>
// 	  <App />
//     </div>
//   </Provider>
// ), document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './components/app';

import 'antd/dist/antd.min.css';
import { reducers, boxInitialState } from './reducers/index';
// import Game from './components/game';
const store = createStore(
  reducers,
  boxInitialState
);
ReactDOM.render((
  <Provider store={store}>
    <div className='w-full h-full'>
	  <App />
    </div>
  </Provider>
), document.getElementById('root'));
