import { RadioInput } from '../components/RadioInput.js';

export class QueryFunctions {
    #parent = null;
    #user = null;
    #prefs = null;
    #house = null;

    /**
     * @param {HTMLDivElement} parent - View holding the input fields
     * @param {User} user - Current user
     */
    constructor (parent, user) {
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
            ...this.#getCredentialsFns(),
            ...this.#getProfileFns(),
            ...this.#getPreferencesFns(),
            ...this.#getHousingFns()
        ];
    }

    /**
     * Creates a function to fill an HTML element with a specified value
     * @param {number} id - id of input field
     * @param {*} value - Value to fill input field with
     * @param {boolean} isCheckbox - Whether the input field is a checkbox
     * @returns {function}
     */
    #fillFn(id, value, isCheckbox = false) {
        const elm = this.#parent.querySelector(`#${id}`);

        if (elm && isCheckbox) {
            return () => elm.checked = value;
        }

        if (elm) {
            return () => elm.value = value;
        }
        
        return () => {};
    }

    /**
     * Gets the current value of the specified field
     * @param {number} id - id of input field
     * @returns {*} - Field value
     */
    #getValue(id) {
        return this.#parent.querySelector(`#${id}`).value;
    }

    /**
     * @callback Fill - Fills an input field
     * @callback Save - Saves the current value of an input field
     */

    /**
     * Functions to fill and save fields in the Credentials section of Settings.
     * @returns {{fill: Fill, save: Save}[]}
     */
    #getCredentialsFns() {
        // TODO: implement passwordInput
        return [
            {
                fill: this.#fillFn('emailInput', this.#user.email),
                save: () => this.#user.email = this.#getValue('emailInput')
            }
        ];
    }

    /**
     * Functions to fill and save fields in the Profile section of Settings.
     * @returns {{fill: function, save: function}[]}
     */
    #getProfileFns() {
        return [
            {
                fill: this.#fillFn('firstNameInput', this.#user.name.fname),
                save: () => this.#user.name.fname = this.#getValue('firstNameInput')
            },
            {
                fill: this.#fillFn('nicknameInput', this.#user.name.nname),
                save: () => this.#user.name.nname = this.#getValue('nicknameInput')
            },
            {
                fill: this.#fillFn('ageInput', this.#user.age),
                save: () => this.#user.age = this.#getValue('ageInput')
            },
            {
                fill: this.#fillFn('genderIdentityDrpdwn', this.#user.gender.identity),
                save: () => this.#user.gender.identity = this.#getValue('genderIdentityDrpdwn')
            },
            {
                fill: this.#fillFn('pronounsInput', this.#user.gender.pronouns),
                save: () => this.#user.gender.pronouns = this.#getValue('pronounsInput')
            },
            {
                fill: this.#fillFn('majorInput', this.#user.education.major),
                save: () => this.#user.education.major = this.#getValue('majorInput')
            },
            {
                fill: this.#fillFn('schoolInput', this.#user.education.school),
                save: () => this.#user.education.school = this.#getValue('schoolInput')
            },
            {
                fill: this.#fillFn('levelOfEducatioDrpdwn', this.#user.education.level),
                save: () => this.#user.education.level = this.#getValue('levelOfEducatioDrpdwn')
            },
            {
                fill: this.#fillFn('tellUsAboutYourArea', this.#user.description),
                save: () => this.#user.description = this.#getValue('tellUsAboutYourArea')
            },
            {
                fill: this.#fillFn('facebookInput', this.#user.socials.fb),
                save: () => this.#user.socials.fb = this.#getValue('facebookInput')
            },
            {
                fill: this.#fillFn('instagramInput', this.#user.socials.ig),
                save: () => this.#user.socials.ig = this.#getValue('instagramInput')
            },
            {
                fill: this.#fillFn('cleanlinessSldr', this.#user.character.clean),
                save: () => this.#user.character.clean = this.#getValue('cleanlinessSldr')
            },
            {
                fill: this.#fillFn('noiseWhenStudyiSldr', this.#user.character.noise),
                save: () => this.#user.character.noise = this.#getValue('noiseWhenStudyiSldr')
            },
            {
                fill: this.#fillFn('sleepingHabitsSldr', this.#user.character.sleep),
                save: () => this.#user.character.sleep = this.#getValue('sleepingHabitsSldr')
            },
            {
                fill: this.#fillFn('hostingGuestsSldr', this.#user.character.guests),
                save: () => this.#user.character.guests = this.#getValue('hostingGuestsSldr')
            },
            {
                fill: async () => {
                    const elm = this.#parent.querySelector('#lookingForRadio');
                    elm.innerHTML = '';
                    elm.appendChild(await new RadioInput(
                        'I am looking for...', ['roommates', 'housing'],
                        this.#user.hasHousing ? 0 : 1
                    ).render());
                },
                save: () => {
                    const v = this.#parent.querySelector('input[name="iAmLookingForRadio"]:checked').value;
                    this.#user.hasHousing = v !== 'housing'
                }
            }
        ];
    }

    /**
     * Functions to fill and save fields in the Preferences section of Settings.
     * @returns {{fill: function, save: function}[]}
     */
    #getPreferencesFns() {
        return [
            {
                fill: this.#fillFn('citiesCommaSepaInput', this.#prefs.cities.join(', ')),
                save: () => {}
            },
            {
                fill: this.#fillFn('minRentInput', this.#prefs.rent.min),
                save: () => {}
            },
            {
                fill: this.#fillFn('maxRentInput', this.#prefs.rent.max),
                save: () => {}
            },
            {
                fill: this.#fillFn('minOccupantsInput', this.#prefs.occupants.min),
                save: () => {}
            },
            {
                fill: this.#fillFn('maxOccupantsInput', this.#prefs.occupants.max),
                save: () => {}
            },
            {
                fill: this.#fillFn('genderInclusiviDrpdwn', this.#prefs.gender),
                save: () => {}
            },
            {
                fill: this.#fillFn('moveInPeriodDrpdwn', this.#prefs.timeframe),
                save: () => {}
            },
            {
                fill: this.#fillFn('leaseLengthDrpdwn', this.#prefs.leaseLength),
                save: () => {}
            },
            {
                fill: this.#fillFn('leaseTypeDrpdwn', this.#prefs.leaseType),
                save: () => {}
            },
            {
                fill: this.#fillFn('roomTypeDrpdwn', this.#prefs.roomType),
                save: () => {}
            },
            {
                fill: this.#fillFn('airConditioningBox', this.#prefs.amenities.aircon, true),
                save: () => {}
            },
            {
                fill: this.#fillFn('dishwasherBox', this.#prefs.amenities.dishwasher, true),
                save: () => {}
            },
            {
                fill: this.#fillFn('hardwoodFloorsBox', this.#prefs.amenities.hardwood, true),
                save: () => {}
            },
            {
                fill: this.#fillFn('carpetFloorsBox', this.#prefs.amenities.carpet, true),
                save: () => {}
            },
            {
                fill: this.#fillFn('onSiteLaundryBox', this.#prefs.amenities.laundry, true),
                save: () => {}
            },
            {
                fill: this.#fillFn('residentialParkBox', this.#prefs.amenities.parking, true),
                save: () => {}
            },
            {
                fill: this.#fillFn('nearbyBusStopBox', this.#prefs.amenities.bus, true),
                save: () => {}
            },
            {
                fill: this.#fillFn('petFriendlyBox', this.#prefs.amenities.pets, true),
                save: () => {}
            }
        ];
    }

    /**
     * Functions to fill and save fields in the Housing section of Settings.
     * @returns {{fill: function, save: function}[]}
     */
    #getHousingFns() {
        return [

        ];
    }
}