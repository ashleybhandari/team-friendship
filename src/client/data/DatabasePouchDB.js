// DB TODO: uncomment
//const PouchDB = require('pouchdb');
const db = new PouchDB('roommate-matching');

const getAllUsers = async () => {
  return db.allDocs({ include_docs: true })
    .then(result => result.rows.map(row => row.doc));
}

const getUserById = async (id) => {
  return db.get(id);
}

const addUser = async (user) => {
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

const updateUser = async (user) => {
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

const deleteUser = async (id) => {
  return db.get(id)
    .then(doc => db.remove(doc));
}

const getMatches = async (id) => {
  const user = await getUserById(id);
  return user.matches;
}

const removeMatches = async (currUserId, removeUserId) => {
  const user = await getUserById(currUserId);
  const removeUserIndex = user.matches.indexOf(removeUserId);
  user.matches.splice(removeUserIndex, 1);
  await updateUser(user);
}

const deleteMatch = async (id, matchId) => {} // TODO

const getAllHousings = async () => {
  return db.allDocs({ include_docs: true, startkey: 'housing_' })
    .then(result => result.rows.map(row => row.doc));
}

const getHousingById = async (id) => {
  return db.get(`housing_${id}`);
}

const addHousing = async (housing) => {
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

const updateHousing = async (housing) => {
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

const deleteHousing = async (id) => {
  return db.get(`housing_${id}`)
    .then(doc => db.remove(doc));
}

const authenticateUser = async (email, password) => {
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

export { getAllUsers, getUserById, addUser, updateUser, deleteUser, getMatches, removeMatches, deleteMatch, getAllHousings, getHousingById, addHousing, updateHousing, deleteHousing, authenticateUser };
