// created by Isha Bang
import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';
import { Events } from '../../Events.js';
import { CheckboxInput } from '../../components/CheckboxInput.js';
import { TextInput } from '../../components/TextInput.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { SettingsFns } from '../../helpers/SettingsFns.js';
import { getCurrentUser } from '../../../data/MockBackend.js';


export class NeedHousingView {
    #preferencesSection = null;
    #user = null;
    #queryFns = null;
    #requiredFields = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const user = await getCurrentUser();
        localStorage.setItem('user', JSON.stringify(user));
        this.#user = JSON.parse(localStorage.getItem('user'));

        const needHousingViewElm = document.createElement('div');
        needHousingViewElm.id = 'needHousingView';

        needHousingViewElm.appendChild(await new ProgressBar(4).render());

        const headerContainer = document.createElement('div');
        headerContainer.style.textAlign = 'center'; 
    
        const preferencesHeader = document.createElement('h1');
        preferencesHeader.innerText = 'Tell us your preferences';
        preferencesHeader.classList.add('preferences-header', 'battambang');
        headerContainer.appendChild(preferencesHeader);

        const preferencesNote = document.createElement('p');
        preferencesNote.innerText = "we'll use this to set up your feed";
        preferencesNote.classList.add('preferences-note');
        headerContainer.appendChild(preferencesNote);
    
        needHousingViewElm.appendChild(headerContainer);

        this.#preferencesSection = new PreferencesSection(needHousingViewElm);
        
        await this.#preferencesSection.render();

        const needHousingForm = needHousingViewElm.querySelector('#needHousingForm');
        if (needHousingForm) {
            needHousingForm.addEventListener('submit', this.handleSubmit.bind(this));
        } else {
            console.error("Element with ID 'needHousingForm' not found");
        }

        const navigation = await new Navigation('create-3', 'discover', [], true).render();
        needHousingViewElm.appendChild(navigation);

        this.#queryFns = new SettingsFns(needHousingViewElm, this.#user); 

        this.#validationSetup(needHousingViewElm);
        
        return needHousingViewElm;
    }

    async handleSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const userData = Object.fromEntries(formData.entries());

        try {
            console.log('Updating user:', userData);
            alert('Preferences saved successfully!');
            this.#events.publish('navigateTo', 'create-4');
        } catch (error) {
            console.error('Error updating preferences:', error);
            alert('Error updating preferences: ' + error.message);
        }
    }

    // async handleSubmit(event) {
    //     event.preventDefault();
    // }

    #fillFields(parent) {
        this.#queryFns.getFns().forEach((field) => field.fill());
    }

    #validationSetup(parent) {
        this.#requiredFields = this.#preferencesSection.requiredFields();

        this.#requiredFields.forEach((query) =>
            parent.querySelector(query).required = true
        );
    }
}

export class PreferencesSection {
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
        const section = document.createElement('div');
        section.id = 'preferences';
        section.classList.add('section');

        section.appendChild(await this.renderCol1());
        section.appendChild(await this.renderCol2());
        section.appendChild(await this.renderCol3());

        this.#parent.appendChild(section);
    }

    /**
     * Renders column 1 of the Preferences section.
     * @returns {Promise<HTMLDivElement>}
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
     * @returns {Promise<HTMLDivElement>}
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
     * @returns {Promise<HTMLDivElement>}
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
