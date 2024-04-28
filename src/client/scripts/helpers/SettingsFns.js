// created by Ashley Bhandari

import { getFieldFromProp, getPropFromDomValue } from './settingsData.js';

/**
 * Class to create functions that fill and save fields on the Settings page.
 */
export class SettingsFns {
    #parent = null;
    #user = null;
    #prefs = null;
    #house = null;

    /**
     * @param {HTMLDivElement} parent - View holding the input fields
     * @param {User} user - Current user
     * @param {Preferences} prefs - Current user's housing preferences
     * @param {Housing} house - Current user's housing
     */
    constructor(parent, user) {
        this.#parent = parent;
        this.#user = user;
        this.#prefs = user.preferences;
        this.#house = user.housing;
        this.#changeFieldIds();
    }

    /**
     * @callback Fill - Fills a field with the object's saved value
     * @callback Save - Saves a field's current value to its associated object
     */

    /**
     * Array of Functions to fill and save fields. Each element is associated
     * with in input filed in the DOM.
     * @returns {{Fill, Save}[]}
     */
    getFns() {
        return [
            ...this.#getGeneralFns(),
            ...this.#getDropdownFns(),
            ...this.#getCheckboxFns()
        ];
    }

    getFields() {
        return [
            ...this.#getGeneralFields().map((e) => e[1]),
            ...this.#getDropdownFields().map((e) => e[1])
        ];
    }

    /**
     * Prepends all id's with "settings_" to avoid conflicts with other parts
     * of the application.
     */
    #changeFieldIds() {
        const fields = [
            ...this.#getGeneralFields(),
            ...this.#getDropdownFields(),
            ...this.#getCheckboxFields()
        ];

