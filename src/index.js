import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import appReducer from './reducers'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker';

// TODO: follow recipe for async api calls using redux-thunk, passing data via React "Context"?
let store = createStore(appReducer, window.__PRELOADED_STATE__)

// TODO: follow recipe for ReactRouterv4 integration
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
// registerServiceWorker();
