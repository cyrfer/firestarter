'use strict';

const React = require('react');
const redux = require('redux');
// TODO: ES5 must use `.Provider` ?
const Provider = require('react-redux').Provider;
const reactDom = require('react-dom/server');

exports.handleRender = function (appReducer, App, renderTemplateFn, context) {
    return function (req, res) {
        // Create a new Redux store instance
        const store = redux.createStore(appReducer);

        // Render the component to a string
        context.html = reactDom.renderToString(
            React.createElement(
                Provider,
                { store: store },
                React.createElement(App, null)
            ));

        // Grab the initial state from our Redux store
        context.preloadedState = store.getState();

        // Send the rendered page back to the client
        res.send(renderTemplateFn(context));
    };
};
