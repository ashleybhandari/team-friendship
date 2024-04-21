import { Button } from '../../components/Button.js';
import { CheckboxInput } from '../../components/CheckboxInput.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { RadioInput } from '../../components/RadioInput.js';
import { SliderInput } from '../../components/SliderInput.js';
import { TextAreaInput } from '../../components/TextAreaInput.js';
import { TextInput } from '../../components/TextInput.js';
import { users } from '../../../data/MockData.js';

/**
 * Lets the user change their configuration. Injected into SignedInContainer.
 */
export class SettingsView {
    #settingsViewElm = null;
    #credentialsSection = null;
    #profileSection = null;
    #preferencesSection = null;
    #housingSection = null;
    #user = null;
    #queryMap = null;
    #requiredFields = null;

    constructor() {
        // TODO: remove users import, replace all localStorage stuff w PouchDB
        localStorage.setItem('user', JSON.stringify(users[5]));
        this.#user = JSON.parse(localStorage.getItem('user')); 
    }

    async render() {
        this.#settingsViewElm = document.createElement('div');
        this.#settingsViewElm.id = 'settingsView';

        // page header
        this.#settingsViewElm.innerHTML = `
        <form>
            <h2 class="battambang">Settings</h2>
        </form>
        `;

        // create page sections
        this.#credentialsSection = new CredentialsSection(this.#settingsViewElm);
        this.#profileSection = new ProfileSection(this.#settingsViewElm);
        this.#preferencesSection = new PreferencesSection(this.#settingsViewElm);
        this.#housingSection = new HousingSection(this.#settingsViewElm);
        
        // render sections
        await this.#credentialsSection.render();
        await this.#profileSection.render();

        await this.#user.hasHousing
            ? this.#housingSection.render()
            : this.#preferencesSection.render();

        // render revert changes and save buttons
        await this.#renderButtons(this.#settingsViewElm);

        // fill HTML fields with the user's saved values
        this.#initMap();
        this.#fillFields(this.#settingsViewElm);

        // set up form validation
        this.#validationSetup()
        
        return this.#settingsViewElm;
    }
    
    /**
     * Render Revert changes and Save buttons.
     */
    async #renderButtons() {
        const elm = document.createElement('div');
        elm.classList.add('buttons');

        // create buttons
        const revertElm = await new Button(
            'Revert changes', 150, 'danger'
        ).render();
        const saveElm = await new Button('Save', 80, 'submit').render();
        saveElm.id = 'saveBtn';

        // click event listeners
        revertElm.addEventListener('click', (e) => {
            e.preventDefault();
            this.#fillFields();
        });
        saveElm.addEventListener('click', (e) => {
            e.preventDefault();
            this.#saveChanges();
        });


        elm.appendChild(revertElm);
        elm.appendChild(saveElm);
        this.#settingsViewElm.appendChild(elm);
    }

    /**
     * Fills the HTML elements with the user's saved values. Used for
     * initialization and reverting changes.
     */
    async #fillFields() {
        /** @type {HTMLDivElement[]} - Container-child tuple for #lookingForRadio */
        let radio;

        this.#queryMap.forEach((field, query) => {
            const elm = this.#settingsViewElm.querySelector(query);

            // elements to re-render radio group (hard to directly assign a value)
            if (query === '#lookingForRadio') {
                elm.innerHTML = '';
                radio = [elm, new RadioInput(
                    'I am looking for...', ['roommates', 'housing'],
                    this.#user.hasHousing ? 0 : 1
                )];
            }
            else {
                elm.value = field.length === 1
                ? this.#user[field[0]]
                : this.#user[field[0]][field[1]];
            }
        });

        // render radio group
        radio[0].appendChild(await radio[1].render());
    }

    /**
     * Save any changes made.
     */
    #saveChanges() {
        const invalid = this.#requiredFields.some((query) =>
            !this.#settingsViewElm.querySelector(query).checkValidity()
        );
        if (invalid) {
            alert('Make sure all required fields are filled out (the starred ones!)');
            return;
        }

        this.#queryMap.forEach((field, query) => {
            const elm = this.#settingsViewElm.querySelector(query);

            // radio group requires special treatment
            if (query === '#lookingForRadio') {
                const value = elm.querySelector('input[name="iAmLookingForRadio"]:checked').value;
                this.#user.hasHousing = value !== 'housing';
            }
            else if (field.length === 1) {
                this.#user[field[0]] = elm.value;
            }
            else {
                this.#user[field[0]][field[1]] = elm.value;
            }
        });

        // save new configuration
        localStorage.setItem('user', JSON.stringify(this.#user));
    }

    /**
     * Initializes queryMap to a Map of all HTML elements and their associated
     * property names. Keys are HTML element queries, values are the saved
     * values for those queries. If a value has multiple elements, it is
     * associated with a nested property in  User: ex. ['name', 'fname'] is
     * used to set and get this.#user.name.fname
     * @returns {Map<string, string[]>}
     */
    #initMap() {
        this.#queryMap = new Map([
            ...this.#credentialsSection.queryMap(),
            ...this.#profileSection.queryMap(),
            ...this.#preferencesSection.queryMap(),
            ...this.#housingSection.queryMap(),
        ]);
    }

    /**
     * Sets up form validation.
     */
    #validationSetup() {
        this.#requiredFields = [
            ...this.#credentialsSection.requiredFields(),
            ...this.#profileSection.requiredFields(),
            ...this.#preferencesSection.requiredFields(),
            ...this.#housingSection.requiredFields()
        ]

        // set required property on required fields to true
        this.#requiredFields.forEach((query) =>
            this.#settingsViewElm.querySelector(query).required = true
        );
    }
}


class CredentialsSection {
    #settingsViewElm = null;

    /**
     * Credentials section of the Settings view.
     * @param {HTMLDivElement} parent - Settings view
     */
    constructor(parent) {
        this.#settingsViewElm = parent;
    }

    /**
     * Map of HTML elements and their associated property names. Keys are HTML
     * element queries, values are the saved values for those queries. If a
     * value has multiple elements, it is associated with a nested property in
     * User: ex. ['name', 'fname'] is used to set and get this.#user.name.fname
     * @returns {Map<string, string[]>}
     */
    queryMap() {
        return new Map([
            ['#emailInput', ['email']]
        ]);
        // TODO: implement passwordInput
    }

    /**
     * @returns {string[]} - Array of queries for required fields
     */
    requiredFields() {
        return ['#emailInput'];
    }

    /**
     * Renders Credentials section.
     */
    async render() {
        const header = document.createElement('h3');
        header.innerText = 'Credentials';

        const section = document.createElement('div');
        section.id = 'credentials';
        section.classList.add('section');

        section.appendChild(await new TextInput('Email*').render());
        section.appendChild(await new TextInput('Password').render());

        this.#settingsViewElm.appendChild(header);
        this.#settingsViewElm.appendChild(section);
    }
}


class ProfileSection {
    #settingsViewElm = null;

    /**
     * Profile section of the Settings view.
     * @param {HTMLDivElement} parent - Settings view
     */
    constructor(parent) {
        this.#settingsViewElm = parent;
    }

    /**
     * Map of HTML elements and their associated property names. Keys are HTML
     * element queries, values are the saved values for those queries. If a
     * value has multiple elements, it is associated with a nested property in
     * User: ex. ['name', 'fname'] is used to set and get this.#user.name.fname
     * @returns {Map<string, string[]>}
     */
    queryMap() {
        return new Map([
            ['#firstNameInput',        ['name', 'fname']      ],
            ['#nicknameInput',         ['name', 'nname']      ],
            ['#ageInput',              ['age']                ],
            ['#genderIdentityDrpdwn',  ['gender', 'identity'] ],
            ['#pronounsInput',         ['gender', 'pronouns'] ],
            ['#majorInput',            ['education', 'major'] ],
            ['#schoolInput',           ['education', 'school']],
            ['#levelOfEducatioDrpdwn', ['education', 'level'] ],
            ['#tellUsAboutYourArea',   ['description']        ],
            ['#facebookInput',         ['socials', 'fb']      ],
            ['#instagramInput',        ['socials', 'ig']      ],
            ['#cleanlinessSldr',       ['character', 'clean'] ],
            ['#noiseWhenStudyiSldr',   ['character', 'noise'] ],
            ['#sleepingHabitsSldr',    ['character', 'sleep'] ],
            ['#hostingGuestsSldr',     ['character', 'guests']],
            ['#lookingForRadio',       ['character', 'guests']]
        ]);
    }

    /**
     * @returns {string[]} - Array of queries for required fields
     */
    requiredFields() {
        return [
            '#firstNameInput',
            '#ageInput',
            '#genderIdentityDrpdwn',
            '#cleanlinessSldr',
            '#noiseWhenStudyiSldr',
            '#sleepingHabitsSldr',
            '#hostingGuestsSldr'
        ];
    }

    /**
     * Renders Profile section.
     */
    async render() {
        const header = document.createElement('h3');
        header.innerText = 'Profile';

        const section = document.createElement('div');
        section.id = 'profile';
        section.classList.add('section');

        // TODO: implement avatar
        const avatar = document.createElement('div');
        avatar.innerHTML = `
        <p>Change your avatar:</p>
        <input type="file" id="avatar" name="avatar">
        `;

        // row 1: avatar, identity info, education info
        section.appendChild(avatar);
        section.appendChild(await this.#renderIdentity());
        section.appendChild(await this.#renderEducation());

        // row 2: bio, social media
        section.appendChild(await new TextAreaInput(
            'Tell us about yourself',
            'Lifestyle, hobbies, routines, allergies...'
        ).render());
        section.appendChild(await this.#renderSocials());

        // row 3-4: characteristics, is user looking for roommates or housing
        const sliders = await this.#renderSliders();
        sliders.forEach((s) => section.appendChild(s));

        const radioCntr = document.createElement('div');
        radioCntr.id = 'lookingForRadio';
        section.appendChild(radioCntr);

        this.#settingsViewElm.appendChild(header);
        this.#settingsViewElm.appendChild(section);
    }

    /**
     * Fields for first name, nickname + age, and gender identity + pronouns.
     * @returns {HTMLDivElement}
     */
    async #renderIdentity() {
        const elm = document.createElement('div');

        // first name
        elm.appendChild(await new TextInput('First name*').render());

        // subgroup (inputs are half-width): nickname + age
        const grp1 = document.createElement('div');
        grp1.classList.add('subgroup');
        grp1.appendChild(await new TextInput('Nickname', 'text', 118).render());
        grp1.appendChild(await new TextInput('Age*', 'text', 118).render());

        // subgroup (inputs are half-width): gender identity + pronouns
        const grp2 = document.createElement('div');
        grp2.classList.add('subgroup');
        grp2.appendChild(await new DropdownInput(
            'Gender identity*', ['Woman', 'Man', 'Nonbinary'], 149.2
        ).render());
        grp2.appendChild(await new TextInput('Pronouns', 'text', 118).render());
        
        elm.appendChild(grp1);
        elm.appendChild(grp2);

        return elm;
    }

    /**
     * Fields for major, school, and level of education.
     * @returns {HTMLDivElement}
     */
    async #renderEducation() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput('Major').render());
        elm.appendChild(await new TextInput('School').render());
        elm.appendChild(await new DropdownInput(
            'Level of education', ['Undergrad', 'Grad', 'Other']
        ).render());

        return elm;
    }

    /**
     * Fields for Facebook and Instagram.
     * @returns {HTMLDivElement}
     */
    async #renderSocials() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput('Facebook').render());
        elm.appendChild(await new TextInput('Instagram').render());

        return elm;
    }

    /**
     * Fields for slider elements.
     * @returns {HTMLDivElement[]} - Array of sliders
     */
    async #renderSliders() {
        return [
            await new SliderInput(
                'Cleanliness*', 'not clean', 'very clean'
            ).render(),
            await new SliderInput(
                'Noise when studying*', 'very quiet', 'noise is okay'
            ).render(),
            await new SliderInput(
                'Sleeping habits*', 'early bird', 'night owl'
            ).render(),
            await new SliderInput(
                'Hosting guests*', 'never', 'frequent'
            ).render()
        ];
    }
}


class PreferencesSection {
    #settingsViewElm = null;

    /**
     * Preferences section of the Settings view.
     * @param {HTMLDivElement} parent - Settings view
     */
    constructor(parent) {
        this.#settingsViewElm = parent;
    }

    /**
     * Map of HTML elements and their associated property names. Keys are HTML
     * element queries, values are the saved values for those queries. If a
     * value has multiple elements, it is associated with a nested property in
     * User: ex. ['name', 'fname'] is used to set and get this.#user.name.fname
     * @returns {Map<string, string[]>}
     */
    queryMap() {
        return new Map();
    }

    /**
     * @returns {string[]} - Array of queries for required fields
     */
    requiredFields() {
        return [];
    }

    /**
     * Renders Preferences section.
     */
    async render() {
        const header = document.createElement('h3');
        header.innerText = 'Your Preferences';

        const section = document.createElement('div');
        section.id = 'preferences';
        section.classList.add('section');

        this.#settingsViewElm.appendChild(header);
        this.#settingsViewElm.appendChild(section);
    }
}


class HousingSection {
    #settingsViewElm = null;

    /**
     * Housing section of the Settings view.
     * @param {HTMLDivElement} parent - Settings view
     */
    constructor(parent) {
        this.#settingsViewElm = parent;
    }

    /**
     * Map of HTML elements and their associated property names. Keys are HTML
     * element queries, values are the saved values for those queries. If a
     * value has multiple elements, it is associated with a nested property in
     * User: ex. ['name', 'fname'] is used to set and get this.#user.name.fname
     * @returns {Map<string, string[]>}
     */
    queryMap() {
        return new Map();
    }

    /**
     * @returns {string[]} - Array of queries for required fields
     */
    requiredFields() {
        return [];
    }

    /**
     * Renders Housing section.
     */
    async render() {
        const header = document.createElement('h3');
        header.innerText = 'Your Housing';

        const section = document.createElement('div');
        section.id = 'housing';
        section.classList.add('section');

        this.#settingsViewElm.appendChild(header);
        this.#settingsViewElm.appendChild(section);
    }
}