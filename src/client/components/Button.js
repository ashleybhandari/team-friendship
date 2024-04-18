import { createElementId } from '../createElementId.js';

export class Button {
    /**
     * UI component: A yellow button with white text.
     * @param {string} value Button text
     * @param {number} [width=150] Button width
     * @param {string} [type="button"] Button type (button/submit/reset)
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
        elm.type = this.type;
        elm.innerHTML = this.value;
        elm.style.width = this.width;

        return elm;
    }
}