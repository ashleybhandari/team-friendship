// created by Ashley Bhandari
import { DropdownInput } from './DropdownInput.js';
import { CheckboxGroup } from './CheckboxGroup.js';
import { TextAreaInput } from './TextAreaInput.js';
import { TextInput } from './TextInput.js';
import { fields, toMap } from '../helpers/settingsData.js';

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
}