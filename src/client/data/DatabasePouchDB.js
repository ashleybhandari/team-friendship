import PouchDB from 'pouchdb';

const db = new PouchDB('roommate-matching');

const dataService = {
  getAllUsers: () => {
    return db.allDocs({ include_docs: true })
      .then(result => result.rows.map(row => row.doc));
  },

  getUserById: (id) => {
    return db.get(id);
  },

  addUser: (user) => {
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

  updateUser: (user) => {
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

  deleteUser: (id) => {
    return db.get(id)
      .then(doc => db.remove(doc));
  },
};

export default dataService;
