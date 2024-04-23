import { CheckboxInput } from './CheckboxInput.js';
import { createElementId } from '../helpers/createElementId.js';

export class CheckboxGroup {
    /**
     * UI component: Group of checkboxes with a label.
     * @param {string} name - Label for group
     * @param {Map<string, boolean | null>} boxes - Map of boxes: key = label, value = whether it's checked
     * @param {number} [columns=1] - Number of columns the group should have
     */
    constructor(name, boxes, columns = 1) {
        this.name = name;
        this.boxes = boxes;
        this.columns = columns;
        this.colSize = boxes.size / columns;
    }

    async render() {
        const elm = document.createElement('div');
        elm.classList.add('checkbox-group');
        if (this.columns > 1) elm.classList.add('big-group');

        elm.id = createElementId(this.name, 'BoxGrp');

        // create label
        elm.innerHTML = `<p>${this.name}</p>`;

        // container for checkbox group
        const group = document.createElement('div');
        group.classList.add('boxes');

        let i = 1;
        let col = document.createElement('div');
        // iterate through checkboxes
        for (const [name, checked] of this.boxes) {
            // add checkbox to column
            col.appendChild(await new CheckboxInput(name, checked).render());

            // if column is full, create new column
            if (i++ % this.colSize === 0) {
                group.appendChild(col);
                col = document.createElement('div');
            }
        }

        group.appendChild(col);
        elm.appendChild(group);

        return elm;
    }
}