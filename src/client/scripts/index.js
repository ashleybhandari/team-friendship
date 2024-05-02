import { App } from './App.js';
export var db = new PouchDB('my_database');

// Mount the application to the root element.
const app = new App();
await app.render('root');
