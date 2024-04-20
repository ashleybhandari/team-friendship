import { createElementId } from '../createElementId.js';

export class TextAreaInput {
    /**
     * UI component: Text area
     * @param {string} name - Label for the input element
     * @param {string} [value=""] - Initial value
     * @param {string} [placeholder=""] - Placeholder
     */
    constructor(name, value = '', placeholder = '') {
        this.name = name;
        this.value = value;
        this.placeholder = placeholder;
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