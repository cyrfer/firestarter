'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const ssr = require('./lib/app-ssr');
const page = require('./lib/page');
const path = require('path');
const fs = require('fs');
// TODO: learn how to authorize tokens from Firebase Auth
// const authorizationMiddleware = require('./lib/authorization');

admin.initializeApp(functions.config().firebase);

// -- byproducts of client source build
const manifest = require('./dist/asset-manifest.json');
const styles = fs.readFileSync(path.resolve(__dirname, './dist/' + path.basename(manifest['main.css'])), {encoding: 'utf8', flag: 'r'});
const appReducer = require('./dist/reducers').default; // imports for ES5 modules
const App = require('./dist/containers/App').default; // imports for ES5 modules

// specify routes for API here
app.use('/api/v1', require('./api/v1'));

// SSR
app.get('/*', ssr.handleRender(appReducer, App, page.renderFullPage, {
    styles: styles,
    bundleRoute: '/' + manifest['main.js']
}));

//app.post('/login', loginController);  // handled by Firebase Auth

exports.app = functions.https.onRequest(app);
