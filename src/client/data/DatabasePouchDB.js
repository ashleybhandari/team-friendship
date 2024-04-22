// DB TODO: getting errors, commenting out until can resolve

import PouchDB from 'pouchdb';

const db = new PouchDB('roommate-matching');

const dataService = {
  getAllUsers: async () => {
    return db.allDocs({ include_docs: true })
      .then(result => result.rows.map(row => row.doc));
  },

  getUserById: async (id) => {
    return db.get(id);
  },

  addUser: async (user) => {
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
  },

  updateUser: async (user) => {
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
  },

  deleteUser: async (id) => {
    return db.get(id)
      .then(doc => db.remove(doc));
  },

  getMatches: async (id) => {
    const user = user.getUserById(id);
    return user.matches;
  }, 

  removeMatches: async (currUserId, removeUserId) => {
    const user = user.getUserById(id);
    const removeUserIndex = user.matches.indexOf(removeUserId);
    user.matches = user.matches.splice(removeUserIndex, 1);
    updateUser(user);
  },

  getAllHousings: async () => {
    return db.allDocs({ include_docs: true, startkey: 'housing_' })
      .then(result => result.rows.map(row => row.doc));
  },

  getHousingById: async (id) => {
    return db.get(`housing_${id}`);
  },

  addHousing: async (housing) => {
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
  },

  updateHousing: async (housing) => {
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
  },

  deleteHousing: async (id) => {
    return db.get(`housing_${id}`)
      .then(doc => db.remove(doc));
  }
};

  getAllPreferences: async () => {
    return db.allDocs({ include_docs: true, startkey: 'preference_' })
      .then(result => result.rows.map(row => row.doc));
  };

  getPreferenceById: async (id) => {
    return db.get(`preference_${id}`);
  };

  addPreferences: async (preference) => {
    const newPreference = {
      _id: `preference_${preference.id}`,
      cities: preference.cities,
      rent: preference.rent,
      occupants: preference.occupants,
      gender: preference.gender,
      leaseLength: preference.leaseLength,
      leaseType: preference.leaseType,
      roomType: preference.roomType,
      buildingType: preference.buildingType,
      timeframe: preference.timeframe,
      amenities: preference.amenities,
    }

    return db.put(addPreferences);
  };

  updatePreferences: async (preference) => {
    const updatedPreferences = {
      _id: `preference_${preference.id}`,
      _rev: preference._rev,
      cities: preference.cities,
      rent: preference.rent,
      occupants: preference.occupants,
      gender: preference.gender,
      leaseLength: preference.leaseLength,
      leaseType: preference.leaseType,
      roomType: preference.roomType,
      buildingType: preference.buildingType,
      timeframe: preference.timeframe,
      amenities: preference.amenities,
  }
  
  return db.put(updatedPreferences);
};

deletePreference: async (id) => {
  return db.get(`preference_${id}`)
      .then(doc => db.remove(doc));
};

export default dataService;
