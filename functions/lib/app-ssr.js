'use strict';

const React = require('react');
const redux = require('redux');
// TODO: ES5 must use `.Provider` ?
const Provider = require('react-redux').Provider;
const reactDom = require('react-dom/server');
const page = require('./page');

exports.handleRender = function (styles, appReducer, App) {
    return function (req, res) {
        // Create a new Redux store instance
        const store = redux.createStore(appReducer);

        // Render the component to a string
        const html = reactDom.renderToString(
            React.createElement(
                Provider,
                { store: store },
                React.createElement(App, null)
            )
        // <Provider store={store}>
        //     <App />
        // </Provider>
        );

        // Grab the initial state from our Redux store
        const preloadedState = store.getState();

        // Send the rendered page back to the client
        res.send(page.renderFullPage(styles, html, preloadedState));
    };
};
