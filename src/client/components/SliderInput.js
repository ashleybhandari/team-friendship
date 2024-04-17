import { createElementId } from '../createElementId.js';

export class SliderInput {
    constructor(name, min, max) {
        this.name = name;
        this.min = min;
        this.max = max;
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('slider-input');

        const title = document.createElement('p');
        title.classList.add('title');
        title.innerText = this.name;

        const input = document.createElement('input');
        input.id = createElementId(this.name, 'Sldr');
        input.type = 'range';
        input.min = 1;
        input.max = 3;
        input.value = 2;

        const labels = document.createElement('div');
        labels.classList.add('labels');

        const min = document.createElement('span');
        const max = document.createElement('span');
        min.innerText = this.min;
        max.innerText = this.max;

        labels.appendChild(min);
        labels.appendChild(max);
        elm.appendChild(title);
        elm.appendChild(input);
        elm.appendChild(labels);

        return elm;
    }
}