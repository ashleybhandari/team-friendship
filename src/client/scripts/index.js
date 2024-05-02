import { App } from './App.js';
const PouchDB = require('pouchdb');

// Mount the application to the root element.
const app = new App();
await app.render('root');
