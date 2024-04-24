/**
 * @typedef {Object} Field - contains information about possible values an input field may take
 * @property {string[]} fields - values as displayed in the UI
 * @property {string[]} [domValue] - values as coded by the DOM (only needed for Dropdown components)
 * @property {string[]} dataProps - values as stored in User/Preferences/Housing
 * Each possible value for the field is at a specific index in each array. That
 * is, for any i, fields[i] corresponds to domValue[i] and dataProps[i].
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
            fields: ['Woman', 'Man', 'Nonbinary'],
            domValue: ['woman', 'man', 'nonbinary'],
            dataProps: ['woman', 'man', 'nonbinary']
        }
    ],
    [
        'level', // User.education.level
        {
            fields: ['Undergrad', 'Grad', 'Other'],
            domValue: ['undergrad', 'grad', 'other'],
            dataProps: ['undergrad', 'grad', 'other']
        }
    ],
    [
        'rentPeriod', // Housing.rent.period
        {
            fields: ['Semester', 'Month', 'Year'],
            domValue: ['semester', 'month', 'year'],
            dataProps: ['semester', 'month', 'year']
        }
    ],
    [
        'genderIncl', // Housing.gender
        {
            fields: ['All-female', 'All-male', 'Mixed'],
            domValue: ['allFemale', 'allMale', 'mixed'],
            dataProps: ['female', 'male', 'mixed']
        }
    ],
    [
        'leaseLength', // Housing.leaseLength
        {
            fields:   ['Per semester', 'Monthly', 'Six months', 'Yearly'],
            domValue: ['perSemester', 'monthly', 'sixMonths', 'yearly'],
            dataProps: ['perSemester', 'monthly', 'halfYear', 'yearly']
        }
    ],
    [
        'leaseType', // Housing.leaseType
        {
            fields: ['Rent', 'Sublet'],
            domValue: ['rent', 'sublet'],
            dataProps: ['rent', 'sublet']
        }
    ],
    [
        'roomType', { // Housing.roomType
            fields: ['Private', 'Shared'],
            domValue: ['private', 'shared'],
            dataProps: ['private', 'shared']
        }
    ],
    [
        'buildingType', // Housing.buildingType
        {
            fields:   ['Dorm', 'Apartment', 'House'],
            domValue: ['dorm', 'apartment', 'house'],
            dataProps: ['dorm', 'apt', 'house']
        }
    ],
    [
        'timeframe', // Housing.timeframe
            {
            fields: ['Fall', 'Winter', 'Spring', 'Summer'],
            domValue: ['fall', 'winter', 'spring', 'summer'],
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
for (const [field, props] of data) {
    fields[field] = props.fields;
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

/**
 * Given a value as stored in a User/Preferences/Housing object, returns its
 * corresponding value as stored in the DOM. Intended to be used to fill
 * Dropdown elements.
 * @param {string} prop - Object property value
 * @returns {string | null} - DOM value associated with prop
 */
function getFieldFromProp(prop) {
    for (const [field, props] of data) {
        const i = props.dataProps.indexOf(prop);
        if (i >= 0) return props.domValue[i];
    }
    return null;
}

/**
 * Given the value of an HTML option element, returns its corresponding value
 * as stored in a User/Preferences/Housing object. Intended to be used to save
 * a Dropdown element's current value.
 * @param {string} value - Value of HTML option element
 * @returns {string | null} - Object property value associated with value
 */
function getPropFromDomValue(value) {
    for (const [field, props] of data) {
        const i = props.domValue.indexOf(value);
        if (i >= 0) return props.dataProps[i];
    }
    return null;
}

export { fields, toMap, getFieldFromProp, getPropFromDomValue };