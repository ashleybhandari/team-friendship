// created by Ashley Bhandari

import { CheckboxGroup } from './CheckboxGroup.js';
import { TextInput } from './TextInput.js';
import { getPreferencesFields } from '../helpers/userConfigHelper.js';
import { fields, toMap } from '../helpers/userConfigFields.js';

export class UserPreferences {
    /**
     * UI component: Input fields for user's preference information.
     * @param {string} page - Page in which component is rendered
     */
    constructor(page) {
        this.page = page;
    }

    async render() {
        const elm = document.createElement('div');
        elm.classList.add('user-preferences');

        // render grid with inputs
        elm.appendChild(await this.#renderTextInput());
        elm.appendChild(await this.#renderGender());
        elm.appendChild(await this.#renderTimeframe());
        elm.appendChild(await this.#renderLeaseLength());
        elm.appendChild(await this.#renderLeaseType());
        elm.appendChild(await this.#renderRoomType());
        elm.appendChild(await this.#renderBuildingType());
        elm.appendChild(await this.#renderAmenities());

        // prepend all field id's with page name
        this.#initIds(elm);

        return elm;
    }

    /**
     * Prepends all field id's with the page name (changes name and label
     * accordingly if necessary). Prevents conflicts if multiple views use this
     * component.
     * @param {HTMLDivElement} container 
     */
    #initIds(container) {
        getPreferencesFields()
            .map((field) => field.id)
            .forEach((id) => {
                const elm = container.querySelector(`#${id}`);
                const label = container.querySelector(`label[for="${id}"]`);

                if (elm) {
                    elm.id = `${this.page}_${id}`;
                    if (elm.name) elm.setAttribute('name', elm.id);
                    if (label)    label.htmlFor = elm.id;
                }
            });
    }

    /**
     * Fields for cities, rent, and number of occupants
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderTextInput() {
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
     * Checkboxes for gender inclusivity
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderGender() {
        const boxes = toMap(fields.genderIncl);
        return await new CheckboxGroup('Gender inclusivity', boxes).render();
    }

    /**
     * Checkboxes for lease length
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderLeaseLength() {
        const boxes = toMap(fields.leaseLength);
        return await new CheckboxGroup('Lease length', boxes).render();
    }

    /**
     * Checkboxes for lease type
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderLeaseType() {
        const boxes = toMap(fields.leaseType);
        return await new CheckboxGroup('Lease type', boxes).render();
    }

    /**
     * Checkboxes for room type
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderRoomType() {
        const boxes = toMap(fields.roomType);
        return await new CheckboxGroup('Room type', boxes).render();
    }

    /**
     * Checkboxes for building type
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderBuildingType() {
        const boxes = toMap(fields.buildingType);
        return await new CheckboxGroup('Building type', boxes).render();
    }
    
    /**
     * Checkboxes for move-in period
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderTimeframe() {
        const boxes = toMap(fields.timeframe);
        return await new CheckboxGroup('Move-in period', boxes).render();
    }

    /**
     * Checkboxes for gender amenities
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderAmenities() {
        const boxes = toMap(fields.amenities);
        const elm = await new CheckboxGroup('Amenities (select at least one)', boxes, 4).render();
        elm.classList.add('amenities');
        return elm;
    }
}