/**
 * Created by Ashley Bhandari
 * This file contains helpers for SettingsView, UserProfile, UserHousing, and
 * UserPreferences.
 */

/**
 * @typedef {Object} Field - contains information about possible values an input field may take
 * @property {string[]} fields - values as displayed in the UI
 * @property {string[]} dataProps - values as stored in User/Preferences/Housing
 * Each possible value for the field is at a specific index in each array. That
 * is, for any i, fields[i] corresponds to dataProps[i].
 */

/**
 * Map to keep selectable values in Dropdown and CheckboxGroup components
 * consistent. Each key represents an input field, and its corresponding value
 * is an object containing information about the possible values the field may
 * take.
 * @type {Map<string, Field>}
 */
const data = new Map([
    [
        'genderId', // User.gender.identity
        {
            fields:    ['Woman', 'Man', 'Nonbinary'],
            dataProps: ['woman', 'man', 'nonbinary']
        }
    ],
    [
        'level', // User.education.level
        {
            fields:    ['Undergrad', 'Grad', 'Other'],
            dataProps: ['undergrad', 'grad', 'other']
        }
    ],
    [
        'rentPeriod', // Housing.rent.period
        {
            fields:    ['Semester', 'Month', 'Year'],
            dataProps: ['semester', 'month', 'year']
        }
    ],
    [
        'genderIncl', // Housing.gender
        {
            fields:    ['All-female', 'All-male', 'Mixed'],
            dataProps: ['allFemale', 'allMale', 'mixed']
        }
    ],
    [
        'leaseLength', // Housing.leaseLength
        {
            fields:    ['Per semester', 'Monthly', 'Six months', 'Yearly'],
            dataProps: ['perSemester', 'monthly', 'sixMonths', 'yearly']
        }
    ],
    [
        'leaseType', // Housing.leaseType
        {
            fields:    ['Rent', 'Sublet'],
            dataProps: ['rent', 'sublet']
        }
    ],
    [
        'roomType', { // Housing.roomType
            fields:    ['Private', 'Shared'],
            dataProps: ['private', 'shared']
        }
    ],
    [
        'buildingType', // Housing.buildingType
        {
            fields:    ['Dorm', 'Apartment', 'House'],
            dataProps: ['dorm', 'apartment', 'house']
        }
    ],
    [
        'timeframe', // Housing.timeframe
            {
            fields:    ['Fall', 'Winter', 'Spring', 'Summer'],
            dataProps: ['fall', 'winter', 'spring', 'summer']
        }
    ],
    [
        'amenities', // Preferences.amenities, Housing.amenities
        {
            fields: [
                'Air conditioning',
                'Dishwasher',
                'Hardwood floors',
                'Carpet floors',
                'On-site laundry',
                'Residential parking',
                'Nearby bus stop',
                'Pet-friendly'
            ],
            dataProps: [
                'aircon',
                'dishwasher',
                'hardwood',
                'carpet',
                'laundry',
                'parking',
                'bus',
                'pets'
            ]
        }
    ],
    [
        'utilities', // Housing.utilities
        {
            fields: [
                'Electricity',
                'Gas',
                'Water',
                'Trash',
                'Sewer',
                'Internet',
                'Snow removal'
            ],
            dataProps: [
                'electric',
                'gas',
                'water',
                'trash',
                'sewer',
                'internet',
                'snow'
            ]
        }
    ]
]);

/**
 * Object to store the fields property of data. Each key represents an input
 * field, and its corresponding value represents the possible values the field
 * may take as displayed in the UI.
 * @type {Object.<string, string>}
 */
const fields = {};
for (const [name, props] of data) {
    fields[name] = props.fields;
}

/**
 * Turns an array of strings into a Map object. Intended to be used in
 * conjunction with fields to initialize a CheckboxGroup element.
 * @param {string[]} arr
 * @returns {Map<string>}
 */
function toMap(arr) {
    return new Map(arr.map((e) => [e]));
}

export { data, fields, toMap };