import { users, roommateMatches, housingMatches } from './Data.js';

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

async function getMatches() {
    return housingMatches;
}

export { getUsers, getUser, getMatches };