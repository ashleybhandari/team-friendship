/**
 * This file has functions to mock backend functionality. It's in use while
 * PouchDB doesn't work.
 */

// DB TODO: delete when PouchDB works
import { users } from './MockData.js';

export async function getCurrentUser() {
    return users[0];
}

/**
 * Returns all users in MockData.js
 * @returns {User[]}
 */
export async function getAllUsers() {
    return users;
}

/**
 * Returns the user with the specified id
 * @param {string} id - User id
 * @returns {User} - User associated with id
 */
export async function getUserById(id) {
    for (const user of await getAllUsers()) {
        if (user.id === id) {
            return user;
        }
    }
    return null;
}

/**
 * Returns the specified user's matches
 * @param {string} id - User id
 * @returns {number[]} - Array of user id's
 */
export async function getMatches(id) {
    const user = await getUserById(id);
    return user.matches;
}

/**
 * Removes the match associated with matchId from the user's match list
 * @param {string} userId - User id
 * @param {string} matchId - Match's id
 */
export async function removeMatch(userId, matchId) {
    const curUser = await getUserById(userId);
    for (const user of await getAllUsers()) {
        if (user.id === matchId) {
            const i = curUser.matches.indexOf(matchId);
            curUser.matches.splice(i, 1);
        }
    }
}
