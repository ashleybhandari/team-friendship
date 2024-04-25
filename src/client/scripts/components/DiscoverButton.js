// created by Ashley Bhandari

import { createElementId } from '../helpers/createElementId.js';

export class DiscoverButton {
    /**
     * UI component: Like/Reject buttons on Discover page
     * @param {boolean} isLike - true render like button, false render reject button
     */
    constructor(isLike) {
        this.isLike = isLike;
    }
    
    async render() {
        const elm = document.createElement('button');
        elm.id = createElementId(this.isLike ? 'discoverLike' : 'discoverReject');
        elm.classList.add('discover-button');
        elm.classList.add(
            this.isLike ? 'discover-like' : 'discover-reject'
        );

        // a heart or 'x' goes in the button
        elm.innerHTML = `
        <i class="material-symbols-outlined">
            ${this.isLike ? 'favorite' : 'close'}
        </i>`;

        return elm;
    }
}