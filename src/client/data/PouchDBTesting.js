import {addUser, updateUser, removeMatch, deleteUser} from 'DatabasePouchDB.js';
import { users } from './MockData';
import { deleteUser } from './DatabasePouchDB';

/**
 * This module can be used to test and see if information can be sent, retrieved, 
 * updated, or deleted from PouchDB. 
 * 
 * This module can be modified to initialize users and test the module. 
 * 
 * I'm not too sure how to run this but this is what I have in mind right now - jest is an option
 * but I dunno. 
 */


/**
 * Tests the addUser functionality.
 */
async function testAddUser() {
    // Information of a user based on mock data
    const user = users[0];
    
    try {
        const res = await addUser(user);
        console.log(res);
    }
    catch(error) {
        console.error(error);
    }
}

/**
 * Tests the update user functionality.
 */
async function testUpdateUser() {
    const user = users[0];
    user.email = "robert@gmail.com";

    try {
        const res = await updateUser(user);
        console.log(res);
    }
    catch(error) {
        console.error(error);
    }
}

/**
 * Tests the remove match functionality.
 */
async function testRemoveMatch() {
    const user = users[0];
    const matchToRemove = 1; // match chosen from MockData.js

    try {
        const res = removeMatch(user.id, matchToRemove);
        console.log(res);
    }
    catch(error) {
        console.error(error);
    }
}

/**
 * Tests the delete user functionality.
 */
async function testDeleteMatch() {
    const user = users[0];
    try {
        const res = deleteUser(user.id);
        console.log(res);
    }
    catch(error) {
        console.error(error);
    }
}

export {
    testAddUser,
    testDeleteMatch,
    testRemoveMatch,
    testUpdateUser
}