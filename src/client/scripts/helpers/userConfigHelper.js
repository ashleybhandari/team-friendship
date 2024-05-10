/**
 * Removes non-numeric characters from a string, and returns the resulting int
 * @param {string} num 
 * @returns {number}
 */
function saveInt(num) {
    return num === '' ? null : parseInt(num.replace(/[^\d.-]+/g, ''));
}

/**
 * Removes non-numeric characters from a string, and returns the resulting float
 * @param {string} num 
 * @returns {number}
 */
function saveFloat(num) {
    return num === '' ? null : parseFloat(num.replace(/[^\d.-]+/g, ''));
}

/**
 * Returns an array of all fields in the Profile section; each field object
 * contains the field's id and associated properties in the User data structure.
 * @param {string} [page] - String with which ids in the object will be prepended
 * @returns {Object[]} - Array of fields
 */
export function getProfileFields(page = null) {
    const fields = [
        { id: 'firstNameInput',        prop1: 'name',      prop2: 'fname'    },
        { id: 'nicknameInput',         prop1: 'name',      prop2: 'nname'    },
        { id: 'ageInput',              prop1: 'age'                          },
        { id: 'pronounsInput',         prop1: 'gender',    prop2: 'pronouns' },
        { id: 'majorInput',            prop1: 'education', prop2: 'major'    },
        { id: 'schoolInput',           prop1: 'education', prop2: 'school'   },
        { id: 'writeAShortBioArea',    prop1: 'description'                  },
        { id: 'facebookInput',         prop1: 'socials',   prop2: 'fb'       },
        { id: 'instagramInput',        prop1: 'socials',   prop2: 'ig'       },
        { id: 'cleanlinessSldr',       prop1: 'character', prop2: 'clean'    },
        { id: 'sleepingHabitsSldr',    prop1: 'character', prop2: 'sleep'    },
        { id: 'noiseWhenStudyiSldr',   prop1: 'character', prop2: 'noise'    },
        { id: 'hostingGuestsSldr',     prop1: 'character', prop2: 'guests'   },
        { id: 'genderIdentityDrpdwn',  prop1: 'gender',    prop2: 'identity' },
        { id: 'levelOfEducatioDrpdwn', prop1: 'education', prop2: 'level'    }
    ];

    // prepend id's if necessary
    fields.forEach((field) =>
        field.id = page ? `${page}_${field.id}` : `${field.id}`
    );

    return fields;
}

/**
 * Fills fields in the Profile section.
 * @param {HTMLDivElement} container - Container holding profile fields
 * @param {User} user - User instance whose data being used
 * @param {string} [page] - Page with which ids are prepended
 */
export function fillProfileFields(container, user, page = null) {
    getProfileFields(page).forEach(({ id, prop1, prop2 }) => {
        const elm = container.querySelector('#' + id);
        // value saved in user
        const value = prop2 ? user[prop1][prop2] : user[prop1];

        elm.value = value ? value : '';
    });
}

/**
 * Saves fields in the Profile section.
 * @param {HTMLDivElement} container - Container holding profile fields
 * @param {User} user - User instance to which values will be saved
 * @param {string} [page] - Page with which ids are prepended
 */
export function saveProfileFields(container, user, page = null) {
    getProfileFields(page).forEach(({ id, prop1, prop2 }) => {
        const elm = container.querySelector('#' + id);

        if (prop2) user[prop1][prop2] = elm.value;
        else       user[prop1] = elm.value;
    });
}

/**
 * Returns an array of all fields in the Housing section; each field object
 * contains the field's id, associated properties in the Housing data
 * structure, and a "save" function to transform the data before saving it to
 * the DB (if necessary).
 * @param {string} [page] - String with which ids in the object will be prepended
 * @returns {Object[]} - Array of fields
 */
