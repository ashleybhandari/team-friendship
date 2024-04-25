// DB TODO: delete when PouchDB works
import { users } from './MockData.js';

async function getUsers() {
    return users;
}

async function getUser(id) {
    for (const user of await getUsers()) {
        if (user.id === id) {
            return user;
        }
    }
    return null;
}

async function getMatches(id) {
    const user = await getUser(id);
    return user.matches;
}

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