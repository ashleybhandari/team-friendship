import { User } from './data/data_structures/User.js';
import { addUser } from './databasepouchdb.js'; 


let users = [];


export const fetchUsersFromServer = async () => {
  try {
    const response = await fetch('/api/users'); 
    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }
    const usersData = await response.json();
    users = usersData.map(userData => new User(userData));
  } catch (error) {
    console.error('Error fetching users from server:', error);
  }
};

export const init = async () => {
  await fetchUsersFromServer();
  for (const user of users) {
    try {
      await addUser(user);
    } catch (error) {
      console.log('Failed to add user to the DB: ${error.message}');
    }
  }
};
