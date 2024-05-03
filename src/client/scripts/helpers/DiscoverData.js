// created by Ashley Bhandari
import { data } from './SettingsData.js';

/**
 * This file consists of maps used to display data elegantly on the Discover
 * page. Keys are strings as saved in the database, and values are strings
 * as they should be displayed in the Discover page UI.
 */

/**
 * Given the name of a key in data, an array of 2-element arrays: each element
 * represents a possible value that a field may take. It first index is the
 * value as saved in the database, and the second is the value as it should be
 * displayed on the Discover page. Intended to be used in the constructor for
 * a new Map object.
 * @param {string} propName - name of property as saved in the database
 * @returns {string[][]}
 */
function getIterable(propName) {
    const prop = data.get(propName);
    return prop.fields.map((field, i) => [prop.dataProps[i], field]);
}

/**
 * Maps User.education.level properties to their proper names
 * @type {Map<string, string>}
 */
const levelMap = new Map([
    ['undergrad', 'Undergraduate'],
    ['grad', 'Graduate']
]);

/**
 * Maps User.character properties to their proper names. The value of the
 * slider (used in account creation and settings) corresponds with indices in
 * the map value.
 * @type {Map<string, string[]>}
 */
const characterMap = new Map([
    ['clean', ['not clean', 'moderately clean', 'very clean']],
    ['sleep', ['early bird', 'mixed sleeping habits', 'night owl']],
    ['noise', ['very quiet', 'some noise', 'noise is okay']],
    ['guests', ['never hosts', 'sometimes hosts', 'frequently hosts']]
]);

/**
 * Maps User.housing properties to their proper names
 * @type {Map<string, string>}
 */
const houseMap = new Map([
    ['perSemester', 'Semester-long'],
    ['monthly', '1-month'],
    ['halfYear', '6-month'],
    ['yearly', '1-year'],
    ['female', 'All-female'],
    ['male', 'All-male'],
    ['mixed', 'Mixed gender'],
    ...getIterable('timeframe'),
    ...getIterable('roomType'),
    ...getIterable('buildingType'),
    ...getIterable('amenities'),
    ...getIterable('utilities')
]);

export { levelMap, characterMap, houseMap };