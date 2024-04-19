import { createElementId } from '../createElementId.js';

export class DropdownInput {
    /**
     * UI component: Dropdown with predefined options.
     * @param {string} name - Dropdown label
     * @param {string[]} elements - Options to select from
     * @param {number} [width=306.2] - Dropdown width (default matches TextInput)
     */
    constructor(name, elements, width = 306.2) {
        this.name = name;
        this.elements = elements;
        this.width = `${width}px`;
        this.height = '31.6px';
    }

    async render() {
        const id = createElementId(this.name, 'Drpdwn');

        const elm = document.createElement('div');
        elm.classList.add('dropdown-input');

        const label = document.createElement('label');
        label.htmlFor = id;
        label.innerText = this.name;

        const input = document.createElement('select');
        input.classList.add('be-vietnam');
        input.id = id;
        input.name = id;
        input.style.height = this.height;
        input.style.width = this.width;

        this.elements.forEach((e) => {
            const option = document.createElement('option');
            option.value = createElementId(e);
            option.innerText = e;
            input.appendChild(option);
        });

        elm.appendChild(label);
        elm.appendChild(input);

        return elm;
    }
}