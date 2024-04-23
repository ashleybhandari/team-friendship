import { Button } from '../../components/Button.js';
import { CheckboxGroup } from '../../components/CheckboxGroup.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { RadioInput } from '../../components/RadioInput.js';
import { SliderInput } from '../../components/SliderInput.js';
import { TextAreaInput } from '../../components/TextAreaInput.js';
import { TextInput } from '../../components/TextInput.js';
import { users } from '../../../data/MockData.js';
import { SettingsFns } from '../../helpers/SettingsFns.js';

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
    #settingsFns = null;
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
        this.#credentialsSection = new CredentialsSection(
            this.#settingsViewElm, this.#user
        );
        this.#profileSection = new ProfileSection(
            this.#settingsViewElm, this.#user
        );
        this.#preferencesSection = new PreferencesSection(
            this.#settingsViewElm
        );
        this.#housingSection = new HousingSection(
            this.#settingsViewElm
        );
        
        // render sections
        await this.#credentialsSection.render(
            await this.#getButtons(this.#settingsViewElm)
        );
        await this.#profileSection.render(
            await this.#getButtons(this.#settingsViewElm)
        );
        this.#user.hasHousing
            ? await this.#housingSection.render(
                await this.#getButtons(this.#settingsViewElm)
              )
            : await this.#preferencesSection.render(
                await this.#getButtons(this.#settingsViewElm)
              );

        // fill HTML fields with the user's saved values
        this.#settingsFns = new SettingsFns(
            this.#settingsViewElm, this.#user
        ).getFns();
        this.#fillFields(this.#settingsViewElm);

        // set up form validation
        this.#validationSetup()
        
        return this.#settingsViewElm;
    }
    
    /**
     * Render Revert changes and Save buttons.
     */
    async #getButtons() {
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

        return elm;
    }

    /**
     * Fills the HTML elements with the user's saved values. Used for
     * initialization and reverting changes.
     */
    #fillFields() {
        this.#settingsFns.forEach((field) => field.fill());
    }

    /**
     * Save any changes made.
     */
    #saveChanges() {
        const invalid = this.#requiredFields.some((id) =>
            !this.#settingsViewElm.querySelector(`#${id}`).checkValidity()
        );
        if (invalid) {
            alert('Make sure all required fields are filled out (the starred ones!)');
            return;
        }

        this.#settingsFns.forEach((field) => field.save());

        // save new configuration
        localStorage.setItem('user', JSON.stringify(this.#user));

        // get settings functions with new user value
        this.#settingsFns = new SettingsFns(
            this.#settingsViewElm, this.#user
        ).getFns();
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
        this.#requiredFields.forEach((id) =>
            this.#settingsViewElm.querySelector(`#${id}`).required = true
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
     * Renders Credentials section.
     * @param {HTMLDivElement} - Buttons to render at bottom of section
     */
    async render(buttons) {
        const elm = document.createElement('div');
        elm.id = 'credentials-section';
        elm.classList.add('section');
        
        const header = document.createElement('h3');
        header.innerText = 'Credentials';

        const section = document.createElement('div');
        section.id = 'credentials';

        section.appendChild(await new TextInput('Email*').render());
        section.appendChild(await new TextInput('Password').render());

        elm.appendChild(header);
        elm.appendChild(section);
        elm.appendChild(buttons);
        this.#parent.appendChild(elm);
    }

    /**
     * @returns {string[]} - Array of id's for required fields
     */
    requiredFields() {
        return ['emailInput'];
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
     * @param {HTMLDivElement} - Buttons to render at bottom of section
     */
    async render(buttons) {
        const elm = document.createElement('div');
        elm.id = 'profile-section';
        elm.classList.add('section');

        const header = document.createElement('h3');
        header.innerText = 'Profile';

        const section = document.createElement('div');
        section.id = 'profile';

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
        section.appendChild(await new RadioInput(
            'I am looking for...', ['roommates', 'housing']
        ).render());

        elm.appendChild(header);
        elm.appendChild(section);
        elm.appendChild(buttons);
        this.#parent.appendChild(elm);
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
     * @returns {string[]} - Array of id's for required fields
     */
    requiredFields() {
        return [
            'firstNameInput',
            'ageInput',
            'genderIdentityDrpdwn',
            'cleanlinessSldr',
            'noiseWhenStudyiSldr',
            'sleepingHabitsSldr',
            'hostingGuestsSldr'
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
     * Renders Preferences section.
     */
    async render(buttons) {
        const elm = document.createElement('div');
        elm.id = 'preferences-section';
        elm.classList.add('section');

        const header = document.createElement('h3');
        header.innerText = 'Your Preferences';

        const section = document.createElement('div');
        section.id = 'preferences';

        section.appendChild(await this.renderTextInput());
        section.appendChild(await this.renderGender());
        section.appendChild(await this.renderTimeframe());
        section.appendChild(await this.renderLeaseLength());
        section.appendChild(await this.renderLeaseType());
        section.appendChild(await this.renderRoomType());
        section.appendChild(await this.renderBuildingType());
        section.appendChild(await this.renderAmenities());

        elm.appendChild(header);
        elm.appendChild(section);
        elm.appendChild(buttons);
        this.#parent.appendChild(elm);
    }

    /**
     * Fields for cities, rent, and number of occupants
     * @returns {HTMLDivElement1}
     */
    async renderTextInput() {
        const elm = document.createElement('div');
        elm.classList.add('text-input');

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

        return elm;
    }

    /**
     * Fields for gender inclusivity
     * @returns {HTMLDivElement1}
     */
    async renderGender() {
        const boxes = new Map([
            ['All-female'],
            ['All-male'],
            ['Mixed']
        ]);

        return await new CheckboxGroup('Gender inclusivity', boxes).render();
    }

    async renderLeaseLength() {
        const boxes = new Map([
            ['Per semester'],
            ['Monthly'],
            ['6 months'],
            ['Yearly']
        ]);

        return await new CheckboxGroup('Lease length', boxes).render();
    }

    async renderLeaseType() {
        const boxes = new Map([
            ['Rent'],
            ['Sublet']
        ]);

        return await new CheckboxGroup('Lease type', boxes).render();
    }

    async renderRoomType() {
        const boxes = new Map([
            ['Private'],
            ['Shared']
        ]);

        return await new CheckboxGroup('Room type', boxes).render();
    }

    async renderBuildingType() {
        const boxes = new Map([
            ['Dorm'],
            ['Apartment'],
            ['House']
        ]);

        return await new CheckboxGroup('Building type', boxes).render();
    }
    
    async renderTimeframe() {
        const boxes = new Map([
            ['Fall'],
            ['Winter'],
            ['Spring'],
            ['Summer']
        ]);

        return await new CheckboxGroup('Move-in period', boxes).render();
    }

    async renderAmenities() {
        const boxes = new Map([
            ['Air conditioning'],
            ['Dishwasher'],
            ['Hardwood floors'],
            ['Carpet floors'],
            ['On-site laundry'],
            ['Residential parking'],
            ['Nearby bus stop'],
            ['Pet-friendly']
        ]);

        const group = await new CheckboxGroup('Amenities', boxes, 4).render();
        group.classList.add('amenities');

        return group;
    }

    /**
     * @returns {string[]} - Array of id's for required fields
     */
    requiredFields() {
        return [];
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
     * Renders Housing section.
     * @param {HTMLDivElement} - Buttons to render at bottom of section
     */
    async render(buttons) {
        const elm = document.createElement('div');
        elm.id = 'housing-section';
        elm.classList.add('section');

        const header = document.createElement('h3');
        header.innerText = 'Your Housing';

        const section = document.createElement('div');
        section.id = 'housing';

        elm.appendChild(header);
        elm.appendChild(section);
        elm.appendChild(buttons);
        this.#parent.appendChild(elm);
    }

    /**
     * @returns {string[]} - Array of id's for required fields
     */
    requiredFields() {
        return [];
    }
}