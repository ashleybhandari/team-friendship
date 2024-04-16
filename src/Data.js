// User data structure
class User {
  constructor(id, name, preferences) {
    this.id = id;
    this.name = name;
    this.preferences = preferences;
  }
}

// Housing listing data structure
class HousingListing {
  constructor(id, address, price, amenities, photos) {
    this.id = id;
    this.address = address;
    this.price = price;
  }
}

// Users mock data
const users = [
  new User(1, 'Jamie', { gender: 'female', budget: 800, affiliation: Student }),
  new User(2, 'Charles', { gender: 'male', budget: 1000, cleanliness: clean }),
  new User(3, 'Linda', {gender: 'nonbinary', budget: 1500, affiliation: Student})
];

// Housing mock data
const housingListings = [
  new HousingListing(1, '123 Main St', 900, {"in-unit washer and dyer"},{}),
  new HousingListing(2, '456 Elm St', 1100, {"tennis courts"}, {})
];
