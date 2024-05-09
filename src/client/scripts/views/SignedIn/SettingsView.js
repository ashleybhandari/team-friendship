// created by Ashley Bhandari

import { Button } from '../../components/Button.js';
import { TextInput } from '../../components/TextInput.js';
import { UserHousing } from '../../components/UserHousing.js';
import { UserPreferences } from '../../components/UserPreferences.js';
import { UserProfile } from '../../components/UserProfile.js';
import { Events } from '../../Events.js';
import * as configHelper from '../../helpers/userConfigHelper.js';
import * as db from '../../../data/DatabasePouchDB.js';

// view: 'settings'
export class SettingsView {
    #settingsViewElm = null;
    #userProfile = null;
    #userHousing = null;
    #userPreferences = null;
    #user = null;
    #events = null;

    constructor() {
        this.#events = Events.events();

        // Published by SignInView, HaveHousingView, and NeedHousing View.
        // Loads the view according to the user's preferences and saved 
        // likes/rejects/matches
        this.#events.subscribe('authenticated', (id) => this.render(id));
    }
    /**
     * Lets the user change their configuration. Injected into SignedInContainer.
     * @param {string} [userId] - id of currently signed-in user
     * @returns {Promise<HTMLDivElement>}
     */
    async render(userId = null) {
        if (!userId) {
            // page is empty if user hasn't signed in
            this.#settingsViewElm = document.createElement('div');
            this.#settingsViewElm.id = 'settingsView';
            return this.#settingsViewElm;
        } else {
            // get user if signed in
            try {
                this.#user = await db.getUserById(userId);
                this.#settingsViewElm.innerHTML = '';
            } catch (error) {
                console.log(`Error fetching ${userId}: ${error.message}`);
                return this.#settingsViewElm;
            }
        }

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
        await this.#fillFields();

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
        revertElm.addEventListener('click', async (e) => {
            e.preventDefault();
            await this.#fillFields();
        });
        saveElm.addEventListener('click', async (e) => {
            e.preventDefault();
            await this.#saveChanges();
        });

        elm.appendChild(revertElm);
        elm.appendChild(saveElm);

        return elm;
    }

    /**
     * Fills the HTML elements with the user's saved values. Used for
     * initialization and reverting changes.
     */
    async #fillFields() {
        try {
            const user = await db.getUserById(this.#user._id);
            const args = [this.#settingsViewElm, user, 'settings'];

            // email field
            const emailElm = this.#settingsViewElm.querySelector('#settings_emailInput');
            emailElm.value = user.email;

            // empty password field
            const passwordElm = this.#settingsViewElm.querySelector('#settings_passwordInput');
            passwordElm.value = '';

            // Profile section
            configHelper.fillProfileFields(...args);

            // Housing or Preferences section
            user.hasHousing
                ? configHelper.fillHousingFields(...args)
                : configHelper.fillPreferencesFields(...args);
        } catch (error) {
            console.log(`Error filling fields: ${error.message}`);
        }
    }

    /**
     * Save any changes made. Alert if a required field was missed.
     */
    async #saveChanges() {
        const invalid = this.#getRequiredIds().some((id) => {
            const elm = this.#settingsViewElm.querySelector('#' + id);
            return elm ? !elm.checkValidity() : false;
        });

        if (invalid) {
            alert('Make sure all required fields are filled out (the starred ones)!');
            return;
        }

        try {
            // get user from DB
            const user = await db.getUserById(this.#user._id);
            const args = [this.#settingsViewElm, user, 'settings'];

            // save email
            const emailElm = this.#settingsViewElm.querySelector('#settings_emailInput');
            user.email = emailElm.value;

            // TODO: save password

            // save Profile section
            configHelper.saveProfileFields(...args);

            // save Housing or Preferences section
            user.hasHousing
                ? configHelper.saveHousingFields(...args)
                : configHelper.savePreferencesFields(...args);

            // save new configuration
            await db.updateUser(user);
        } catch (error) {
            console.log(`Error updating settings: ${error.message}`);
        }
    }

    #getRequiredIds() {
        const ids = [];

        // email id
        ids.push('settings_emailInput');

        // Profile section ids
        ids.push(...this.#userProfile.getRequiredIds('settings'));

        // Housing section ids if section is rendered
        if (this.#user.hasHousing) {
            ids.push(...this.#userHousing.getRequiredIds('settings'));
        }

        return ids;
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

        // email field
        const emailElm = await new TextInput('Email').render();
        emailElm.querySelector('label').htmlFor = 'settings_emailInput';
        emailElm.querySelector('input').id = 'settings_emailInput';
        emailElm.querySelector('input').required = true;
        section.appendChild(emailElm);

        // password field
        const passwordElm = await new TextInput('Password').render();
        passwordElm.querySelector('label').htmlFor = 'settings_passwordInput';
        passwordElm.querySelector('input').id = 'settings_passwordInput';
        section.appendChild(passwordElm);

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