import { Button } from '../components/Button.js';

/**
 * Lets the user change their configuration. Injected into SignedInContainer.
 */
export class SettingsView {
    async render() {
        const settingsViewElm = document.createElement('div');
        settingsViewElm.id = 'settingsView';

        settingsViewElm.innerHTML = `
        <h2>Settings</h2>
        <h3>Credentials</h3>
        <div id="credentials"></div>
        <h3>Profile</h3>
        <div id="profile"></div>
        <h3>Your Preferences</h3>
        <div id="preferences"></div>
        <h3>Your Housing</h3>
        <div id="housing"></div>
        `;

        await this.#renderCredentials(settingsViewElm);
        await this.#renderProfile(settingsViewElm);
        await this.#renderPreferences(settingsViewElm);
        await this.#renderHousing(settingsViewElm);
        await this.#renderButtons(settingsViewElm);

        return settingsViewElm;
    }

    /**
     * Change User fields: email, password
     * @param {HTMLDivElement} container 
     */
    async #renderCredentials(container) {
        const elm = container.querySelector('#credentials');
    }

    /**
     * Change User fields: pic, name, age, gender, characteristics, school, socials, description, hasHousing
     * @param {HTMLDivElement} container 
     */
    async #renderProfile (container) {
        const elm = container.querySelector('#profile');
    }

    /**
     * Change Preferences fields
     * @param {HTMLDivElement} container 
     */
    async #renderPreferences (container) {
        const elm = container.querySelector('#preferences');
    }

    /**
     * Change Housing fields
     * @param {HTMLDivElement} container 
     */
    async #renderHousing (container) {
        const elm = container.querySelector('#housing');
    }
    
    /**
     * Render Revert changes and Save buttons
     * @param {HTMLDivElement} container 
     */
    async #renderButtons(container) {
        const elm = document.createElement('div');
        elm.classList.add('buttons');

        const revertElm = await new Button('Revert changes', 150, 'danger').render();
        const saveElm = await new Button('Save', 80).render();

        revertElm.addEventListener('click', this.#revertChanges);
        saveElm.addEventListener('click', this.#saveChanges);

        elm.appendChild(revertElm);
        elm.appendChild(saveElm);
        container.appendChild(elm);
    }

    /**
     * Reverts changes since last save.
     * @param {Event} e - "click" event
     */
    #revertChanges(e) {
        e.preventDefault();
    }

    /**
     * Save any changes made.
     * @param {Event} e - "click" event
     */
    #saveChanges(e) {
        e.preventDefault();
    }
}