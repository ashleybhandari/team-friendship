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
 * Fetches all users from the database.
 *
 * @returns {Promise<User[]>} A promise that resolves with an array of user objects.
 */
export const getAllUsers = async () => {
  return db.allDocs({ include_docs: true })
    .then(result => result.rows.map(row => row.doc));
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
    _id: user._id ? user._id : generateRandomId(),
    email: user.email,
    avatar: user.avatar,
    name: user.name,
    age: user.age,
    gender: user.gender,
    character: user.character,
    education: user.education,
    socials: user.socials,
    description: user.description,
    hasHousing: user.hasHousing,
    preferences: user.preferences,
    housing: user.housing,
    liked: user.liked,
    rejected: user.rejected,
    matches: user.matches
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
    _id: user._id,
    _rev: user._rev, // Include the _rev property for updates
    email: user.email,
    avatar: user.avatar,
    name: user.name,
    age: user.age,
    gender: user.gender,
    character: user.character,
    education: user.education,
    socials: user.socials,
    description: user.description,
    hasHousing: user.hasHousing,
    preferences: user.preferences,
    housing: user.housing,
    liked: user.liked,
    rejected: user.rejected,
    matches: user.matches
  };

  return db.put(updatedUser);
}

/**
 * Deletes a user from the database by their ID.
 *
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<User>} A promise that resolves with the deleted user object or null if the user is not found.
 */
export const deleteUser = async (id) => {
  return db.get(id)
    .then(doc => db.remove(doc));
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
 * Removes a match between two users.
 *
 * @param {string} curUserId - The ID of the current user.
 * @param {string} matchId - The ID of the user to unmatch.
 */
export const removeMatch = async (curUserId, matchId) => {
  const curUser = await getUserById(curUserId);
  const match = await getUserById(matchId);

  const matchIndex = user.matches.indexOf(matchId);
  curUser.matches.splice(matchIndex, 1);

  const curUserIndex = match.matches.indexOf(curUserId);
  match.matches.splice(curUserIndex, 1);

  await updateUser(curUser);
  await updateUser(match);
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
  try {
    const user = await db.get(`user_${email}`);
    if (user.password === password) {
      return user;
    } else {
      throw new Error('Invalid username or password');
    }
  } catch (error) {
    if (error.status === 404) {
      throw new Error('Invalid username or password');
    } else {
      throw error;
    }
  }
}