export function getHousingFields(page = null) {
    const fields = [
        { 
            id: 'rentForRoomInput',
            prop1: 'rent',
            prop2: 'price',
            save: saveFloat
        },
        { id: 'cityInput',             prop1: 'city'                           },
        { id: 'noBedsInput',           prop1: 'beds',      save: saveFloat     },
        { id: 'noBathsInput',          prop1: 'baths',     save: saveFloat     },
        { id: 'detailsArea',           prop1: 'notes'                          },
        { id: 'electricityBox',        prop1: 'utilities', prop2: 'electric'   },
        { id: 'gasBox',                prop1: 'utilities', prop2: 'gas'        },
        { id: 'waterBox',              prop1: 'utilities', prop2: 'water'      },
        { id: 'trashBox',              prop1: 'utilities', prop2: 'trash'      },
        { id: 'sewerBox',              prop1: 'utilities', prop2: 'sewer'      },
        { id: 'internetBox',           prop1: 'utilities', prop2: 'internet'   },
        { id: 'snowRemovalBox',        prop1: 'utilities', prop2: 'snow'       },
        { id: 'airConditioningBox',    prop1: 'amenities', prop2: 'aircon'     },
        { id: 'dishwasherBox',         prop1: 'amenities', prop2: 'dishwasher' },
        { id: 'hardwoodFloorsBox',     prop1: 'amenities', prop2: 'hardwood'   },
        { id: 'carpetFloorsBox',       prop1: 'amenities', prop2: 'carpet'     },
        { id: 'onSiteLaundryBox',      prop1: 'amenities', prop2: 'laundry'    },
        { id: 'residentialParkBox',    prop1: 'amenities', prop2: 'parking'    },
        { id: 'nearbyBusStopBox',      prop1: 'amenities', prop2: 'bus'        },
        { id: 'petFriendlyBox',        prop1: 'amenities', prop2: 'pets'       },
        { id: 'periodDrpdwn',          prop1: 'rent',      prop2: 'period'     },
        { id: 'genderInclusiviDrpdwn', prop1: 'gender'                         },
        { id: 'moveInPeriodDrpdwn',    prop1: 'timeframe'                      },
        { id: 'leaseLengthDrpdwn',     prop1: 'leaseLength'                    },
        { id: 'leaseTypeDrpdwn',       prop1: 'leaseType'                      },
        { id: 'roomTypeDrpdwn',        prop1: 'roomType'                       },
        { id: 'buildingTypeDrpdwn',    prop1: 'buildingType'                   }
    ];

    // prepend id's if necessary
    fields.forEach((field) =>
        field.id = page ? `${page}_${field.id}` : `${field.id}`
    );

    return fields;
}

/**
 * Fills fields in the Housing section.
 * @param {HTMLDivElement} container - Container holding housing fields
 * @param {User} user - User instance whose data being used
 * @param {string} [page] - Page with which ids are prepended
 */
export function fillHousingFields(container, user, page = null) {
    getHousingFields(page).forEach(({ id, prop1, prop2 }) => {
        const elm = container.querySelector('#' + id);
        // the way it's filled changes depending on if elm is a checkbox
        const prop = id.endsWith('Box') ? 'checked' : 'value';
        // value saved in user.housing
        const value = prop2 ? user.housing[prop1][prop2] : user.housing[prop1];

        elm[prop] = value ? value : '';
    });
}

/**
 * Saves fields in the Housing section.
 * @param {HTMLDivElement} container - Container holding housing fields
 * @param {User} user - User instance to which values will be saved
 * @param {string} [page] - Page with which ids are prepended
 */
export function saveHousingFields(container, user, page = null) {
    getHousingFields(page).forEach(({ id, prop1, prop2, save }) => {
        const elm = container.querySelector('#' + id);
        let value;

        // value to save depends on whether elm is a checkbox and if a save
        // function is available
        if (id.endsWith('Box')) value = elm.checked;
        else if (save)          value = save(elm.value);
        else                    value = elm.value;

        if (prop2) user.housing[prop1][prop2] = value;
        else       user.housing[prop1] = value;
    });
}

/**
 * Returns an array of all fields in the Preferences section; each field object
 * contains the field's id, associated properties in the Preferences data
 * structure, and "fill/save" functions to transform the data before filling
 * the field or saving its value to the DB (if necessary).
 * @param {string} [page] - String with which ids in the object will be prepended
 * @returns {Object[]} - Array of fields
 */
