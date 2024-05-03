// created by Rachel Lahav and Ashley Bhandari

export class Housing {
    /**
     * Data structure: Describes a housing accommodation. Parameters in
     * brackets are optional.
     * @param {string} city 
     * @param {Object} rent
     *   @param {number} rent.price
     *   @param {string} rent.period - "semester", "month", "year"
     * @param {number} beds
     * @param {number} baths
     * @param {string} gender - Gender inclusivity: "allFemale", "allMale", "mixed"
     * @param {Object} utilities - Utilities included in rent (multi-select)
     *   @param {boolean} utilities.electric
     *   @param {boolean} utilities.gas
     *   @param {boolean} utilities.water
     *   @param {boolean} utilities.trash
     *   @param {boolean} utilities.sewer
     *   @param {boolean} utilities.internet
     *   @param {boolean} utilities.snow
     * @param {string} leaseLength - "perSemester", "monthly", "halfYear", "yearly"
     * @param {string} leaseType - "rent", "sublet"
     * @param {string} roomType - "private", "shared"
     * @param {string} buildingType - "dorm", "apartment", "house"
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