// DB TODO: delete when PouchDB works
import { users } from './MockData.js';

/**
 * Returns all users in MockData.js
 * @returns {User[]}
 */
async function getUsers() {
    return users;
}

/**
 * Returns the user with the specified id
 * @param {string} id - User id
 * @returns {User} - User associated with id
 */
async function getUser(id) {
    for (const user of await getUsers()) {
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
async function getMatches(id) {
    const user = await getUser(id);
    return user.matches;
}

/**
 * Removes the match associated with matchId from the user's match list
 * @param {string} userId - User id
 * @param {string} matchId - Match's id
 */
async function removeMatch(userId, matchId) {
    const curUser = await getUser(userId);
    for (const user of await getUsers()) {
        if (user.id === matchId) {
            const i = curUser.matches.indexOf(matchId);
            curUser.matches.splice(i, 1);
        }
    }
}

export { users, getUsers, getUser, getMatches, removeMatch };