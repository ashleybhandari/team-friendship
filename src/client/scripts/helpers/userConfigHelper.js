export function getProfileFields(page = null) {
    const fields = [
        { id: 'firstNameInput',        prop1: 'name',      prop2: 'fname'    },
        { id: 'nicknameInput',         prop1: 'name',      prop2: 'nname'    },
        { id: 'ageInput',              prop1: 'age'                          },
        { id: 'pronounsInput',         prop1: 'gender',    prop2: 'pronouns' },
        { id: 'majorInput',            prop1: 'education', prop2: 'major'    },
        { id: 'schoolInput',           prop1: 'education', prop2: 'school'   },
        { id: 'tellUsAboutYourArea',   prop1: 'description'                  },
        { id: 'facebookInput',         prop1: 'socials',   prop2: 'fb'       },
        { id: 'instagramInput',        prop1: 'socials',   prop2: 'ig'       },
        { id: 'cleanlinessSldr',       prop1: 'character', prop2: 'clean'    },
        { id: 'sleepingHabitsSldr',    prop1: 'character', prop2: 'sleep'    },
        { id: 'noiseWhenStudyiSldr',   prop1: 'character', prop2: 'noise'    },
        { id: 'hostingGuestsSldr',     prop1: 'character', prop2: 'guests'   },
        { id: 'genderIdentityDrpdwn',  prop1: 'gender',    prop2: 'identity' },
        { id: 'levelOfEducatioDrpdwn', prop1: 'education', prop2: 'level'    },
        { id: 'periodDrpdwn',          prop1: 'rent',      prop2: 'period'   },
        { id: 'genderInclusiviDrpdwn', prop1: 'gender'                       },
        { id: 'moveInPeriodDrpdwn',    prop1: 'timeframe'                    },
        { id: 'leaseLengthDrpdwn',     prop1: 'leaseLength'                  },
        { id: 'leaseTypeDrpdwn',       prop1: 'leaseType'                    },
        { id: 'roomTypeDrpdwn',        prop1: 'roomType'                     },
        { id: 'buildingTypeDrpdwn',    prop1: 'buildingType'                 }
    ];

    fields.forEach((field) =>
        field.id = page ? `${page}_${field.id}` : `${field.id}`
    );

    return fields;
}

export function getHousingFields(page = null) {
    const fields = [
        { id: 'cityInput',          prop1: 'city'                           },
        { id: 'rentForRoomInput',   prop1: 'rent',      prop2: 'price'      },
        { id: 'noBedsInput',        prop1: 'beds'                           },
        { id: 'noBathsInput',       prop1: 'baths'                          },
        { id: 'detailsArea',        prop1: 'notes'                          },
        { id: 'electricityBox',     prop1: 'utilities', prop2: 'electric'   },
        { id: 'gasBox',             prop1: 'utilities', prop2: 'gas'        },
        { id: 'waterBox',           prop1: 'utilities', prop2: 'water'      },
        { id: 'trashBox',           prop1: 'utilities', prop2: 'trash'      },
        { id: 'sewerBox',           prop1: 'utilities', prop2: 'sewer'      },
        { id: 'internetBox',        prop1: 'utilities', prop2: 'internet'   },
        { id: 'snowRemovalBox',     prop1: 'utilities', prop2: 'snow'       },
        { id: 'airConditioningBox', prop1: 'amenities', prop2: 'aircon'     },
        { id: 'dishwasherBox',      prop1: 'amenities', prop2: 'dishwasher' },
        { id: 'hardwoodFloorsBox',  prop1: 'amenities', prop2: 'hardwood'   },
        { id: 'carpetFloorsBox',    prop1: 'amenities', prop2: 'carpet'     },
        { id: 'onSiteLaundryBox',   prop1: 'amenities', prop2: 'laundry'    },
        { id: 'residentialParkBox', prop1: 'amenities', prop2: 'parking'    },
        { id: 'nearbyBusStopBox',   prop1: 'amenities', prop2: 'bus'        },
        { id: 'petFriendlyBox',     prop1: 'amenities', prop2: 'pets'       }
    ];

    fields.forEach((field) =>
        field.id = page ? `${page}_${field.id}` : `${field.id}`
    );

    return fields;
}

export function getPreferencesFields(page = null) {
    const fields = [
        {
            id: 'citiesCommaSepaInput',
            prop1: 'cities',
            fill: (v) => v.join(', '),
            save: (v) => v.split(', ')
        },
        { id: 'minRentInput', prop1: 'rent', prop2: 'min' },
        { id: 'maxRentInput', prop1: 'rent', prop2: 'max' },
        { id: 'minOccupantsInput', prop1: 'occupants', prop2: 'min' },
        { id: 'maxOccupantsInput', prop1: 'occupants', prop2: 'max' },
        { id: 'allFemaleBox', prop1: 'gender', prop2: 'female' },
        { id: 'allMaleBox', prop1: 'gender', prop2: 'male' },
        { id: 'mixedBox', prop1: 'gender', prop2: 'mixed' },
        { id: 'fallBox', prop1: 'timeframe', prop2: 'fall' },
        { id: 'winterBox', prop1: 'timeframe', prop2: 'winter' },
        { id: 'springBox', prop1: 'timeframe', prop2: 'spring' },
        { id: 'summerBox', prop1: 'timeframe', prop2: 'summer' },
        { id: 'perSemesterBox', prop1: 'leaseLength', prop2: 'semester' },
        { id: 'monthlyBox', prop1: 'leaseLength', prop2: 'month' },
        { id: 'MonthsBox', prop1: 'leaseLength', prop2: 'halfYear' },
        { id: 'yearlyBox', prop1: 'leaseLength', prop2: 'year' },
        { id: 'rentBox', prop1: 'leaseType', prop2: 'rent' },
        { id: 'subletBox', prop1: 'leaseType', prop2: 'sublet' },
        { id: 'privateBox', prop1: 'roomType', prop2: 'private' },
        { id: 'sharedBox', prop1: 'roomType', prop2: 'shared' },
    ];

    fields.forEach((field) =>
        field.id = page ? `${page}_${field.id}` : `${field.id}`
    );

    return fields;
}