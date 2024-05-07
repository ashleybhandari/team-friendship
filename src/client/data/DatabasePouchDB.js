// Created by Rachel Lahav and Gauri Arvind
// Note: the functions listed have been modified to catch errors.
// For now, errors are console.error but a 500 error can be sent instead
// Currently, the database has different tables for housing, user, and preferences.

// DB TODO: uncomment
//import PouchDB from "pouchdb";
//var PouchDB = require('pouchdb');
//var db = new PouchDB('my_database');
//import PouchDB from 'pouchdb';
//import db from './index.js';

//import PouchDB from "pouchdb";
const db = new PouchDB("roommate-matching");


/**
 * Fetches all users from the database.
 *
 * @returns {Promise} A promise that resolves with an array of user objects.
 */
export const getAllUsers = async () => {
  return db.allDocs({ include_docs: true })
    .then(result => result.rows.map(row => row.doc)).catch((error) => 
    console.error(error));
}

/**
 * Fetches a user by their ID from the database.
 *
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise} A promise that resolves with a user object or null if the user is not found.
 */
export const getUserById = async (id) => {
  return db.get(id);
}

/**
 * Adds a new user to the database.
 *
 * @param {object} user - The user object to add.
 * @returns {Promise} A promise that resolves with the added user object.
 */
export const addUser = async (user) => {
  const newUser = {
    // Only include _id if user.id is present and truthy
     _id: user.id || generateRandomId(),
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

function generateRandomId() {
  return 'user_' + Math.random().toString(36).substring(2, 10);
}

/**
 * Updates an existing user in the database.
 *
 * @param {object} user - The updated user object.
 * @returns {Promise} A promise that resolves with the updated user object.
 */
export const updateUser = async (user) => {
  const updatedUser = {
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

  //   if (user.id) {
  //   newUser._id = user.id;
  // }
  
  };
  return db.put(updatedUser);
};

/**
 * Deletes a user from the database by their ID.
 *
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise} A promise that resolves with the deleted user object or null if the user is not found.
 */
export const deleteUser = async (id) => {
  return db.get(id)
    .then(doc => db.remove(doc));
}

/**
 * Fetches all matches for a user.
 *
 * @param {string} id - The ID of the user.
 * @returns {Promise} A promise that resolves with an array of match IDs.
 */
export const getMatches = async (id) => {
    const user = await getUserById(id);
    return user.matches;
}

/**
 * Adds a match to a user.
 * TODO: find where to add function (probably in DiscoverView)
 * 
 * @param {string} currUserId  - the ID of the current user.
 * @param {string} addUserId - the ID of the user to add to the user's matched list
 */
export const addMatch = async (currUserId, addUserId) => {
  const user = await getUserById(currUserId);
  user.matches.push(addUserId);
  await updateUser(user);
}

/**
 * Removes a match between two users.
 *
 * @param {string} currUserId - The ID of the current user.
 * @param {string} removeUserId - The ID of the user to remove as a match.
 * @returns {Promise} A promise that resolves with the updated user object.
 */
export const removeMatch = async (currUserId, removeUserId) => {
    const user = await getUserById(currUserId);
    const removeUserIndex = user.matches.indexOf(removeUserId);
    user.matches.splice(removeUserIndex, 1);
    await updateUser(user);
}

/**
 * Fetches all housings from the database.
 *
 * @returns {Promise} A promise that resolves with an array of housing objects.
 */
export const getAllHousings = async () => {
  return db.allDocs({ include_docs: true, startkey: 'housing_' })
    .then(result => result.rows.map(row => row.doc));
}

/**
 * Fetches a housing by its ID from the database.
 *
 * @param {string} id - The ID of the housing to fetch.
 * @returns {Promise} A promise that resolves with a housing object or null if the housing is not found.
 */
export const getHousingById = async (id) => {
  return db.get(`housing_${id}`);
}

/**
 * Adds a new housing to the database.
 *
 * @param {object} housing - The housing object to add.
 * @returns {Promise} A promise that resolves with the added housing object.
 */
export const updateHousing = async (housing) => {
  const updatedHousing = {
    _id: `housing_${housing.id}`,
    _rev: housing._rev, // Include the _rev property for updates
    city: housing.city,
    rent: housing.rent,
    beds: housing.beds,
    baths: housing.baths,
    gender: housing.gender,
    utilities: housing.utilities,
    leaseLength: housing.leaseLength,
    leaseType: housing.leaseType,
    roomType: housing.roomType,
    buildingType: housing.buildingType,
    timeframe: housing.timeframe,
    amenities: housing.amenities,
    pics: housing.pics,
    notes: housing.notes
  };

  return db.put(updatedHousing);
}

/**
 * Deletes a user's housing information.
 * @param {int} id - the user's unique id
 * @returns {Promise} - confirmation that housing information was deleted or not via a promise
 */
export const deleteHousing = async (id) => {
  return db.get(`housing_${id}`)
    .then(doc => db.remove(doc));
}

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
