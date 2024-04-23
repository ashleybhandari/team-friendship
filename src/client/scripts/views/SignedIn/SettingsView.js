import { Button } from '../../components/Button.js';
import { CheckboxInput } from '../../components/CheckboxInput.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { RadioInput } from '../../components/RadioInput.js';
import { SliderInput } from '../../components/SliderInput.js';
import { TextAreaInput } from '../../components/TextAreaInput.js';
import { TextInput } from '../../components/TextInput.js';
import { users } from '../../../data/MockData.js';
import { QueryFunctions } from '../../helpers/queryFunctions.js';

/**
 * Lets the user change their configuration. Injected into SignedInContainer.
 * view: 'settings'
 */
export class SettingsView {
    #settingsViewElm = null;
    #credentialsSection = null;
    #profileSection = null;
    #preferencesSection = null;
    #housingSection = null;
    #user = null;
    #queryFns = null;
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
        this.#credentialsSection = new CredentialsSection(this.#settingsViewElm, this.#user);
        this.#profileSection = new ProfileSection(this.#settingsViewElm, this.#user);
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
        this.#queryFns = new QueryFunctions(this.#settingsViewElm, this.#user);
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
    #fillFields() {
        this.#queryFns.getFns().forEach((field) => field.fill());
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

        this.#queryFns.getFns().forEach((field) => field.save());

        // save new configuration
        localStorage.setItem('user', JSON.stringify(this.#user));

        // get query functions with new user value
        this.#queryFns = new QueryFunctions(this.#settingsViewElm, this.#user);
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
    #parent = null;

    /**
     * Credentials section of the Settings view.
     * @param {HTMLDivElement} parent - Settings view
     */
    constructor(parent) {
        this.#parent = parent;
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

        this.#parent.appendChild(header);
        this.#parent.appendChild(section);
    }
}


class ProfileSection {
    #parent = null;

    /**
     * Profile section of the Settings view.
     * @param {HTMLDivElement} parent - Settings view
     */
    constructor(parent) {
        this.#parent = parent;
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

        this.#parent.appendChild(header);
        this.#parent.appendChild(section);
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
}


class PreferencesSection {
    #parent = null;

    /**
     * Preferences section of the Settings view.
     * @param {HTMLDivElement} parent - Settings view
     */
    constructor(parent) {
        this.#parent = parent;
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

        section.appendChild(await this.renderCol1());
        section.appendChild(await this.renderCol2());
        section.appendChild(await this.renderCol3());

        this.#parent.appendChild(header);
        this.#parent.appendChild(section);
    }

    /**
     * Renders column 1 of the Preferences section.
     * @returns {HTMLDivElement1}
     */
    async renderCol1() {
        const elm = document.createElement('div');

        // cities
        elm.appendChild(await new TextInput('Cities (comma-separated)').render());

        // subgroup (inputs are half-width): min and max rent
        const rent = document.createElement('div');
        rent.classList.add('subgroup');
        rent.appendChild(await new TextInput('Min rent', 'text', 118).render());
        rent.appendChild(await new TextInput('Max rent', 'text', 118).render());
        elm.appendChild(rent);

        // subgroup (inputs are half-width): min and max occupants
        const occupants = document.createElement('div');
        occupants.classList.add('subgroup');
        occupants.appendChild(await new TextInput('Min occupants', 'text', 118).render());
        occupants.appendChild(await new TextInput('Max occupants', 'text', 118).render());
        elm.appendChild(occupants);

        // gender inclusivity
        elm.appendChild(await new DropdownInput(
            'Gender inclusivity', ['All-female', 'All-male', 'Mixed']
        ).render());

        // move-in period
        elm.appendChild(await new DropdownInput(
            'Move-in period', ['Fall', 'Winter', 'Spring', 'Summer']
        ).render());

        return elm;
    }

    /**
     * Renders column 2 of the Preferences section.
     * @returns {HTMLDivElement1}
     */
    async renderCol2() {
        const elm = document.createElement('div');

        // lease length
        elm.appendChild(await new DropdownInput(
            'Lease length', ['Per semester', 'Monthly', '6 months', 'Yearly']
        ).render());

        // lease type
        elm.appendChild(await new DropdownInput(
            'Lease type', ['Rent', 'Sublet']
        ).render());

        // room type
        elm.appendChild(await new DropdownInput(
            'Room type', ['Private', 'Shared']
        ).render());

        // building type
        elm.appendChild(await new DropdownInput(
            'Building type', ['Dorm', 'Apartment', 'House']
        ).render());

        return elm;
    }

    /**
     * Renders column 3 of the Preferences section.
     * @returns {HTMLDivElement1}
     */
    async renderCol3() {
        const elm = document.createElement('div');
        elm.classList.add('checkbox-list');

        // checkboxes
        elm.appendChild(await new CheckboxInput('Air conditioning').render());
        elm.appendChild(await new CheckboxInput('Dishwasher').render());
        elm.appendChild(await new CheckboxInput('Hardwood floors').render());
        elm.appendChild(await new CheckboxInput('Carpet floors').render());
        elm.appendChild(await new CheckboxInput('On-site laundry').render());
        elm.appendChild(await new CheckboxInput('Residential parking').render());
        elm.appendChild(await new CheckboxInput('Nearby bus stop').render());
        elm.appendChild(await new CheckboxInput('Pet-friendly').render());

        return elm;
    }    
}


class HousingSection {
    #parent = null;

    /**
     * Housing section of the Settings view.
     * @param {HTMLDivElement} parent - Settings view
     */
    constructor(parent) {
        this.#parent = parent;
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

        this.#parent.appendChild(header);
        this.#parent.appendChild(section);
    }
}