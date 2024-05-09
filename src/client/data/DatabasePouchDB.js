
// DB TODO: uncomment
//import PouchDB from "pouchdb";
//var PouchDB = require('pouchdb');
//var db = new PouchDB('my_database');
//import PouchDB from 'pouchdb';
//import db from './index.js';

//import PouchDB from "pouchdb";
const db = new PouchDB("roommate-matching");

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
 * @returns {string} - The id of the new user.
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

// /**
//  * Fetches all housings from the database.
//  *
//  * @returns {Promise} A promise that resolves with an array of housing objects.
//  */
// export const getAllHousings = async () => {
//   return db.allDocs({ include_docs: true, startkey: 'housing_' })
//     .then(result => result.rows.map(row => row.doc));
// }

// /**
//  * Fetches a housing by its ID from the database.
//  *
//  * @param {string} id - The ID of the housing to fetch.
//  * @returns {Promise} A promise that resolves with a housing object or null if the housing is not found.
//  */
// export const getHousingById = async (id) => {
//   return db.get(`housing_${id}`);
// }

// /**
//  * Adds a new housing to the database.
//  *
//  * @param {object} housing - The housing object to add.
//  * @returns {Promise} A promise that resolves with the added housing object.
//  */
// export const updateHousing = async (housing) => {
//   const updatedHousing = {
//     _id: `housing_${housing.id}`,
//     _rev: housing._rev, // Include the _rev property for updates
//     city: housing.city,
//     rent: housing.rent,
//     beds: housing.beds,
//     baths: housing.baths,
//     gender: housing.gender,
//     utilities: housing.utilities,
//     leaseLength: housing.leaseLength,
//     leaseType: housing.leaseType,
//     roomType: housing.roomType,
//     buildingType: housing.buildingType,
//     timeframe: housing.timeframe,
//     amenities: housing.amenities,
//     pics: housing.pics,
//     notes: housing.notes
//   };

//   return db.put(updatedHousing);
// }

// export const deleteHousing = async (id) => {
//   return db.get(`housing_${id}`)
//     .then(doc => db.remove(doc));
// }

// export async function loadAllUsers() {
//   const result = await db.allDocs({ include_docs: true });
//   return result.rows.map((row) => row.doc);
// }