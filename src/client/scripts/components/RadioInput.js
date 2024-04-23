import { createElementId } from '../helpers/createElementId.js';

export class RadioInput {
    /**
     * UI component: Group of radio buttons
     * @param {string} name - Name representing the group of options
     * @param {string[]} elements - Options to select from
     * @param {number} [value] - Initial value (index in elements)
     */
    constructor(name, elements, value = null) {
        this.name = name;
        this.elements = elements;
        this.value = value;
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('radio-input');

        // text displayed above options
        const title = document.createElement('p');
        title.innerText = this.name;
        title.id = createElementId(this.name, 'Radio');
        elm.appendChild(title);

        // options to select from
        this.elements.forEach((e, i) => {
            const id = createElementId(e);

            const group = document.createElement('div');

            // radio button for option
            const input = document.createElement('input');
            input.classList.add("radio-container");
            input.type = 'radio';
            input.name = title.id;
            input.id = id;
            input.value = e;
            input.onclick = () => title.setAttribute('data_value', i);

            // initializes checked option
            if ((!this.value && i === 0) || (this.value && i === this.value)) {
                input.checked = true;
                title.setAttribute('data_value', i);
            }

            // creates span option - Gauri
            const span = document.createElement("span");
            span.classList.add("radio-checkmark");

            // label for option
            const label = document.createElement('label');
            label.htmlFor = id;
            label.innerText = e;
            label.classList.add("radio-container");

            label.appendChild(input);
            label.appendChild(span);
            // group.appendChild(input); - part of old code in case this fails
            group.appendChild(label);
            elm.appendChild(group);
        });

        return elm;
    }
}