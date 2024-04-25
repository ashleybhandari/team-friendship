// DB TODO: uncomment
//PouchDB.plugin(require('pouchdb-authentication'));
const db = new PouchDB('http://localhost:5984/mydb');

/**
 * Authenticates the user when they sign in.
 * @param {string} email 
 * @param {string} password 
 * @param {function[]} onSuccess - functions called when user successfully signs in
 * @param {function[]} onFailure  - functions called when user can't sign in
 */
export function login(email, password, onSuccess, onFailure) {
  onSuccess.forEach((fn) => fn()); // TODO delete
  db.logIn(email, password)
    .then(response => {
      console.log('Logged in successfully');
      onSuccess.forEach((fn) => fn());
    })
    .catch(err => {
      console.error('Login failed:', err);
      onFailure.forEach((fn) => fn());
    });
}
