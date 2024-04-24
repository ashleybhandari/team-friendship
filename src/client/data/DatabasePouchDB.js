// DB TODO: uncomment
//const PouchDB = require('pouchdb');
const db = new PouchDB('roommate-matching');

export const getAllUsers = async () => {
  return db.allDocs({ include_docs: true })
    .then(result => result.rows.map(row => row.doc));
}

export const getUserById = async (id) => {
  return db.get(id);
}

export const addUser = async (user) => {
  const newUser = {
    _id: user.id, // Use the user's id as the document _id
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
}

export const updateUser = async (user) => {
  const updatedUser = {
    _id: user.id,
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

export const deleteUser = async (id) => {
  return db.get(id)
    .then(doc => db.remove(doc));
}

export const getMatches = async (id) => {
  const user = await getUserById(id);
  return user.matches;
}

export const removeMatch = async (currUserId, removeUserId) => {
  const user = await getUserById(currUserId);
  const removeUserIndex = user.matches.indexOf(removeUserId);
  user.matches.splice(removeUserIndex, 1);
  await updateUser(user);
}

export const getAllHousings = async () => {
  return db.allDocs({ include_docs: true, startkey: 'housing_' })
    .then(result => result.rows.map(row => row.doc));
}

export const getHousingById = async (id) => {
  return db.get(`housing_${id}`);
}

export const addHousing = async (housing) => {
  const newHousing = {
    _id: `housing_${housing.id}`, // Use a prefix to distinguish housing documents
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

  return db.put(newHousing);
}

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
