// Created by Kshama Kolur

import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';
import { RadioInput } from '../../components/RadioInput.js';
import { updateUser } from '../../../data/DatabasePouchDB.js';
import { Events } from '../../Events.js';

/**
 * UI component: Housing Situation Screen
 * Includes a header, progress bar, radio inputs for housing options, and navigation buttons.
 * view: create-3
 */
export class HousingSituationView {
    constructor() {
        this.events = Events.events();
    }
    async render() {
        const housingViewElm = document.createElement('div');
        housingViewElm.id = 'housingView';
        
        // progress bar
        housingViewElm.appendChild(await new ProgressBar(3).render());

         // Title
         const titleOptionsContainer = document.createElement('div');
         titleOptionsContainer.classList.add('title-options-container');

         const form = document.createElement('form');
         form.id = 'housingSituationForm';
        
         // Render the radio input for housing situation choices
         const radioInputElement = await new RadioInput(
            'What is your housing situation?', 
            ['I am looking for housing', 'I have housing and am looking for roommates']
        ).render();
        form.appendChild(radioInputElement);
        titleOptionsContainer.appendChild(form);
        housingViewElm.appendChild(titleOptionsContainer);

        const nextBtnHandler = async (event) => {
            event.preventDefault();

            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());

            const userId = 'currentUserId'; 
            const userRev = 'currentUserRev'; 

            const updatedUser = {
                id: userId,
                _rev: userRev,
                housing: userData.housing 
            };

            let success = true;
            try {
                await updateUser(updatedUser);
            } catch (error) {
                alert('Error updating housing situation: ' + error.message);
                success = false;
            }
            
            if (success) {
                this.events.publish('navigateTo', this.next);
            }
        };

        housingViewElm.appendChild(await new Navigation('create-2', 'create-4', [nextBtnHandler]).render());

        return housingViewElm;
    }
}