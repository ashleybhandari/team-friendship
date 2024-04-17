export function createElementId(str, suffix = '') {
    return str
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (match, c) => c.toUpperCase())
        .replace(/\W/g, '')
        .slice(0, 15)
        + suffix;
}