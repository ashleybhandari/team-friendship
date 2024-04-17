import { createElementId } from '../createElementId.js';

export class Button {
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
        elm.innerText = this.value;
        elm.style.width = this.width;

        return elm;
    }
}