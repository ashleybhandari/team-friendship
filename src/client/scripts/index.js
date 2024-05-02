import { App } from './App.js';
const PouchDB = require('pouchdb');
// Function to create and return a PouchDB instance
function createDB(dbName) {
    return new PouchDB(dbName);
}

module.exports = { createDB };


// Mount the application to the root element.
const app = new App();
await app.render('root');
