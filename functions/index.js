'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
const ssr = require('./lib/app-ssr');
const path = require('path');
const fs = require('fs');

// -- byproducts of build
const styles = fs.readFileSync(path.resolve(__dirname, './dist/style.css'), {encoding: 'utf8', flag: 'r'});
const appReducer = require('./dist/reducers').default;
const App = require('./dist/containers/App').default;

// TODO: specify routes for API here
app.get('/*', ssr.handleRender(styles, appReducer, App));
admin.initializeApp(functions.config().firebase);
exports.app = functions.https.onRequest(app);
