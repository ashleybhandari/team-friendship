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
    }

    /**
     * @callback Fill - Fills a field with the obj's saved value
     * @callback Save - Saves a field's current value to its associated object
     */

    /**
     * Array of Functions to fill and save fields. Each element is associated
     * with in input filed in the DOM.
     * @returns {{Fill, Save}[]}
     */
    getFns() {
        return [
            ...this.#getTextFns(),
            ...this.#getCheckboxFns(),
            ...this.#getRadioFns()
        ];
    }

    /**
     * Array of fill and save functions for TextInput fields
     * @returns {{Fill, Save}[]}
     */
    #getTextFns() {
        const fns = [];

        /**
         * Iterate through all text fields and adds their fill and save
         * functions to fns
         * @param {User | Preferences | Housing} obj - object containing the field's value
         * @param {string} id - id of the field's HTML element
         * @param {string[]} prop - property in obj with the field's value; array to handle nested properties
         * @param {function} [fillFn] - applies necessary changes before filling the field
         * @param {function} [saveFn] - applies necessary changes before saving the value
         */
        this.#getTextFields().forEach(([obj, id, prop, fillFn, saveFn]) => {
            // element containing the field
            const elm = this.#parent.querySelector(`#${id}`);
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
            else if (prop.length === 2) { // ex. user.prop1.prop2
                value = obj[prop[0]][prop[1]];
                fill = () => elm.value = fillFn ? fillFn(value) : value;
                save = () => obj[prop[0]][prop[1]] = saveFn ? saveFn(elm.value) : elm.value;
            }
            else {                        // ex. user.prop1.prop2.prop3
                value = obj[prop[0]][prop[1]][prop[2]];
                fill = () => elm.value = fillFn ? fillFn(value) : value;
                save = () => obj[prop[0]][prop[1]][prop[2]] = saveFn ? saveFn(elm.value) : elm.value;
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
            const elm = this.#parent.querySelector(`#${id}`)
            
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
     * Array of fill and save functions for RadioInput fields
     * @returns {{Fill, Save}[]}
     */
    #getRadioFns() {
        const fns = [];

        /**
         * Iterate through all text fields and adds their fill and save
         * functions to fns
         * @param {User | Preferences | Housing} obj - object containing the field's value
         * @param {string} id - id of the field's HTML element
         * @param {string[]} prop - property in obj with the field's value; array to handle nested properties
         * @param {function} fillFn - applies necessary changes before filling the field
         * @param {function} saveFn - applies necessary changes before saving the value
         */
        this.#getRadioFields().forEach(([obj, id, prop, fillFn, saveFn]) => {
            // element containing the field
            const elm = this.#parent.querySelector(`#${id}`);
            // array of radio options
            const options = elm.querySelectorAll('input');

            // skip if element DNE
            if (!elm) return;

            // updates radio options, sets data_value accordingly
            const fill = () => Array.from(options).forEach((option) => {
                option.checked = option.value === fillFn()
                if (option.checked) elm.setAttribute('data_value', option.value)
            });

            const save = () => obj[prop[0]] = saveFn(elm.getAttribute('data_value'));
            
            // adds functions to fn
            fns.push({ fill, save });
        });

        return fns;
    }

    /**
     * Array of arguments to #getTextFns. Each element corresponds to an HTML
     * field.
     * @returns {[Object | string | string[] | function][]}
     */
    #getTextFields() {
        return [
            // Credentials section
            // TODO: implement password
            [this.#user, 'emailInput', ['email'] ],
            // Profile section
            [this.#user, 'firstNameInput', ['name', 'fname']],
            [this.#user, 'nicknameInput', ['name', 'nname']],
            [this.#user, 'ageInput', ['age']],
            [this.#user, 'genderIdentityDrpdwn', ['gender', 'identity']],
            [this.#user, 'pronounsInput', ['gender', 'pronouns']],
            [this.#user, 'majorInput', ['education', 'major']],
            [this.#user, 'schoolInput', ['education', 'school']],
            [this.#user, 'levelOfEducatioDrpdwn', ['education', 'level']],
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
            [this.#prefs, 'airConditioningBox', ['amenities', 'aircon']],
            [this.#prefs, 'dishwasherBox', ['amenities', 'dishwasher']],
            [this.#prefs, 'hardwoodFloorsBox', ['amenities', 'hardwood']],
            [this.#prefs, 'carpetFloorsBox', ['amenities', 'carpet']],
            [this.#prefs, 'onSiteLaundryBox', ['amenities', 'laundry']],
            [this.#prefs, 'residentialParkBox', ['amenities', 'parking']],
            [this.#prefs, 'nearbyBusStopBox', ['amenities', 'bus']],
            [this.#prefs, 'petFriendlyBox', ['amenities', 'pets']]
        ];
    }

    /**
     * Array of arguments to #getRadioFns. Each element corresponds to an HTML
     * field.
     * @returns {[Object | string | string[] | function][]}
     */
    #getRadioFields() {
        return [
            [
                this.#user, 'iAmLookingForRadio', ['hasHousing'],
                () => this.#user.hasHousing ? 'roommates' : 'housing',
                (v) => v !== 'housing'
            ]
        ];
    }
}