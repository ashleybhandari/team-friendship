import { users } from '../data/MockData.js';

const db = new PouchDB('roommate-matching');

/**
 * Generates an id for a PouchDB doc.
 * 
 * @returns {string} - id
 */
function generateRandomId() {
  return 'user_' + Math.random().toString(36).substring(2, 10);
}

/**
 * Initializes DB with mock users.
 */
export const init = async () => {
  const info = await db.info();

  // only initialize if DB is empty
  if (info.doc_count > 0) return;

  // add mock users
  for (const user of users) {
    try {
      await addUser(user);
    } catch (error) {
      console.log(`Failed to add ${user._id} to the DB: ${error.message}`);
    }
  }

  // add cur_user
  try {
    await db.put({ _id: 'cur_user', userId: null });
  } catch (error) {
    console.log('Failed to add cur_user to the DB.');
  }
}

/**
 * Sets cur_user to currently signed-in user.
 * 
 * @param {string | null} userId - id of signed in user
 */
export const setCurUser = async (userId) => {
  try {
    const doc = await db.get('cur_user');
    doc.userId = userId;
    await db.put(doc);
  } catch (error) {
    console.log(`Could not set cur_user to ${userId}: ${error.message}.`);
  }
}

/**
 * Gets currently signed-in user.
 * 
 * @returns {Promise<Object | null>}
 */
export const getCurUser = async () => {
  try {
    return await db.get('cur_user');
  } catch (error) {
    console.log(`Could not get cur_user: ${error.message}.`);
    return null;
  }
}

/**
 * Fetches all users from the database.
 *
 * @returns {Promise<User[]>} A promise that resolves with an array of user objects.
 */
export const getAllUsers = async () => {
  return db.allDocs({ include_docs: true })
    .then(result => result.rows
      .map(row => row.doc)
      .filter((doc) => doc._id.startsWith('user_'))
    );
}

/**
 * Fetches a user by their ID from the database.
 *
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<User>} A promise that resolves with a user object or null if the user is not found.
 */
export const getUserById = async (id) => {
  return db.get(id);
}

/**
 * Adds a new user to the database.
 *
 * @param {User} user - The user object to add.
 * @returns {Promise<User>} A promise that resolves with the added user.
 */
export const addUser = async (user) => {
  const newUser = {
    _id:         user._id ? user._id : generateRandomId(),
    email:       user.email,
    avatar:      user.avatar,
    name:        user.name,
    age:         user.age,
    gender:      user.gender,
    character:   user.character,
    education:   user.education,
    socials:     user.socials,
    description: user.description,
    hasHousing:  user.hasHousing,
    preferences: user.preferences,
    housing:     user.housing,
    liked:       user.liked,
    rejected:    user.rejected,
    matches:     user.matches
  };

  return db.put(newUser);
};

/**
 * Updates an existing user in the database.
 *
 * @param {User} user - The updated user object.
 * @returns {Promise<User>} A promise that resolves with the updated user object.
 */
export const updateUser = async (user) => {
  const updatedUser = {
    _id:         user._id,
    _rev:        user._rev, // Include the _rev property for updates
    email:       user.email,
    avatar:      user.avatar,
    name:        user.name,
    age:         user.age,
    gender:      user.gender,
    character:   user.character,
    education:   user.education,
    socials:     user.socials,
    description: user.description,
    hasHousing:  user.hasHousing,
    preferences: user.preferences,
    housing:     user.housing,
    liked:       user.liked,
    rejected:    user.rejected,
    matches:     user.matches
  };

  return db.put(updatedUser);
}

/**
 * Deletes a doc from the database by its ID.
 *
 * @param {string} id - The ID of the doc to delete.
 * @returns {Promise<Object>} A promise that resolves with the deleted doc or null if the doc was not found.
 */
export const deleteItem = async (id) => {
  return db
    .get(id)
    .then(doc => db.remove(doc));
}

/**
 * Adds a user to curUser's rejected list.
 * 
 * @param {string} curUserId - The ID of the current user.
 * @param {string} rejectedId - The ID of the rejected user.
 */
export const addRejected = async (curUserId, rejectedId) => {
  const user = await getUserById(curUserId);
  user.rejected.push(rejectedId);
  await updateUser(user);
}

/**
 * Adds a user to curUser's liked list (or matches if they've also been liked).
 * 
 * @param {string} curUserId - The ID of the current user.
 * @param {string} likedId - The ID of the liked user.
 * @returns {Promise<boolean>} Whether curUser matched with liked user.
 */
export const addLiked = async (curUserId, likedId) => {
  const curUser = await getUserById(curUserId);
  const likedUser = await getUserById(likedId);
  let match = false;

  if (likedUser.liked.includes(curUserId)) {
    await addMatch(curUserId, likedId);
    match = true;
  }
  else {
    curUser.liked.push(likedId);
    await updateUser(curUser);
  }

  return match;
}

/**
 * Adds a match between two users.
 * 
 * @param {string} curUserId - The ID of the current user.
 * @param {string} matchId - The ID of the matched user.
 */
const addMatch = async (curUserId, matchId) => {
  const curUser = await getUserById(curUserId);
  const match = await getUserById(matchId);

  // remove from liked
  const curUserIndex = match.liked.indexOf(curUserId);
  match.liked.splice(curUserIndex, 1);

  // add to matches
  curUser.matches.push(matchId);
  match.matches.push(curUserId);

  await updateUser(curUser);
  await updateUser(match);
}

/**
 * Removes a match between two users.
 *
 * @param {string} curUserId - The ID of the current user.
 * @param {string} matchId - The ID of the user to unmatch.
 */
export const removeMatch = async (curUserId, matchId) => {
  const curUser = await getUserById(curUserId);
  const match = await getUserById(matchId);

  // for both users, remove from matches and add to rejected
  const matchIndex = curUser.matches.indexOf(matchId);
  curUser.matches.splice(matchIndex, 1);
  curUser.rejected.push(matchId);

  const curUserIndex = match.matches.indexOf(curUserId);
  match.matches.splice(curUserIndex, 1);
  match.rejected.push(curUserId);

  await updateUser(curUser);
  await updateUser(match);
}

/**
 * Fetches all matches for a user.
 *
 * @param {string} id - The ID of the user.
 * @returns {Promise<number[]>} A promise that resolves with an array of match IDs.
 */
export const getMatches = async (id) => {
  const user = await getUserById(id);
  return user.matches;
}

/**
 * Authenticates a user by their email and password.
 *
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @returns {Promise<Object>} A promise that resolves with the authenticated user object.
 * @throws {Error} If the email or password is invalid.
 */
export const authenticateUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    db.logIn(email, password, (error, response) => {
      if (error) {
        console.error('Login failure', error);
        reject(new Error('Invalid username or password'));
      } else {
        console.log('Login success');
        resolve(response);
      }
    });
  });
}
