// created by Ashley Bhandari

import { Button } from '../../components/Button.js';
import { TextInput } from '../../components/TextInput.js';
import { UserHousing } from '../../components/UserHousing.js';
import { UserPreferences } from '../../components/UserPreferences.js';
import { UserProfile } from '../../components/UserProfile.js';
import { Events } from '../../Events.js';
import * as helper from '../../helpers/userConfigHelper.js';
import { users } from '../../../data/MockData.js';

// view: 'settings'
export class SettingsView {
    #settingsViewElm = null;
    #userProfile = null;
    #userHousing = null;
    #userPreferences = null;
    #events = null;

    #user = null;           // current user
    #requiredFields = null; // required fields

    constructor() {
        this.#events = Events.events();

        // Published by SignInView, HaveHousingView, and NeedHousing View.
        // Loads the view according to the user's preferences and saved 
        // likes/rejects/matches
        this.#events.subscribe('newUser', (user) => this.render(user));
    }
    /**
     * Lets the user change their configuration. Injected into SignedInContainer.
     * @returns {Promise<HTMLDivElement>}
     */
    async render(user) {
        // DB TODO: replace all localStorage stuff with PouchDB when it works
        
        // if user has not signed in, mock user is used for backdoor entry
        if (!user) {
            this.#settingsViewElm = document.createElement('div');
            this.#settingsViewElm.id = 'settingsView';
            this.#user = users[1];
        } else {
            this.#user = user;
            this.#settingsViewElm.innerHTML = '';
        }

        localStorage.setItem('user', JSON.stringify(this.#user));
        this.#user = JSON.parse(localStorage.getItem('user'));

        // page header
        this.#settingsViewElm.innerHTML = `
        <form>
            <h2 class="battambang">Settings</h2>
        </form>
        `;

        // render page sections
        await this.#renderCredentials();
        await this.#renderProfile();
        this.#user.hasHousing
            ? await this.#renderHousing()
            : await this.#renderPreferences();

        // fill HTML fields with the user's saved values
        this.#fillFields();

        // set up form validation // TODO
        // this.#requiredFields = settingsFnsObj.getFields();
        // this.#validationSetup()
        
        return this.#settingsViewElm;
    }
    
    /**
     * Render Revert changes and Save buttons.
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderButtons() {
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
        const args = [this.#settingsViewElm, this.#user, 'settings'];

        // fill email field
        this.#settingsViewElm.querySelector('#emailInput').value = this.#user.email;

        // fill Profile section
        helper.fillProfileFields(...args);

        // fill Housing or Preferences section
        this.#user.hasHousing
            ? helper.fillHousingFields(...args)
            : helper.fillPreferencesFields(...args);
    }

    /**
     * Save any changes made. Alert if a required field was missed.
     */
    #saveChanges() {
        // const invalid = this.#requiredFields.some((id) => {
        //     const elm = this.#settingsViewElm.querySelector(`#settings_${id}`);
        //     if (elm) return !elm.checkValidity()
        //     return false;
        // } // TODO
            
        // );
        // if (invalid) {
        //     alert('Make sure all required fields are filled out (the starred ones)!');
        //     return;
        // }

        helper.saveProfileFields(this.#settingsViewElm, this.#user, 'settings');

        this.#user.hasHousing
            ? helper.saveHousingFields(this.#settingsViewElm, this.#user, 'settings')
            : helper.savePreferencesFields(this.#settingsViewElm, this.#user, 'settings');

        // save new configuration
        localStorage.setItem('user', JSON.stringify(this.#user));
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

    async #renderCredentials() {
        const elm = document.createElement('div');
        elm.id = 'credentials-section';
        elm.classList.add('section');
        
        // "Credentials" header
        const header = document.createElement('h3');
        header.innerText = 'Credentials';

        // container for section content
        const section = document.createElement('div');
        section.id = 'credentials-content';
        section.appendChild(await new TextInput('Email').render());
        section.appendChild(await new TextInput('Password').render());

        // revert changes and save buttons
        const buttons = await this.#renderButtons();

        elm.appendChild(header);
        elm.appendChild(section);
        elm.appendChild(buttons);
        this.#settingsViewElm.appendChild(elm);
    }

    async #renderProfile() {
        const elm = document.createElement('div');
        elm.id = 'profile-section';
        elm.classList.add('section');
        
        // "Profile" header
        const header = document.createElement('h3');
        header.innerText = 'Profile';
        elm.appendChild(header);

        // section content
        this.#userProfile = new UserProfile('settings');
        elm.appendChild(await this.#userProfile.render());
        
        // revert changes and save buttons
        elm.appendChild(await this.#renderButtons());

        this.#settingsViewElm.appendChild(elm);
    }

    async #renderHousing() {
        const elm = document.createElement('div');
        elm.id = 'housing-section';
        elm.classList.add('section');
        
        // "Your housing" header
        const header = document.createElement('h3');
        header.innerText = 'Your housing';
        elm.appendChild(header);

        // section content
        this.#userHousing = new UserHousing('settings');
        elm.appendChild(await this.#userHousing.render());

        // revert changes and save buttons
        elm.appendChild(await this.#renderButtons());

        this.#settingsViewElm.appendChild(elm);
    }

    async #renderPreferences() {
        const elm = document.createElement('div');
        elm.id = 'preferences-section';
        elm.classList.add('section');
        
        // "Your preferences" header
        const header = document.createElement('h3');
        header.innerText = 'Your preferences';
        elm.appendChild(header);

        // section content
        this.#userPreferences = new UserPreferences('settings');
        elm.appendChild(await this.#userPreferences.render());

        // revert changes and save buttons
        elm.appendChild(await this.#renderButtons());

        this.#settingsViewElm.appendChild(elm);
    }
}