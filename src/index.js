import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root';

const store = createStore(
    reducer, 
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
      )
)

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
)

registerServiceWorker();
