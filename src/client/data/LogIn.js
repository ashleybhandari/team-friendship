// DB TODO: uncomment
import PouchDB from 'pouchdb';
import PouchDBAuthentication from 'pouchdb-authentication';

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
