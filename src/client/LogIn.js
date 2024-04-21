import dataService from './dataService.js';

async function login(email, password) {
  try {
    const user = await dataService.authenticateUser(email, password);
    console.log('Authentication successful:', user);
   //TODO: Change the window
  } catch (error) {
    console.error('Authentication failed:', error.message);
  }
}
