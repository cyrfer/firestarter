const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
// TODO: specify routes for API here
app.get('/*', require('./dist/app').default);
admin.initializeApp(functions.config().firebase);
exports.app = functions.https.onRequest(app);
