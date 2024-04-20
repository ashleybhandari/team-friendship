import { users } from './Data.js';

// TODO: PouchDB stuff, data mocking

// temp
async function getUsers() {
    return users;
}

// temp
async function getUser(id) {
    for (const user of await getUsers()) {
        if (user.id === id) {
            return user;
        }
    }
    return null;
}

// temp
async function getMatches() {
    const noHousing = users.filter((u) => !u.hasHousing);
    const haveHousing = users.filter((u) => u.hasHousing);
    return noHousing.map((u) => u.id);
}

export { getUsers, getUser, getMatches };