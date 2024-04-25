import { ProgressBar } from '../../components/ProgressBar.js';
import { Button } from '../../components/Button.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { TextAreaInput } from '../../components/TextAreaInput.js';
import { TextInput } from '../../components/TextInput.js';
import { SliderInput } from '../../components/SliderInput.js';
import { CheckboxGroup } from '../../components/CheckboxGroup.js';
import { Navigation } from '../../components/Navigation.js';
import { Events } from '../../Events.js';
import { updateUser } from '../../../data/DatabasePouchDB.js';
import { getAllUsers } from '../../../data/DatabasePouchDB.js';
import { getUserById } from '../../../data/DatabasePouchDB.js';
import { toMap, fields } from '../../helpers/SettingsData.js';

// view: create-2
export class ProfileView {
    #profileViewElm = null;
    #credentialsSection = null;
    #profileSection = null;
    #preferencesSection = null;
    #housingSection = null;
    #user = null;
    #settingsFns = null;
    #requiredFields = null;

    constructor() {
        this.#events = Events.events();
        localStorage.setItem('user', JSON.stringify(users[5]));
        this.#user = JSON.parse(localStorage.getItem('user')); 
    }

    async render() {
        this.#profileViewElm = document.createElement('div');
        this.#profileViewElm.id = 'profileView';

        // progress bar
        this.#profileViewElm.appendChild(await new ProgressBar(2).render());

        // page header
        this.#profileViewElm.innerHTML = `
        <form>
            <h2 class="battambang">Profile</h2>
        </form>
        `;

        // create page sections
        this.#credentialsSection = new CredentialsSection(
            this.#profileViewElm, this.#user
        );
        this.#profileSection = new ProfileSection(
            this.#profileViewElm, this.#user
        );
        this.#preferencesSection = new PreferencesSection(
            this.#profileViewElm
        );
        this.#housingSection = new HousingSection(
            this.#profileViewElm
        );

        // render sections
        await this.#credentialsSection.render(
            await this.#getNextButton(this.#profileViewElm)
        );
        await this.#profileSection.render(
            await this.#getNextButton(this.#profileViewElm)
        );
        this.#user.hasHousing
            ? await this.#housingSection.render(
                await this.#getNextButton(this.#profileViewElm)
              )
            : await this.#preferencesSection.render(
                await this.#getNextButton(this.#profileViewElm)
              );

        // fill HTML fields with the user's saved values
        this.#settingsFns = new SettingsFns(
            this.#profileViewElm, this.#user
        ).getFns();
        this.#fillFields(this.#profileViewElm);

        // set up form validation
        this.#validationSetup()
        
        return this.#profileViewElm;
    }

    /**
     * Render Next button.
     */
    async #getNextButton() {
        const elm = document.createElement('div');
        elm.classList.add('buttons');

        // create next button
        const nextElm = await new Button(
            'Next', 80, 'submit'
        ).render();
        nextElm.id = 'nextBtn';

        // click event listener
        nextElm.addEventListener('click', async (e) => {
            e.preventDefault();
            if (this.#validateForm()) {
                this.#saveChanges();
                this.#events.publish('navigateTo', 'create-3');
            }
        });

        elm.appendChild(nextElm);
        return elm;
    }

    /**
     * Fills the HTML elements with the user's saved values. Used for
     * initialization.
     */
    #fillFields() {
        this.#settingsFns.forEach((field) => field.fill());
    }

    #saveChanges() {
        this.#settingsFns.forEach((field) => field.save());

        // save new configuration
        localStorage.setItem('user', JSON.stringify(this.#user));

        // get settings functions with new user value
        this.#settingsFns = new SettingsFns(
            this.#profileViewElm, this.#user
        ).getFns();
    }

    #validationSetup() {
        this.#requiredFields = [
            ...this.#credentialsSection.requiredFields(),
            ...this.#profileSection.requiredFields(),
            ...this.#preferencesSection.requiredFields(),
            ...this.#housingSection.requiredFields()
        ]

        // set required property on required fields to true
        this.#requiredFields.forEach((id) => {
            const elm = this.#profileViewElm.querySelector(`#settings_${id}`);
            if (elm) elm.required = true
        });
    }

    #validateForm() {
        const invalid = this.#requiredFields.some((id) =>
            !this.#profileViewElm.querySelector(`#settings_${id}`).checkValidity()
        );
        if (invalid) {
            alert('Make sure all required fields are filled out (the starred ones!)');
            return false;
        }
        return true;
    }
}

class CredentialsSection {
    #parent = null;

