import { createElementId } from '../createElementId.js';

export class RadioInput {
    /**
     * UI component: Group of radio buttons
     * @param {string} name - Name representing the group of options (not displayed)
     * @param {string[]} elements - Options to select from
     */
    constructor(name, elements) {
        this.name = name;
        this.elements = elements;
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('radio-input');
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
            if (i === 0) input.checked = true;

            // label for option
            const label = document.createElement('label');
            label.htmlFor = id;
            label.innerText = e;

            group.appendChild(input);
            group.appendChild(label);
            elm.appendChild(group);
        });

        return elm;
    }
}