// created by Gauri Arvind

import { createElementId } from '../helpers/createElementId.js';

export class RadioInput {
    /**
     * UI component: Group of radio buttons. Calling getAttribute('data_value')
     * on the element returns the currently selected value.
     * @param {string} name - Name representing the group of options
     * @param {string[]} elements - Options to select from
     * @param {string} [value] - Initial value
     */
    constructor(name, elements, value = null) {
        this.name = name;
        this.elements = elements;
        this.value = value;
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('radio-input');
        elm.id = createElementId(this.name, 'Radio');

        // group label, displayed above radio options
        const group = document.createElement('p');
        group.innerText = this.name;
        group.id = createElementId(this.name, 'RadioGrp');
        elm.appendChild(group);

        // options to select from
        this.elements.forEach((e, i) => {
            const id = createElementId(e);

            const option = document.createElement('div');

            // radio button for option
            const input = document.createElement('input');
            input.classList.add("radio-container");
            input.type = 'radio';
            input.name = group.id;
            input.id = id;
            input.value = e;
            // if this option is selected, changes the value of data_value
            input.onclick = () => {
                elm.setAttribute('data_value', e);
            }

            // initializes checked option
            if ((!this.value && i === 0) || (this.value && e === this.value)) {
                input.checked = true;
                // initializes the value of data_value
                elm.setAttribute('data_value', e);
            }

            // creates span option
            const span = document.createElement("span");
            span.classList.add("radio-checkmark");

            // label for option
            const label = document.createElement('label');
            label.htmlFor = id;
            label.innerText = e;
            label.classList.add("radio-container");

            label.appendChild(input);
            label.appendChild(span);
            option.appendChild(label);
            elm.appendChild(option);
        });

        return elm;
    }
}
