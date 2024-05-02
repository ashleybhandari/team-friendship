import { App } from './App.js';
const PouchDB = require('pouchdb');
// Function to create and return a PouchDB instance
module.exports = db;


// Mount the application to the root element.
const app = new App();
await app.render('root');
