import { User} from './DataStructures.js';
import PouchDB from 'pouchdb';
import PouchDBAuthentication from 'pouchdb-authentication';

PouchDB.plugin(PouchDBAuthentication);

const db = new PouchDB('http://localhost:5984/mydb');

function login(username, password) {
  db.logIn(username, password)
    .then(response => {
      console.log('Logged in successfully');
      //TODO: Switch the window to the logged in page
    })
    .catch(err => {
      console.error('Login failed:', err);
    });
}
