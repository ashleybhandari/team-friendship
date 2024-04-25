// created by Ashley Bhandari

import { createElementId } from '../helpers/createElementId.js';

export class SliderInput {
    /**
     * UI component: Slider with 3 options
     * @param {string} name - Slider label
     * @param {string} min - Label for the leftmost value of the slider
     * @param {string} max - Label for the rightmost value of the slider
     * @param {number} [value=2] - Initial value
     */
    constructor(name, min, max, value = 2) {
        this.name = name;
        this.min = min;
        this.max = max;
        this.value = value;
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('slider-input');

        // slider title
        const title = document.createElement('p');
        title.classList.add('title');
        title.innerText = this.name;

        // slider
        const input = document.createElement('input');
        input.id = createElementId(this.name, 'Sldr');
        input.type = 'range';
        input.min = 1;
        input.max = 3;
        input.value = this.value;

        // labels for left- and rightmost values
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