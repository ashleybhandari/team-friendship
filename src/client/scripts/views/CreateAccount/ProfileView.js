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
import { getUserById } from '../../../data/DatabasePouchDB.js';
import { toMap, fields } from '../../helpers/SettingsData.js';

export class ProfileView {
    #profileViewElm = null;
    #credentialsSection = null;
    #profileSection = null;
    #preferencesSection = null;
    #housingSection = null;
    #user = null;
    #settingsFns = null;
    #requiredFields = null;

    cconstructor() {
        this.#profileViewElm = document.createElement('div');
        this.#profileViewElm.id = 'profileView';

        // Load user data from storage or database
        // TODO: Replace localStorage with PouchDB
        localStorage.setItem('user', JSON.stringify(users[5])); // Mock data for testing
        this.#user = JSON.parse(localStorage.getItem('user'));
    }

    async render() {
        // progress bar
        this.#profileViewElm.appendChild(await new ProgressBar(2).render());

        // create page sections
        this.#credentialsSection = new CredentialsSection(this.#profileViewElm, this.#user);
        this.#profileSection = new ProfileSection(this.#profileViewElm, this.#user);
        this.#preferencesSection = new PreferencesSection(this.#profileViewElm);
        this.#housingSection = new HousingSection(this.#profileViewElm);

        // render sections
        await this.#credentialsSection.render(await this.#getButtons());
        await this.#profileSection.render(await this.#getButtons());
        this.#user.hasHousing
            ? await this.#housingSection.render(await this.#getButtons())
            : await this.#preferencesSection.render(await this.#getButtons());

        // fill HTML fields with the user's saved values
        this.#settingsFns = new SettingsFns(this.#profileViewElm, this.#user).getFns();
        this.#fillFields();

        // set up form validation
        this.#validationSetup();

        return this.#profileViewElm;
    }

    async #getButtons() {
        const elm = document.createElement('div');
        elm.classList.add('buttons');

        // create buttons
        const revertElm = await new Button('Revert changes', 150, 'danger').render();
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

    #fillFields() {
        // Fill HTML fields with the user's saved values
        this.#settingsFns.forEach((field) => field.fill());
    }

    #saveChanges() {
        // Save any changes made
        const invalid = this.#requiredFields.some((id) =>
            !this.#profileViewElm.querySelector(`#settings_${id}`).checkValidity()
        );
        if (invalid) {
            alert('Make sure all required fields are filled out (the starred ones!)');
            return;
        }

        this.#settingsFns.forEach((field) => field.save());

        // Save new configuration
        localStorage.setItem('user', JSON.stringify(this.#user));

        // Get settings functions with new user value
        this.#settingsFns = new SettingsFns(this.#profileViewElm, this.#user).getFns();
    }

    #validationSetup() {
        // Set up form validation
        this.#requiredFields = [
            ...this.#credentialsSection.requiredFields(),
            ...this.#profileSection.requiredFields(),
            ...this.#preferencesSection.requiredFields(),
            ...this.#housingSection.requiredFields()
        ]

        // Set required property on required fields to true
        this.#requiredFields.forEach((id) => {
            const elm = this.#profileViewElm.querySelector(`#settings_${id}`);
            if (elm) elm.required = true;
        });
    }
}

class CredentialsSection {
    #parent = null;
    #user = null;

    constructor(parent, user) {
        this.#parent = parent;
        this.#user = user;
    }

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

    requiredFields() {
        return ['emailInput'];
    }
}

class ProfileSection {
    #parent = null;
    #user = null;

    constructor(parent, user) {
        this.#parent = parent;
        this.#user = user;
    }

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
            'Gender identity*', fields.genderId, 149.2
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
            'Level of education', fields.level
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

    constructor(parent) {
        this.#parent = parent;
    }

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

    async renderUtilities() {
        const boxes = toMap(fields.utilities);
        return await new CheckboxGroup(
            'Utilities included in rent', boxes, 2
        ).render();
    }

    async renderAmenities() {
        const boxes = toMap(fields.amenities);

        const elm = await new CheckboxGroup('Amenities', boxes, 4).render();
        elm.classList.add('amenities');

        // to differentiate it from Preferences section's amenities
        elm.id = `${elm.id}H`
        elm.querySelectorAll('label').forEach((e) => e.htmlFor = `${e.htmlFor}H`);
        elm.querySelectorAll('input').forEach((e) => e.id = `${e.id}H`);

        return elm;
    }


    /**
     * @returns {string[]} - Array of id's for required fields
     */
    requiredFields() {
        return [
            'cityInput',
            'rentForRoomInput',
            'noBedsInput',
            'noBathsInput',
            'genderInclusiviDrpdwn',
            'moveInPeriodDrpdwn',
            'leaseLengthDrpdwn',
            'leaseTypeDrpdwn',
            'roomTypeDrpdwn',
            'buildingTypeDrpdwn'
        ];
    }
}

