import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker';

// TODO: follow recipe for async api calls using redux-thunk, passing data via React "Context"?
let store = createStore(todoApp, window.STATE_FROM_SERVER)

// TODO: follow recipe for ReactRouterv4 integration
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
