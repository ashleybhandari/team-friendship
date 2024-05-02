import { App } from './App.js';
const PouchDB = require('pouchdb');
const db = new PouchDB('my_database');

module.exports = db;

// Mount the application to the root element.
const app = new App();
await app.render('root');
