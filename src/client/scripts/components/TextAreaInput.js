import { createElementId } from '../helpers/createElementId.js';

export class TextAreaInput {
    /**
     * UI component: Text area
     * @param {string} name - Label for the input element
     * @param {string} [placeholder=""] - Placeholder
     * @param {string} [value=""] - Initial value
     */
    constructor(name, placeholder = '', value = '') {
        this.name = name;
        this.placeholder = placeholder;
        this.value = value;
    }
    
    async render() {
        const id = createElementId(this.name, 'Area');

        const elm = document.createElement('div');
        elm.classList.add('text-area-input');

        // textarea label
        const label = document.createElement('label');
        label.htmlFor = id;
        label.innerText = this.name;

        // textarea
        const input = document.createElement('textarea');
        input.classList.add('be-vietnam');
        input.id = id;
        input.name = id;
        input.placeholder = this.placeholder;
        input.value = this.value;
        
        elm.appendChild(label);
        elm.appendChild(input);

        return elm;
    }
}