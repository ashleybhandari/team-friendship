// Created by Kshama Kolur

import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';
import { RadioInput } from '../../components/RadioInput.js';
import { Events } from '../../Events.js';
import * as db from '../../../data/DatabasePouchDB.js';

/**
 * UI component: Housing Situation Screen
 * Includes a header, progress bar, radio inputs for housing options, and navigation buttons.
 * view: create-3
 */
export class HousingSituationView {
    #housingViewElm = null;
    #userId = null;
    #events = null;

    constructor() {
        this.#events = Events.events();

        // Published by CredentialsView so all Create Account pages update the
        // same user.
        this.#events.subscribe('newUser', (id) => this.#userId = id);
    }

    async render() {
        this.#housingViewElm = document.createElement('div');
        this.#housingViewElm.id = 'housingView';
        
        // progress bar
        this.#housingViewElm.appendChild(await new ProgressBar(3).render());

        // Title
        const titleOptionsContainer = document.createElement('div');
        titleOptionsContainer.classList.add('title-options-container');

        // Render the radio input for housing situation choices
        const radioInputElement = await new RadioInput(
            'What is your housing situation?', 
            ['I am looking for housing', 'I have housing and am looking for roommates']
        ).render();
        radioInputElement.querySelector('#whatIsYourHousiRadioGrp').classList.add('battambang');
        titleOptionsContainer.appendChild(radioInputElement);
        this.#housingViewElm.appendChild(titleOptionsContainer);

        this.#housingViewElm.appendChild(await new Navigation(
            'create-2', 'create-4', [this.#saveFields()]
        ).render());

        return this.#housingViewElm;
    }

    /**
     * Returns a closure that saves the user-inputted data to the DB.
     * @returns {function}
     */
    #saveFields() {
        return async () => {
            try {
                // get user from the DB
                const user = await db.getUserById(this.#userId);
                // save inputted data
                const elm = this.#housingViewElm.querySelector('#whatIsYourHousiRadio');
                user.hasHousing = elm.getAttribute('data_value').includes('have housing');
                this.#events.publish('hasHousing', user.hasHousing);
                // update DB
                await db.updateUser(user);
            } catch (error) {
                console.log(error.message
                    ? `Error updating housing situation: ${error.message}`
                    : 'An unknown error occurred while updating the housing situation.'
                );
            }
        }
    }
}
