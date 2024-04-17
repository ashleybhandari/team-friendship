import { createElementId } from '../createElementId.js';

export class CheckboxInput {
    /**
     * UI component: Checkbox with label.
     * @param {string} name Checkbox label
     * @param {boolean} [checked=false] Whether the box is checked
     */
    constructor(name, checked = false) {
        this.name = name;
        this.checked = checked;
    }
  
    async render() {
        const id = createElementId(this.name, 'Box');

        const container = document.createElement('label');
        container.className = 'custom-checkbox';
        container.htmlFor = id;

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = id;
        input.checked = this.checked;

        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';

        const text = document.createTextNode(` ${this.name}`);

        container.appendChild(input);
        container.appendChild(checkmark);
        container.appendChild(text);

        return container;
    }
}