        fields.forEach((field) => {
            const elm = this.#parent.querySelector(`#${field[1]}`);
            const label = this.#parent.querySelector(`label[for="${field[1]}"]`);

            if (elm)   elm.id = `settings_${elm.id}`;
            if (label) label.htmlFor = elm.id;
        });
    }

    /**
     * Array of fill and save functions for TextInput and SliderInput fields.
     * @returns {{Fill, Save}[]}
     */
    #getGeneralFns() {
        const fns = [];

        /**
         * Iterate through all fields and adds their fill and save
         * functions to fns
         * @param {User | Preferences | Housing} obj - object containing the field's value
         * @param {string} id - id of the field's HTML element
         * @param {string[]} prop - property in obj with the field's value; array to handle nested properties
         * @param {function} [fillFn] - applies necessary changes before filling the field
         * @param {function} [saveFn] - applies necessary changes before saving the value
         */
        this.#getGeneralFields().forEach(([obj, id, prop, fillFn, saveFn]) => {
            // element containing the field
            const elm = this.#parent.querySelector(`#settings_${id}`);
            let value, fill, save;

            // skip if element DNE
            if (!elm) return;

            // if-else necessary to access obj's
            // props properly
            if (prop.length === 1) {      // ex. user.prop
                value = obj[prop[0]];
                fill = () => elm.value = fillFn ? fillFn(value) : value;
                save = () => obj[prop[0]] = saveFn ? saveFn(elm.value) : elm.value;
            }
            else { // ex. user.prop1.prop2
                value = obj[prop[0]][prop[1]];
                fill = () => elm.value = fillFn ? fillFn(value) : value;
                save = () => obj[prop[0]][prop[1]] = saveFn ? saveFn(elm.value) : elm.value;
            }
            
            // add functions to fn
            fns.push({ fill, save });
        });

        return fns;
    }

    /**
     * Array of fill and save functions for DropdownInput fields
     * @returns {{Fill, Save}[]}
     */
    #getDropdownFns() {
        const fns = [];

        this.#getDropdownFields().forEach(([obj, id, prop]) => {
            // elm containing the field
            const elm = this.#parent.querySelector(`#settings_${id}`)
            let value, fill, save;

            // skip if element DNE
            if (!elm) return;

            if (prop.length === 1) { // ex. user.prop
                value = obj[prop[0]];
                fill = () => elm.value = getFieldFromProp(value);
                save = () => obj[prop[0]] = getPropFromDomValue(elm.value);
            }
            else {                   // ex. user.prop1.prop2
                value = obj[prop[0]][prop[1]];
                fill = () => elm.value = getFieldFromProp(value);
                save = () => obj[prop[0]][prop[1]] = getPropFromDomValue(elm.value);
            }

            // add functions to fn
            fns.push({ fill, save });
        });

        return fns;
    }

    /**
     * Array of fill and save functions for CheckboxGroup fields
     * @returns {{Fill, Save}[]}
     */
    #getCheckboxFns() {
        const fns = [];

        /**
         * @param {User | Preferences | Housing} obj - object containing the field's value
         * @param {string} id - id of the field's HTML element
         * @param {string[]} prop - property in obj with the field's value; array to handle nested properties
         */
        this.#getCheckboxFields().forEach(([obj, id, prop]) => {
            // elm containing the field
            const elm = this.#parent.querySelector(`#settings_${id}`)
            
            // skip if element DNE
            if (!elm) return;

            // assuming 2 property levels, ex. user.prop1.prop2
            const fill = () => elm.checked = obj[prop[0]][prop[1]];
            const save = () => obj[prop[0]][prop[1]] = elm.checked;

            // add functions to fn
            fns.push({ fill, save });
        });

        return fns;
    }

    /**
     * Array of arguments to #getGeneralFns. Each element corresponds to an HTML
     * field.
     * @returns {[Object | string | string[] | function][]}
     */
    #getGeneralFields() {
        return [
            // Credentials section
            [this.#user, 'emailInput', ['email'] ],
            // TODO: implement password
            // Profile section
            [this.#user, 'firstNameInput', ['name', 'fname']],
            [this.#user, 'nicknameInput', ['name', 'nname']],
            [this.#user, 'ageInput', ['age']],
            [this.#user, 'pronounsInput', ['gender', 'pronouns']],
            [this.#user, 'majorInput', ['education', 'major']],
            [this.#user, 'schoolInput', ['education', 'school']],
            [this.#user, 'tellUsAboutYourArea', ['description']],
            [this.#user, 'facebookInput', ['socials', 'fb']],
            [this.#user, 'instagramInput', ['socials', 'ig']],
            [this.#user, 'cleanlinessSldr', ['character', 'clean']],
            [this.#user, 'noiseWhenStudyiSldr', ['character', 'noise']],
            [this.#user, 'sleepingHabitsSldr', ['character', 'sleep']],
            [this.#user, 'hostingGuestsSldr', ['character', 'guests']],
            // Preferences section
            [this.#prefs, 'citiesCommaSepaInput', ['cities'], (v) => v.join(', '), (v) => v.split(', ')],
            [this.#prefs, 'minRentInput', ['rent', 'min']],
            [this.#prefs, 'maxRentInput', ['rent', 'max']],
            [this.#prefs, 'minOccupantsInput', ['occupants', 'min']],
            [this.#prefs, 'maxOccupantsInput', ['occupants', 'max']],
            // Housing section
            [this.#house, 'cityInput', ['city']],
            [this.#house, 'rentForRoomInput', ['rent', 'price']],
            [this.#house, 'noBedsInput', ['beds']],
            [this.#house, 'noBathsInput', ['baths']],
            [this.#house, 'detailsArea', ['notes']],
        ];
    }

    /**
     * Array of arguments to #getDropdownFns. Each element corresponds to an
     * HTML field.
     * @returns {[Object | string | Map<string, string>][]}
     */
    #getDropdownFields() {
        return [
            // Profile section
            [this.#user, 'genderIdentityDrpdwn', ['gender', 'identity']],
            [this.#user, 'levelOfEducatioDrpdwn', ['education', 'level']],
            [this.#house, 'periodDrpdwn', ['rent', 'period']],
            [this.#house, 'genderInclusiviDrpdwn', ['gender']],
            [this.#house, 'moveInPeriodDrpdwn', ['timeframe']],
            [this.#house, 'leaseLengthDrpdwn', ['leaseLength']],
            [this.#house, 'leaseTypeDrpdwn', ['leaseType']],
            [this.#house, 'roomTypeDrpdwn', ['roomType']],
            [this.#house, 'buildingTypeDrpdwn', ['buildingType']],
        ];

    }

    /**
     * Array of arguments to #getCheckboxFns. Each element corresponds to an
     * HTML field.
     * @returns {[Object | string | string[] | function][]}
     */
    #getCheckboxFields() {
        return [
            // Preferences section
            // Gender inclusivity
            [this.#prefs, 'allFemaleBox', ['gender', 'female']],
            [this.#prefs, 'allMaleBox', ['gender', 'male']],
            [this.#prefs, 'mixedBox', ['gender', 'mixed']],
            // Move-in period
            [this.#prefs, 'fallBox', ['timeframe', 'fall']],
            [this.#prefs, 'winterBox', ['timeframe', 'winter']],
            [this.#prefs, 'springBox', ['timeframe', 'spring']],
            [this.#prefs, 'summerBox', ['timeframe', 'summer']],
            // Lease length
            [this.#prefs, 'perSemesterBox', ['leaseLength', 'semester']],
            [this.#prefs, 'monthlyBox', ['leaseLength', 'month']],
            [this.#prefs, 'MonthsBox', ['leaseLength', 'halfYear']],
            [this.#prefs, 'yearlyBox', ['leaseLength', 'year']],
            // Lease type
            [this.#prefs, 'rentBox', ['leaseType', 'rent']],
            [this.#prefs, 'subletBox', ['leaseType', 'sublet']],
            // Room type
            [this.#prefs, 'privateBox', ['roomType', 'private']],
            [this.#prefs, 'sharedBox', ['roomType', 'shared']],
            // Building type
            [this.#prefs, 'dormBox', ['buildingType', 'dorm']],
            [this.#prefs, 'apartmentBox', ['buildingType', 'apt']],
            [this.#prefs, 'houseBox', ['buildingType', 'house']],
            // Amenities
            [this.#prefs, 'airConditioningBoxP', ['amenities', 'aircon']],
            [this.#prefs, 'dishwasherBoxP', ['amenities', 'dishwasher']],
            [this.#prefs, 'hardwoodFloorsBoxP', ['amenities', 'hardwood']],
            [this.#prefs, 'carpetFloorsBoxP', ['amenities', 'carpet']],
            [this.#prefs, 'onSiteLaundryBoxP', ['amenities', 'laundry']],
            [this.#prefs, 'residentialParkBoxP', ['amenities', 'parking']],
            [this.#prefs, 'nearbyBusStopBoxP', ['amenities', 'bus']],
            [this.#prefs, 'petFriendlyBoxP', ['amenities', 'pets']],
            // Housing section
            [this.#house, 'electricityBox', ['utilities', 'electric']],
            [this.#house, 'gasBox', ['utilities', 'gas']],
            [this.#house, 'waterBox', ['utilities', 'water']],
            [this.#house, 'trashBox', ['utilities', 'trash']],
            [this.#house, 'sewerBox', ['utilities', 'sewer']],
            [this.#house, 'internetBox', ['utilities', 'internet']],
            [this.#house, 'snowRemovalBox', ['utilities', 'snow']],
            [this.#house, 'airConditioningBoxH', ['amenities', 'aircon']],
            [this.#house, 'dishwasherBoxH', ['amenities', 'dishwasher']],
            [this.#house, 'hardwoodFloorsBoxH', ['amenities', 'hardwood']],
            [this.#house, 'carpetFloorsBoxH', ['amenities', 'carpet']],
            [this.#house, 'onSiteLaundryBoxH', ['amenities', 'laundry']],
            [this.#house, 'residentialParkBoxH', ['amenities', 'parking']],
            [this.#house, 'nearbyBusStopBoxH', ['amenities', 'bus']],
            [this.#house, 'petFriendlyBoxH', ['amenities', 'pets']]
        ];
    }
}