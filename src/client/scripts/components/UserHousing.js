// created by Ashley Bhandari

import { DropdownInput } from './DropdownInput.js';
import { CheckboxGroup } from './CheckboxGroup.js';
import { TextAreaInput } from './TextAreaInput.js';
import { TextInput } from './TextInput.js';
import { getHousingFields } from '../helpers/userConfigHelper.js';
import { fields, toMap } from '../helpers/userConfigFields.js';

export class UserHousing {
    #userHousingElm = null;

    /**
     * UI component: Input fields for user's housing information.
     * @param {string} page - Page in which component is rendered
     */
    constructor(page) {
        this.page = page;
    }

    async render() {
        this.#userHousingElm = document.createElement('div');
        this.#userHousingElm.classList.add('user-housing');

        // render grid with inputs
        this.#userHousingElm.appendChild(await this.#renderCityCol());
        this.#userHousingElm.appendChild(await this.#renderGenderCol());
        this.#userHousingElm.appendChild(await this.#renderTypeCol());
        this.#userHousingElm.appendChild(await this.#renderUtilities());
        this.#userHousingElm.appendChild(await this.#renderDetails());
        this.#userHousingElm.appendChild(await this.#renderAmenities());

        // make some fields required
        this.#setupValidation();

        // prepend all field id's with page name
        this.#initIds();

        return this.#userHousingElm;
    }

    /**
     * Gets a list of ids for required fields
     * @param {string} [page] - page with which ids should be prepended
     * @returns {string[]}
     */
    getRequiredIds(page) {
        const ids = getHousingFields()
            .map((field) => field.id)
            .filter((id) => id.endsWith('Input') || id.endsWith('Drpdwn'));
        
        return page ? ids.map((id) =>`${page}_${id}`) : ids;
    }

    /**
     * Sets "required" property of required fields to true.
     */
    #setupValidation() {
        this.getRequiredIds().forEach((id) => {
            this.#userHousingElm.querySelector('#' + id).required = true;
        });
    }

    /**
     * Prepends all field id's with the page name (changes name and label
     * accordingly if necessary). Prevents conflicts if multiple views use this
     * component.
     */
    #initIds() {
        getHousingFields()
            .map((field) => field.id)
            .forEach((id) => {
                const elm = this.#userHousingElm.querySelector(`#${id}`);
                const label = this.#userHousingElm.querySelector(`label[for="${id}"]`);

                if (elm) {
                    elm.id = `${this.page}_${id}`;
                    if (elm.name) elm.setAttribute('name', elm.id);
                    if (label)    label.htmlFor = elm.id;
                }
            });
    }

    /**
     * Fields for city, no. beds, and no. baths
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderCityCol() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput('City*').render());
        elm.appendChild(await this.#renderRent());

        // subgroup (inputs are half-width): number of beds and baths
        const brba = document.createElement('div');
        brba.classList.add('subgroup');
        brba.appendChild(await new TextInput('No. beds*', 'text', 118).render());
        brba.appendChild(await new TextInput('No. baths*', 'text', 118).render());
        elm.appendChild(brba);

        return elm;
    }

    /**
     * Fields for gender inclusivity, move-in period, and lease length
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderGenderCol() {
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

    /**
     * Fields for lease, room, and building types
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderTypeCol() {
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

    /**
     * Fields for rent and time period
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderRent() {
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

    /**
     * Field for additional user-inputted details
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderDetails() {
        const elm = await new TextAreaInput(
            'Details', 'Anything else you want to mention!'
        ).render();
        elm.classList.add('details');
        return elm;
    }

    /**
     * Fields for utilities included with rent
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderUtilities() {
        const boxes = toMap(fields.utilities);
        return await new CheckboxGroup(
            'Utilities included in rent*', boxes, 2
        ).render();
    }

    /**
     * Fields for amenities
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderAmenities() {
        const boxes = toMap(fields.amenities);
        const elm = await new CheckboxGroup('Amenities*', boxes, 4).render();
        elm.classList.add('amenities');
        return elm;
    }
}