// created by Ashley Bhandari

import { createElementId } from '../helpers/createElementId.js';

export class UserHousing {
    /**
     * UI component: Input fields for user's preference information.
     * @param {string} page - Page in which component is rendered
     */
    constructor(page) {
        this.page = page;
    }

    async render() {
        const elm = document.createElement('div');
        return elm;
    }
}