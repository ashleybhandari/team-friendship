// created by Ashley Bhandari

export class Preferences {
    /**
     * Data structure: Describes the preferences of users who don't have
     * housing. For multi-select's, must select at least 1 unless otherwise
     * stated. Parameters in brackets are optional.
     * @param {string[]} [cities]
     * @param {Object} rent - Budget range
     *   @param {number} [rent.min]
     *   @param {number} [rent.max]
     * @param {Object} occupants - Number of people in the accommodation
     *   @param {number} [occupants.min]
     *   @param {number} [occupants.max]
     * @param {Object} gender - Gender-inclusivity of the accommodation (multi-select)
     *   @param {boolean} [gender.female] - All-female
     *   @param {boolean} [gender.male] - All-male
     *   @param {boolean} [gender.mixed] - Mixed
     * @param {Object} leaseLength - Multi-select
     *   @param {boolean} [leaseLength.semester]
     *   @param {boolean} [leaseLength.month]
     *   @param {boolean} [leaseLength.halfYear]
     *   @param {boolean} [leaseLength.year]
     * @param {Object} leaseType - Multi-select
     *   @param {boolean} [leaseType.rent]
     *   @param {boolean} [leaseType.sublet]
     * @param {Object} roomType - Room type (multi-select)
     *   @param {boolean} [roomType.private]
     *   @param {boolean} [roomType.shared]
     * @param {Object} buildingType - Building type (multi-select)
     *   @param {boolean} [buildingType.dorm]
     *   @param {boolean} [buildingType.apt]
     *   @param {boolean} [buildingType.house]
     * @param {Object} timeframe - Move-in period (multi-select)
     *   @param {boolean} [timeframe.fall]
     *   @param {boolean} [timeframe.winter]
     *   @param {boolean} [timeframe.spring]
     *   @param {boolean} [timeframe.summer]
     * @param {Object} amenities - Housing amenities (multi-select, can select none)
     *   @param {boolean} [amenities.aircon] - Air conditioning
     *   @param {boolean} [amenities.dishwasher]
     *   @param {boolean} [amenities.hardwood]
     *   @param {boolean} [amenities.carpet]
     *   @param {boolean} [amenities.laundry]
     *   @param {boolean} [amenities.parking]
     *   @param {boolean} [amenities.bus]
     *   @param {boolean} [amenities.pets]
     */
    constructor(cities, rent, occupants, gender, leaseLength, leaseType,
        roomType, buildingType, timeframe, amenities
    ) {
        this.cities       = cities       ? cities       : [];
        this.rent         = rent         ? rent         : {};
        this.occupants    = occupants    ? occupants    : {};
        this.gender       = gender       ? gender       : {};
        this.leaseLength  = leaseLength  ? leaseLength  : {};
        this.leaseType    = leaseType    ? leaseType    : {};
        this.roomType     = roomType     ? roomType     : {};
        this.buildingType = buildingType ? buildingType : {};
        this.timeframe    = timeframe    ? timeframe    : {};
        this.amenities    = amenities    ? amenities    : {};
    }
}