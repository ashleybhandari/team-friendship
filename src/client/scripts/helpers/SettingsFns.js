export class SettingsFns {
    #parent = null;
    #user = null;
    #prefs = null;
    #house = null;

    /**
     * @param {HTMLDivElement} parent - View holding the input fields
     * @param {User} user - Current user
     */
    constructor(parent, user) {
        this.#parent = parent;
        this.#user = user;
        this.#prefs = user.preferences;
        this.#house = user.housing;
    }

    /**
     * Functions to fill and save fields. Each element is associated with in input filed
     * in the DOM.
     * @returns {{fill: function, save: function}[]}
     */
    getFns() {
        return [
            ...this.#getTextFns(),
            ...this.#getCheckboxFns(),
            ...this.#getRadioFns()
        ];
    }

    #getTextFns() {
        const fns = [];

        this.#getTextFields().forEach(([obj, id, prop, fillFn, saveFn]) => {
            const elm = this.#parent.querySelector(`#${id}`);
            let value, fill, save;

            if (!elm) return;

            if (prop.length === 1) {
                value = obj[prop[0]];
                fill = () => elm.value = fillFn ? fillFn(value) : value;
                save = () => obj[prop[0]] = saveFn ? saveFn(elm.value) : elm.value;
            }
            else if (prop.length === 2) {
                value = obj[prop[0]][prop[1]];
                fill = () => elm.value = fillFn ? fillFn(value) : value;
                save = () => obj[prop[0]][prop[1]] = saveFn ? saveFn(elm.value) : elm.value;
            }
            else {
                value = obj[prop[0]][prop[1]][prop[2]];
                fill = () => elm.value = fillFn ? fillFn(value) : value;
                save = () => obj[prop[0]][prop[1]][prop[2]] = saveFn ? saveFn(elm.value) : elm.value;
            }
            
            fns.push({ fill, save });
        });

        return fns;
    }

    #getCheckboxFns() {
        const fns = [];
        this.#getCheckboxFields().forEach(([obj, id, prop]) => {
            const elm = this.#parent.querySelector(`#${id}`)
            
            if (!elm) return;

            const fill = () => elm.checked = obj[prop[0]][prop[1]];
            const save = () => obj[prop[0]][prop[1]] = elm.checked;

            fns.push({ fill, save });
        });

        return fns;
    }

    #getRadioFns() {
        const fns = [];

        this.#getRadioFields().forEach(([obj, id, prop, fillFn, saveFn]) => {
            const elm = this.#parent.querySelector(`#${id}`);
            const options = elm.querySelectorAll('input');

            const fill = () => Array.from(options).forEach((option) => {
                option.checked = option.value === fillFn()
                if (option.checked) elm.setAttribute('data_value', option.value)
            });

            const save = () => obj[prop[0]] = saveFn(elm.getAttribute('data_value'));
            
            fns.push({ fill, save });
        });

        return fns;
    }

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
            // Housing section
        ];
    }

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