export function getPreferencesFields(page = null) {
    const fields = [
        {
            id: 'citiesCommaSepaInput',
            prop1: 'cities',
            fill: (v) => v.join(', '),
            save: (v) => v.split(', ')
        },
        { id: 'minRentInput',       prop1: 'rent',         prop2: 'min', save: saveFloat },
        { id: 'maxRentInput',       prop1: 'rent',         prop2: 'max', save: saveFloat },
        { id: 'minOccupantsInput',  prop1: 'occupants',    prop2: 'min', save: saveInt   },
        { id: 'maxOccupantsInput',  prop1: 'occupants',    prop2: 'max', save: saveInt   },
        { id: 'allFemaleBox',       prop1: 'gender',       prop2: 'allFemale'     },
        { id: 'allMaleBox',         prop1: 'gender',       prop2: 'allMale'       },
        { id: 'mixedBox',           prop1: 'gender',       prop2: 'mixed'      },
        { id: 'fallBox',            prop1: 'timeframe',    prop2: 'fall'       },
        { id: 'winterBox',          prop1: 'timeframe',    prop2: 'winter'     },
        { id: 'springBox',          prop1: 'timeframe',    prop2: 'spring'     },
        { id: 'summerBox',          prop1: 'timeframe',    prop2: 'summer'     },
        { id: 'perSemesterBox',     prop1: 'leaseLength',  prop2: 'perSemester'},
        { id: 'monthlyBox',         prop1: 'leaseLength',  prop2: 'monthly'    },
        { id: 'sixMonthsBox',       prop1: 'leaseLength',  prop2: 'sixMonths'  },
        { id: 'yearlyBox',          prop1: 'leaseLength',  prop2: 'yearly'     },
        { id: 'rentBox',            prop1: 'leaseType',    prop2: 'rent'       },
        { id: 'subletBox',          prop1: 'leaseType',    prop2: 'sublet'     },
        { id: 'privateBox',         prop1: 'roomType',     prop2: 'private'    },
        { id: 'sharedBox',          prop1: 'roomType',     prop2: 'shared'     },
        { id: 'dormBox',            prop1: 'buildingType', prop2: 'dorm'       },
        { id: 'apartmentBox',       prop1: 'buildingType', prop2: 'apt'        },
        { id: 'houseBox',           prop1: 'buildingType', prop2: 'house'      },
        { id: 'airConditioningBox', prop1: 'amenities',    prop2: 'aircon'     },
        { id: 'dishwasherBox',      prop1: 'amenities',    prop2: 'dishwasher' },
        { id: 'hardwoodFloorsBox',  prop1: 'amenities',    prop2: 'hardwood'   },
        { id: 'carpetFloorsBox',    prop1: 'amenities',    prop2: 'carpet'     },
        { id: 'onSiteLaundryBox',   prop1: 'amenities',    prop2: 'laundry'    },
        { id: 'residentialParkBox', prop1: 'amenities',    prop2: 'parking'    },
        { id: 'nearbyBusStopBox',   prop1: 'amenities',    prop2: 'bus'        },
        { id: 'petFriendlyBox',     prop1: 'amenities',    prop2: 'pets'       }
    ];

    // prepend id's if necessary
    fields.forEach((field) =>
        field.id = page ? `${page}_${field.id}` : `${field.id}`
    );

    return fields;
}

/**
 * Fills fields in the Preferences section.
 * @param {HTMLDivElement} container - Container holding preferences fields
 * @param {User} user - User instance whose data being used
 * @param {string} [page] - Page with which ids are prepended
 */
export function fillPreferencesFields(container, user, page = null) {
    getPreferencesFields(page).forEach(({ id, prop1, prop2, fill }) => {
        const elm = container.querySelector('#' + id);
        // the way it's filled changes depending on if elm is a checkbox
        const prop = id.endsWith('Box') ? 'checked' : 'value';
        // value saved in user.preferences
        const value = prop2 
            ? user.preferences[prop1][prop2]
            : user.preferences[prop1];
        
        if (value) elm[prop] = fill ? fill(value) : value;
        else       elm[prop] = '';
        
    });
}

/**
 * Saves fields in the Preferences section.
 * @param {HTMLDivElement} container - Container holding preferences fields
 * @param {User} user - User instance to which values will be saved
 * @param {string} [page] - Page with which ids are prepended
 */
export function savePreferencesFields(container, user, page = null) {
    getPreferencesFields(page).forEach(({ id, prop1, prop2, save }) => {
        const elm = container.querySelector('#' + id);
        let value;

        // value to save depends on whether elm is a checkbox and if a save
        // function is available
        if (id.endsWith('Box')) value = elm.checked;
        else if (save)          value = save(elm.value);
        else                    value = elm.value;

        if (prop2) user.preferences[prop1][prop2] = value;
        else       user.preferences[prop1] = value;
    });
}