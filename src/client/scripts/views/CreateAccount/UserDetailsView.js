// created by Ashley Bhandari

import { Events } from '../../Events.js';

// view: 'create-4'
export class UserDetailsView {
    #detailsViewElm = null;
    #events = null;
    #user = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        this.#detailsViewElm = document.createElement('div');
        this.#detailsViewElm.id = 'detailsView';
        
        return this.#detailsViewElm;
    }
}