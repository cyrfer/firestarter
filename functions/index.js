const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.app = functions.https.onRequest(require('./lib/app'));
