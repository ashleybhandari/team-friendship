import { createElementId } from '../createElementId.js';

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
        elm.appendChild(title);

        const radioName = createElementId(this.name, 'Radio');

        // options to select from
        this.elements.forEach((e, i) => {
            const id = createElementId(e);

            const group = document.createElement('div');

            // radio button for option
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = radioName;
            input.id = id;
            input.value = e;

            // initializes checked option
            if ((!this.value && i === 0) || (this.value && i === this.value)) {
                input.checked = true;
            }

            // label for option
            const label = document.createElement('label');
            label.htmlFor = id;
            label.innerText = e;

            group.appendChild(input);
            group.appendChild(label);
            elm.appendChild(group);
        });
        // console.log(elm.querySelector('input:checked').value)
        // elm.querySelector('input:checked').value = this.elements[1]
        // console.log(elm.querySelector('input:checked').value)

        return elm;
    }
}