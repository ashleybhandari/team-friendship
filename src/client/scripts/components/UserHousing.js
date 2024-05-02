// created by Ashley Bhandari
import { DropdownInput } from './DropdownInput.js';
import { CheckboxGroup } from './CheckboxGroup.js';
import { TextAreaInput } from './TextAreaInput.js';
import { TextInput } from './TextInput.js';
import { fields, toMap } from '../helpers/settingsData.js';

export class UserHousing {
    /**
     * UI component: Input fields for user's housing information.
     * @param {string} page - Page in which component is rendered
     */
    constructor(page) {
        this.page = page;
    }

    async render() {
        const elm = document.createElement('div');
        elm.classList.add('user-housing');

        // render grid with inputs
        elm.appendChild(await this.#renderCityCol());
        elm.appendChild(await this.#renderGenderCol());
        elm.appendChild(await this.#renderTypeCol());
        elm.appendChild(await this.#renderUtilities());
        elm.appendChild(await this.#renderDetails());
        elm.appendChild(await this.#renderAmenities());

        // prepend all field id's with page name
        this.#initIds(elm);

        return elm;
    }

    /**
     * List all field id's, prepending with page if a page name is provided.
     * @param {string} [page=null] - Name of page
     * @returns {string[]}
     */
    getFieldIds(page = null) {
        const ids = [
            'cityInput',
            'rentForRoomInput',
            'periodDrpdwn',
            'noBedsInput',
            'noBathsInput',
            'genderInclusiviDrpdwn',
            'moveInPeriodDrpdwn',
            'leaseLengthDrpdwn',
            'leaseTypeDrpdwn',
            'roomTypeDrpdwn',
            'buildingTypeDrpdwn',
            'electricityBox',
            'gasBox',
            'waterBox',
            'trashBox',
            'sewerBox',
            'internetBox',
            'snowRemovalBox',
            'detailsArea',
            'airConditioningBoxH',
            'dishwasherBoxH',
            'hardwoodFloorsBoxH',
            'carpetFloorsBoxH',
            'onSiteLaundryBoxH',
            'residentialParkBoxH',
            'nearbyBusStopBoxH',
            'petFriendlyBoxH'
        ];

        return ids.map((id) => page ? `${page}_${id}` : `${id}`);
    }

    /**
     * Prepends all field id's with the page name (changes name and label
     * accordingly if necessary). Prevents conflicts if multiple views use this
     * component.
     * @param {HTMLDivElement} container 
     */
    #initIds(container) {
        this.getFieldIds().forEach((id) => {
            const elm = container.querySelector(`#${id}`);
            const label = container.querySelector(`label[for="${id}"]`);

            if (elm)      elm.id = `${this.page}_${id}`;
            if (elm.name) elm.setAttribute('name', elm.id);
            if (label)    label.htmlFor = elm.id;
        });
    }

    /**
     * Fields for city, no. beds, and no. baths
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderCityCol() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput('City').render());
        elm.appendChild(await this.#renderRent());

        // subgroup (inputs are half-width): number of beds and baths
        const brba = document.createElement('div');
        brba.classList.add('subgroup');
        brba.appendChild(await new TextInput('No. beds', 'text', 118).render());
        brba.appendChild(await new TextInput('No. baths', 'text', 118).render());
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

    /**
     * Fields for lease, room, and building types
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderTypeCol() {
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
            'Rent for room', 'text', 103
        ).render());

        elm.appendChild(slash);

        elm.appendChild(await new DropdownInput(
            'Period', fields.rentPeriod, 133
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
            'Utilities included in rent', boxes, 2
        ).render();
    }

    /**
     * Fields for amenities
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderAmenities() {
        const boxes = toMap(fields.amenities);
        const elm = await new CheckboxGroup('Amenities', boxes, 4).render();
        elm.classList.add('amenities');
        return elm;
    }
}