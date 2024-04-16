import { App } from './App.js';

// Mount the application to the root element.
const app = new App();
await app.render('root');

import { Header } from './Header.js';

document.addEventListener('DOMContentLoaded', () => {
  const header = new Header('team-friendship/assets/logo.png', 'KeyMate');
  document.body.insertBefore(header.render(), document.body.firstChild);
});
