/**
 * Created by Ashley Bhandari
 * Given a string, removes its non-alphanumeric characters and converts it to
 * camel case. Used for creating the id of an HTML element from the element's
 * value.
 * @param {string} str The string to be converted into camel case
 * @param {string} [suffix=""] A string to be appended to the converted string
 * @returns {string} Returns str in camel case, appended with suffix
 */
export function createElementId(str, suffix = '') {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, c) => c.toUpperCase())
        .replace(/\W/g, '')
        .slice(0, 15)
        + suffix;
}