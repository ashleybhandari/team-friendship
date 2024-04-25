// created by Ashley Bhandari

import { Button } from '../../components/Button.js';
import { CheckboxGroup } from '../../components/CheckboxGroup.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { SliderInput } from '../../components/SliderInput.js';
import { TextAreaInput } from '../../components/TextAreaInput.js';
import { TextInput } from '../../components/TextInput.js';
import { SettingsFns } from '../../helpers/SettingsFns.js';
import { toMap, fields } from '../../helpers/SettingsData.js';
import { users } from '../../../data/MockData.js';

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

    #user = null;           // current user
    #settingsFns = null;    // functions fill and save each field
    #requiredFields = null; // required fields

    constructor() {
        // DB TODO: remove users import, replace all localStorage stuff w PouchDB
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
        const settingsFnsObj = new SettingsFns(
            this.#settingsViewElm, this.#user
        );
        this.#settingsFns = settingsFnsObj.getFns();
        this.#fillFields(this.#settingsViewElm);

        // set up form validation
        this.#requiredFields = settingsFnsObj.getFields();
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
        const saveElm = await new Button(
            'Save', 80, 'submit'
        ).render();
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
        const invalid = this.#requiredFields.some((id) => {
            const elm = this.#settingsViewElm.querySelector(`#settings_${id}`);
            if (elm) return !elm.checkValidity()
            return false;
        }
            
        );
        if (invalid) {
            alert('Make sure all fields are filled out!');
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
        // set required property on required fields to true
        this.#requiredFields.forEach((id) => {
            const elm = this.#settingsViewElm.querySelector(`#settings_${id}`);
            if (elm) elm.required = true
        });
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

        section.appendChild(await new TextInput('Email').render());
        section.appendChild(await new TextInput('Password').render());

        elm.appendChild(header);
        elm.appendChild(section);
        elm.appendChild(buttons);
        this.#parent.appendChild(elm);
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

        // TODO: implement user avatar
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
        section.appendChild(await this.#renderSliders());

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
        elm.appendChild(await new TextInput('First name').render());

        // subgroup (inputs are half-width): nickname + age
        const grp1 = document.createElement('div');
        grp1.classList.add('subgroup');
        grp1.appendChild(await new TextInput('Nickname', 'text', 118).render());
        grp1.appendChild(await new TextInput('Age', 'text', 118).render());

        // subgroup (inputs are half-width): gender identity + pronouns
        const grp2 = document.createElement('div');
        grp2.classList.add('subgroup');
        grp2.appendChild(await new DropdownInput(
            'Gender identity', fields.genderId, 149.2
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
     * @returns {HTMLDivElement} - All 4 sliders
     */
    async #renderSliders() {
        const sliders = document.createElement('div');
        sliders.classList.add('sliders');

        sliders.appendChild(await new SliderInput(
            'Cleanliness', 'not clean', 'very clean'
        ).render());

        sliders.appendChild(await new SliderInput(
            'Sleeping habits', 'early bird', 'night owl'
        ).render());

        sliders.appendChild(await new SliderInput(
            'Noise when studying', 'very quiet', 'noise is okay'
        ).render());

        sliders.appendChild(await new SliderInput(
            'Hosting guests', 'never', 'frequent'
        ).render());

        return sliders;
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

        // TODO: implement housing pics

        elm.appendChild(header);
        elm.appendChild(section);
        elm.appendChild(buttons);
        this.#parent.appendChild(elm);
    }

    async renderCityCol() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput('City').render());
        elm.appendChild(await this.renderRent());

        // subgroup (inputs are half-width): number of beds and baths
        const brba = document.createElement('div');
        brba.classList.add('subgroup');
        brba.appendChild(await new TextInput('No. beds', 'text', 118).render());
        brba.appendChild(await new TextInput('No. baths', 'text', 118).render());
        elm.appendChild(brba);

        return elm;
    }

    async renderGenderCol() {
        const elm = document.createElement('div');

        elm.appendChild(await new DropdownInput(
            'Gender inclusivity', fields.genderIncl
        ).render());

        elm.appendChild(await new DropdownInput(
            'Move-in period', fields.timeframe
        ).render());

        elm.appendChild(await new DropdownInput(
            'Lease length', fields.leaseLength
        ).render());

        return elm;
    }

    async renderTypeCol() {
        const elm = document.createElement('div');

        elm.appendChild(await new DropdownInput(
            'Lease type', fields.leaseType
        ).render());

        elm.appendChild(await new DropdownInput(
            'Room type', fields.roomType
        ).render());
        
        elm.appendChild(await new DropdownInput(
            'Building type', fields.buildingType
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
            'Rent for room', 'text', 103
        ).render());

        elm.appendChild(slash);

        elm.appendChild(await new DropdownInput(
            'Period', fields.rentPeriod, 133
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
}