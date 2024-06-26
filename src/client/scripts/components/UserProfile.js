// created by Ashley Bhandari

import { DropdownInput } from './DropdownInput.js';
import { TextAreaInput } from './TextAreaInput.js';
import { TextInput } from './TextInput.js';
import { SliderInput } from './SliderInput.js';
import { getProfileFields } from '../helpers/userConfigHelper.js';
import { fields } from '../helpers/userConfigFields.js';

export class UserProfile {
    #userProfileElm = null;

    /**
     * UI component: Input fields for user's profile information.
     * @param {string} page - Page in which the component is rendered
     */
    constructor(page) {
        this.page = page;
    }

    async render() {
        this.#userProfileElm = document.createElement('div');
        this.#userProfileElm.classList.add('user-profile');

        const avatar = document.createElement('div');
        avatar.innerHTML = `
        <p>Upload your avatar:</p>
        <input type="file" id="avatar" name="avatar">
        `;

        // row 1: avatar, identity info, education info
        this.#userProfileElm.appendChild(avatar);
        this.#userProfileElm.appendChild(await this.#renderIdentity());
        this.#userProfileElm.appendChild(await this.#renderEducation());

        // row 2: bio, social media
        this.#userProfileElm.appendChild(await new TextAreaInput(
            'Write a short bio',
            'Lifestyle, hobbies, routines, allergies...'
        ).render());
        this.#userProfileElm.appendChild(await this.#renderSocials());

        // row 3-4: characteristics, is user looking for roommates or housing
        this.#userProfileElm.appendChild(await this.#renderSliders());

        // make some fields required
        this.#setupValidation();

        // prepend all field id's with page name
        this.#initIds();

        return this.#userProfileElm;
    }

    /**
     * Gets a list of ids for required fields
     * @param {string} [page] - page with which ids should be prepended
     * @returns {string[]}
     */
    getRequiredIds(page) {
        const ids = [
            'firstNameInput',
            'ageInput',
            'genderIdentityDrpdwn'
        ];
        
        return page ? ids.map((id) =>`${page}_${id}`) : ids;
    }

    /**
     * Sets "required" property of required fields to true.
     */
    #setupValidation() {
        this.getRequiredIds().forEach((id) => {
            this.#userProfileElm.querySelector('#' + id).required = true;
        });
    }
    
    /**
     * Prepends all field id's with the page name (changes name and label
     * accordingly if necessary). Prevents conflicts if multiple views use this
     * component.
     */
    #initIds() {
        getProfileFields()
            .map((field) => field.id)
            .forEach((id) => {
                const elm = this.#userProfileElm.querySelector(`#${id}`);
                const label = this.#userProfileElm.querySelector(`label[for="${id}"]`);

                if (elm) {
                    elm.id = `${this.page}_${id}`;
                    if (elm.name) elm.setAttribute('name', elm.id);
                    if (label)    label.htmlFor = elm.id;
                }
            });
    }

    /**
     * Fields for first name, nickname + age, and gender identity + pronouns.
     * @returns {Promise<HTMLDivElement>}
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
            'Gender identity*', fields.genderId, 149.2
        ).render());
        grp2.appendChild(await new TextInput('Pronouns', 'text', 118).render());
        
        elm.appendChild(grp1);
        elm.appendChild(grp2);

        return elm;
    }

    /**
     * Fields for major, school, and level of education.
     * @returns {Promise<HTMLDivElement>}
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
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderSocials() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput('Facebook').render());
        elm.appendChild(await new TextInput('Instagram').render());

        return elm;
    }

    /**
     * Fields for slider elements.
     * @returns {Promise<HTMLDivElement>} - All 4 sliders
     */
    async #renderSliders() {
        const sliders = document.createElement('div');
        sliders.classList.add('sliders');

        sliders.appendChild(await new SliderInput(
            'Cleanliness*', 'not clean', 'very clean'
        ).render());

        sliders.appendChild(await new SliderInput(
            'Noise when studying*', 'very quiet', 'noise is okay'
        ).render());

        sliders.appendChild(await new SliderInput(
            'Sleeping habits*', 'early bird', 'night owl'
        ).render());

        sliders.appendChild(await new SliderInput(
            'Hosting guests*', 'never', 'frequent'
        ).render());

        return sliders;
    }
}