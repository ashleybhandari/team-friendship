class User {
    /**
     * Constructor: This contains an object with all user info for their
     * housing information. Parameters in brackets are optional.
     * @param {number} id
     * @param {string} email
     * @param {string} pic - Profile picture
     * @param {Object} name
     *   @param {string} name.fname - First name
     *   @param {string} [name.lname] - Last name
     *   @param {string} [name.nname] - Nickname
     * @param {number} age
     * @param {Object} gender
     *   @param {string} gender.identity - "male", "female", "nb"
     *   @param {string} [gender.pronouns]
     * @param {Object} characteristics
     *   @param {number} characteristics.clean - Cleanliness slider value (1-3) 
     *   @param {number} characteristics.sleep - Sleeping habits slider value (1-3)
     *   @param {number} characteristics.noise - Noise when studying slider value (1-3)
     *   @param {number} characteristics.guests - Hosting guests slider value (1-3)
     * @param {Object} school
     *   @param {string} [school.major]
     *   @param {string} [school.level] - Undergrad/Grad/Other
     * @param {Object} socials
     *   @param {string} [socials.fb] - Facebook
     *   @param {string} [socials.ig] - Instagram
     * @param {string} [description] - User-inputted description
     * @param {Preferences} [preferences] - if user does not have housing
     * @param {Housing} [housing] - if user has housing
     */
    constructor(id, email, pic, name, age, gender, characteristics, school,
        socials, description, preferences, housing
    ) {
        this.id = id;
        this.email = email;
        this.pic = pic;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.characteristics = characteristics;
        this.school = school;
        this.socials = socials;
        this.description = description;
        this.preferences = preferences;
        this.housing = housing;
    }
}

class Preferences {
    /**
     * Describes the preferences of users who don't have housing. For
     * multi-select's, must select at least 1 unless otherwise stated.
     * Parameters in brackets are optional.
     * @param {string[]} [cities]
     * @param {Object} rent - Budget range
     *   @param {number} [rent.min]
     *   @param {number} [rent.max]
     * @param {Object} occupants - Number of people in the accommodation
     *   @param {number} [occupants.min]
     *   @param {number} [occupants.max]
     * @param {Object} gender - Gender-inclusivity of the accommodation (multi-select)
     *   @param {boolean} gender.female - All-female
     *   @param {boolean} gender.male - All-male
     *   @param {boolean} gender.mixed - Mixed
     * @param {Object} leaseLength - Multi-select
     *   @param {boolean} leaseLength.semester
     *   @param {boolean} leaseLength.month
     *   @param {boolean} leaseLength.halfYear
     *   @param {boolean} leaseLength.year
     * @param {Object} leaseType - Multi-select
     *   @param {boolean} leaseType.rent
     *   @param {boolean} leaseType.sublet
     * @param {Object} roomType - Room type (multi-select)
     *   @param {boolean} roomType.private
     *   @param {boolean} roomType.shared
     * @param {Object} buildingType - Building type (multi-select)
     *   @param {boolean} buildingType.dorm
     *   @param {boolean} buildingType.apt
     *   @param {boolean} buildingType.house
     * @param {Object} timeframe - Move-in period (multi-select)
     *   @param {boolean} timeframe.fall
     *   @param {boolean} timeframe.winter
     *   @param {boolean} timeframe.spring
     *   @param {boolean} timeframe.summer
     * @param {Object} amenities - Housing amenities (multi-select, can select none)
     *   @param {boolean} amenities.aircon - Air conditioning
     *   @param {boolean} amenities.dishwasher
     *   @param {boolean} amenities.hardwood
     *   @param {boolean} amenities.carpet
     *   @param {boolean} amenities.laundry
     *   @param {boolean} amenities.parking
     *   @param {boolean} amenities.bus
     *   @param {boolean} amenities.pets
     */
    constructor(cities, rent, occupants, gender, leaseLength, leaseType,
        roomType, buildingType, timeframe, amenities
    ) {
        this.cities = cities;
        this.rent = rent;
        this.occupants = occupants;
        this.gender = gender;
        this.leaseLength = leaseLength;
        this.leaseType = leaseType;
        this.roomType = roomType;
        this.buildingType = buildingType;
        this.timeframe = timeframe;
        this.amenities = amenities;
    }
}

class Housing {
    /**
     * Describes a housing accommodation. Parameters in brackets are optional.
     * @param {string} city 
     * @param {Object} rent
     *   @param {number} price
     *   @param {string} period - "semester", "month", "year"
     * @param {number} beds
     * @param {number} baths
     * @param {string} gender - Gender inclusivity: "female", "male", "mixed"
     * @param {Object} utilities - Utilities included in rent (multi-select)
     *   @param {boolean} utilities.electric
     *   @param {boolean} utilities.gas
     *   @param {boolean} utilities.water
     *   @param {boolean} utilities.trash
     *   @param {boolean} utilities.sewer
     *   @param {boolean} utilities.internet
     *   @param {boolean} utilities.snow
     * @param {string} leaseLength - "semester", "month", "halfYear", "year"
     * @param {string} leaseType - "rent", "sublet"
     * @param {string} roomType - "private", "shared"
     * @param {string} buildingType - "dorm", "apt", "house"
     * @param {string} timeframe - Move-in period: "fall", "winter", "spring", "summer"
     * @param {Object} amenities - Housing amenities (multi-select, can select none)
     *   @param {boolean} amenities.aircon - Air conditioning
     *   @param {boolean} amenities.dishwasher
     *   @param {boolean} amenities.hardwood
     *   @param {boolean} amenities.carpet
     *   @param {boolean} amenities.laundry
     *   @param {boolean} amenities.parking
     *   @param {boolean} amenities.bus
     *   @param {boolean} amenities.pets
     * @param {string[]} pics
     * @param {string} [notes] - User-inputted notes
     */
    constructor(city, rent, beds, baths, gender, utilities, leaseLength,
        leaseType, roomType, buildingType, timeframe, amenities, pics, notes
    ) {
        this.city = city;
        this.rent = rent;
        this.beds = beds;
        this.baths = baths;
        this.gender = gender;
        this.utilities = utilities;
        this.leaseLength = leaseLength;
        this.leaseType = leaseType;
        this.roomType = roomType;
        this.buildingType = buildingType;
        this.timeframe = timeframe;
        this.amenities = amenities;
        this.pics = pics;
        this.notes = notes;
    }
}

export { User, Preferences, Housing };