    /**
     * Credentials section of the Profile view.
     * @param {HTMLDivElement} parent - Profile view
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
     * Profile section of the Profile view.
     * @param {HTMLDivElement} parent - Profile view
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
        const subgroup1 = document.createElement('div');
        subgroup1.classList.add('subgroup');
        subgroup1.appendChild(await new TextInput('Nickname', 'text', 118).render());
        subgroup1.appendChild(await new TextInput('Age*', 'text', 118).render());
        elm.appendChild(subgroup1);

        // subgroup (inputs are half-width): gender identity + pronouns
        const subgroup2 = document.createElement('div');
        subgroup2.classList.add('subgroup');
        subgroup2.appendChild(await new DropdownInput(
            'Gender identity*', fields.genderId, 149.2
        ).render());
        subgroup2.appendChild(await new TextInput('Pronouns', 'text', 118).render());
        elm.appendChild(subgroup2);

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
        elm.appendChild(await new DropdownInput('Level of education', fields.level).render());

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
     * Preferences section of the Profile view.
     * @param {HTMLDivElement} parent - Profile view
     */
    constructor(parent) {
        this.#parent = parent;
    }

    /**
     * Renders Preferences section.
     * @param {HTMLDivElement} - Buttons to render at bottom of section
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
        const boxes = toMap(fields.genderIncl);
        return await new CheckboxGroup('Gender inclusivity', boxes).render();
    }

    async renderLeaseLength() {
        const boxes = toMap(fields.leaseLength);
        return await new CheckboxGroup('Lease length', boxes).render();
    }

    async renderLeaseType() {
        const boxes = toMap(fields.leaseType);
        return await new CheckboxGroup('Lease type', boxes).render();
    }

    async renderRoomType() {
        const boxes = toMap(fields.roomType);
        return await new CheckboxGroup('Room type', boxes).render();
    }

    async renderBuildingType() {
        const boxes = toMap(fields.buildingType);
        return await new CheckboxGroup('Building type', boxes).render();
    }
    
    async renderTimeframe() {
        const boxes = toMap(fields.timeframe);
        return await new CheckboxGroup('Move-in period', boxes).render();
    }

    async renderAmenities() {
    const boxes = toMap(fields.amenities);

    const elm = await new CheckboxGroup('Amenities', boxes, 4).render();
    elm.classList.add('amenities');

    // to differentiate it from Housing section's amenities
    elm.id = `${elm.id}P`
    elm.querySelectorAll('label').forEach((e) => e.htmlFor = `${e.htmlFor}P`);
    elm.querySelectorAll('input').forEach((e) => e.id = `${e.id}P`);

    return elm;
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
     * Housing section of the Profile view.
     * @param {HTMLDivElement} parent - Profile view
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

        section.appendChild(await this.renderCityCol());
        section.appendChild(await this.renderGenderCol());
        section.appendChild(await this.renderTypeCol());
        section.appendChild(await this.renderUtilities());
        section.appendChild(await this.renderDetails());
        section.appendChild(await this.renderAmenities());

        // TODO: implement pics

        elm.appendChild(header);
        elm.appendChild(section);
        elm.appendChild(buttons);
        this.#parent.appendChild(elm);
    }

    async renderCityCol() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput('City*').render());
        elm.appendChild(await this.renderRent());

        // subgroup (inputs are half-width): number of beds and baths
        const brba = document.createElement('div');
        brba.classList.add('subgroup');
        brba.appendChild(await new TextInput('No. beds*', 'text', 118).render());
        brba.appendChild(await new TextInput('No. baths*', 'text', 118).render());
        elm.appendChild(brba);

        return elm;
    }

    async renderGenderCol() {
        const elm = document.createElement('div');

        elm.appendChild(await new DropdownInput(
            'Gender inclusivity*', fields.genderIncl
        ).render());

        elm.appendChild(await new DropdownInput(
            'Move-in period*', fields.timeframe
        ).render());

        elm.appendChild(await new DropdownInput(
            'Lease length*', fields.leaseLength
        ).render());

        return elm;
    }

    async renderTypeCol() {
        const elm = document.createElement('div');

        elm.appendChild(await new DropdownInput(
            'Lease type*', fields.leaseType
        ).render());

        elm.appendChild(await new DropdownInput(
            'Room type*', fields.roomType
        ).render());
        
        elm.appendChild(await new DropdownInput(
            'Building type*', fields.buildingType
        ).render());

        return elm;
    }    

    async renderRent() {
        const elm = document.createElement('div');
        elm.classList.add('subgroup', 'rent');

        const dollarSign = document.createElement('span');
        dollarSign.classList.add('dollar-sign');
        dollarSign.innerText = '$';

        const slash = document.createElement('span');
        slash.classList.add('slash');
        slash.innerText = '/';
        
        elm.appendChild(dollarSign);

        elm.appendChild(await new TextInput(
            'Rent for room*', 'text', 103
        ).render());

        elm.appendChild(slash);

        elm.appendChild(await new DropdownInput(
            'Period*', fields.rentPeriod, 133
        ).render());

        return elm;
    }

    async renderDetails() {
        const elm = await new TextAreaInput(
            'Details', 'Anything else you want to mention!'
        ).render();
        elm.classList.add('details');
        return elm;
    }

