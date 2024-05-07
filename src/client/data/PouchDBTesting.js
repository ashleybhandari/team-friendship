import { users } from './MockData';
import * as db from '../../../data/DatabasePouchDB.js';
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
    user.id = user.id.toString();
    
    try {
        const res = await db.addUser(user);
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
    user.id = user.id.toString();
    user.email = "robert@gmail.com";

    try {
        const res = await db.updateUser(user);
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
    user.id = user.id.toString();
    const matchToRemove = 1; // match chosen from MockData.js

    try {
        const res = await db.removeMatch(user.id, matchToRemove);
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
    user.id = user.id.toString();
    try {
        const res = await db.deleteUser(user.id);
        console.log(res);
    }
    catch(error) {
        console.error(error);
    }
}

/**
 * Loads information about the current database. doc_count will show the number 
 * of undeleted records in the database and db_name will show the name 
 * of the database.
 */
async function getDBInfo() {
    const dbInfo = await db.info(); // note: dunno if info works...
    console.log(dbInfo);
}

export {
    testAddUser,
    testDeleteMatch,
    testRemoveMatch,
    testUpdateUser,
    getDBInfo
}