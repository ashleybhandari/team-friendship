// created by Ashley Bhandari

import { createElementId } from '../helpers/createElementId.js';

export class Button {
    /**
     * UI component: A yellow button with white text.
     * @param {string} value - Button text
     * @param {number} [width=150] - Button width
     * @param {string} [type="button"] - Button type (button/submit/reset/danger)
     */
    constructor(value, width = 150, type = 'button') {
        this.value = value;
        this.width = `${width}px`;
        this.type = type;
    }
    
    async render() {
        const elm = document.createElement('button');
        elm.classList.add('be-vietnam', 'button');

        elm.id = createElementId(this.value, 'Btn');
        elm.innerHTML = this.value;
        elm.style.width = this.width;

        // makes elm red with type "button"
        if (this.type === 'danger') {
            elm.type = 'button';
            elm.classList.add('danger');
        }
        else {
            elm.type = this.type;
        }

        return elm;
    }
}