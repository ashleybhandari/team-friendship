// DB TODO: uncomment
const PouchDB = require("pouchdb");
PouchDB.plugin(require('pouchdb-authentication'));

PouchDB.plugin(PouchDBAuthentication);

const db = new PouchDB('http://localhost:5984/mydb');

export function login(email, password, onSuccess, onFailure) {
  db.logIn(email, password)
    .then(response => {
      console.log('Logged in successfully');
      onSuccess();
    })
    .catch(err => {
      console.error('Login failed:', err);
      onFailure();
    });
}
