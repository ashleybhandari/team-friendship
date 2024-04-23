import { createElementId } from '../helpers/createElementId.js';

export class RadioInput {
    /**
     * UI component: Group of radio buttons. Calling getAttribute('data_value')
     * on the group label returns the currently selected value.
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

        // group label, displayed above radio options
        const group = document.createElement('p');
        group.innerText = this.name;
        group.id = createElementId(this.name, 'Radio');
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
            input.onclick = () => group.setAttribute('data_value', e);

            // initializes checked option
            if ((!this.value && i === 0) || (this.value && e === this.value)) {
                input.checked = true;
                group.setAttribute('data_value', e);
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
            option.appendChild(label);
            elm.appendChild(option);
        });

        return elm;
    }
}