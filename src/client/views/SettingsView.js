import { Button } from '../components/Button.js';
import { CheckboxInput } from '../components/CheckboxInput.js';
import { DropdownInput } from '../components/DropdownInput.js';
import { RadioInput } from '../components/RadioInput.js';
import { SliderInput } from '../components/SliderInput.js';
import { TextAreaInput } from '../components/TextAreaInput.js';
import { TextInput } from '../components/TextInput.js';
import { users } from '../data/Data.js'; // TODO: delete

/**
 * Lets the user change their configuration. Injected into SignedInContainer.
 */
export class SettingsView {
    constructor() {
        this.user = users[5]; // TODO
    }

    async render() {
        const settingsViewElm = document.createElement('div');
        settingsViewElm.id = 'settingsView';

        settingsViewElm.innerHTML = `
        <h2 class="battambang">Settings</h2>
        <h3>Credentials</h3>
        <div id="credentials" class="section"></div>
        <h3>Profile</h3>
        <div id="profile" class="section"></div>
        <h3>Your Preferences</h3>
        <div id="preferences" class="section"></div>
        <h3>Your Housing</h3>
        <div id="housing" class="section"></div>
        `;

        await this.#renderCredentials(settingsViewElm);
        await this.#renderProfile(settingsViewElm);
        // TODO: renderPreferences if user is looking for housing,
        // renderHousing otherwise
        await this.#renderPreferences(settingsViewElm);
        await this.#renderHousing(settingsViewElm);
        await this.#renderButtons(settingsViewElm);

        // TODO: validation for required elements

        return settingsViewElm;
    }

    /**
     * User fields: email, password
     * @param {HTMLDivElement} container 
     */
    async #renderCredentials(container) {
        const elm = container.querySelector('#credentials');

        elm.appendChild(await new TextInput('Email*', this.user.email).render());
        elm.appendChild(await new TextInput('Password').render());
    }

    /**
     * User fields: pic, name, age, gender, characteristics, education, socials, description, hasHousing
     * @param {HTMLDivElement} container 
     */
    async #renderProfile (container) {
        const elm = container.querySelector('#profile');

        // TODO: change avatar mechanism
        const avatar = document.createElement('div');
        avatar.innerHTML = `
        <p>Change your avatar:</p>
        <form action="/action_page.php">
            <input type="file" id="avatar" name="avatar">
        </form>
        `;

        // row 1: avatar, identity info, education info
        elm.appendChild(avatar);
        elm.appendChild(await this.#profileIdentity());
        elm.appendChild(await this.#profileEducation());

        // row 2: bio, social media
        elm.appendChild(await new TextAreaInput(
            'Tell us about yourself',
            this.user.description,
            'Lifestyle, hobbies, routines, allergies...'
        ).render());
        elm.appendChild(await this.#profileSocials());

        // row 3-4: characteristics, is user looking for roommates or housing
        const sliders = await this.#profileSliders();
        sliders.forEach((s) => elm.appendChild(s));
        elm.appendChild(await new RadioInput(
            'I am looking for...', ['roommates', 'housing'],
            this.user.hasHousing ? 0 : 1
        ).render());
    }

    /**
     * Preferences fields
     * @param {HTMLDivElement} container 
     */
    async #renderPreferences (container) {
        const elm = container.querySelector('#preferences');
    }

    /**
     * Housing fields
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

        const revertElm = await new Button(
            'Revert changes', 150, 'danger'
        ).render();
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

    /**
     * For Profile section. Creates a div containing fields for first name,
     * nickname + age, and gender identity + pronouns.
     * @returns {HTMLDivElement}
     */
    async #profileIdentity() {
        const elm = document.createElement('div');

        // first name
        elm.appendChild(await new TextInput(
            'First name*', this.user.name.fname
        ).render());

        // subgroup (inputs are half-width): nickname + age
        const grp1 = document.createElement('div');
        grp1.classList.add('subgroup');
        grp1.appendChild(await new TextInput(
            'Nickname', this.user.name.nname, 'text', 118
        ).render());
        grp1.appendChild(await new TextInput(
            'Age*', this.user.age, 'text', 118
        ).render());

        // subgroup (inputs are half-width): gender identity + pronouns
        const grp2 = document.createElement('div');
        grp2.classList.add('subgroup');
        grp2.appendChild(await new DropdownInput(
            'Gender identity*', ['Woman', 'Man', 'Nonbinary'],
            this.user.gender.identity, 149.2
        ).render());
        grp2.appendChild(await new TextInput(
            'Pronouns', this.user.gender.pronouns, 'text', 118
        ).render());
        
        elm.appendChild(grp1);
        elm.appendChild(grp2);

        return elm;
    }

    /**
     * For Profile section. Creates a div containing fields for major, school,
     * and level of education.
     * @returns {HTMLDivElement}
     */
    async #profileEducation() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput('Major', this.user.education.major).render());
        elm.appendChild(await new TextInput('School', this.user.education.school).render()); // TODO
        elm.appendChild(await new DropdownInput(
            'Level of education',
            ['Undergrad', 'Grad', 'Other'],
            this.user.education.level
        ).render());

        return elm;
    }

    /**
     * For Profile section. Creates a div containing fields for facebook and
     * instagram.
     * @returns {HTMLDivElement}
     */
    async #profileSocials() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput(
            'Facebook', this.user.socials.fb
        ).render());

        elm.appendChild(await new TextInput(
            'Instagram', this.user.socials.ig
        ).render());

        return elm;
    }

    /**
     * For Profile section. Creates an array of sliders.
     * @returns {HTMLDivElement[]}
     */
    async #profileSliders() {
        return [
            await new SliderInput(
                'Cleanliness*', 'not clean', 'very clean',
                this.user.character.clean
            ).render(),
            await new SliderInput(
                'Noise when studying*', 'very quiet', 'noise is okay',
                this.user.character.noise
            ).render(),
            await new SliderInput(
                'Sleeping habits*', 'early bird', 'night owl',
                this.user.character.sleep
            ).render(),
            await new SliderInput(
                'Hosting guests*', 'never', 'frequent',
                this.user.character.guests
            ).render()
        ];
    }
}