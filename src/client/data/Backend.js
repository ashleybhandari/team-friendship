// DB TODO: Delete when DatabasePouchDB works
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

async function getMatches() {
    const noHousing = users.filter((u) => !u.hasHousing);
    const haveHousing = users.filter((u) => u.hasHousing);
    return noHousing.map((u) => u.id);
}

export { getUsers, getUser, getMatches };