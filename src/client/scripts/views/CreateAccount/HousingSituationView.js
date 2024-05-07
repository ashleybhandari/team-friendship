// Created by Kshama Kolur

import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';
import { RadioInput } from '../../components/RadioInput.js';
import { Events } from '../../Events.js';
import { updateUser } from '../../../data/DatabasePouchDB.js';

/**
 * UI component: Housing Situation Screen
 * Includes a header, progress bar, radio inputs for housing options, and navigation buttons.
 * view: create-3
 */
export class HousingSituationView {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const housingViewElm = document.createElement('div');
        housingViewElm.id = 'housingView';
        
        // progress bar
        housingViewElm.appendChild(await new ProgressBar(3).render());

         // Title
         const titleOptionsContainer = document.createElement('div');
         titleOptionsContainer.classList.add('title-options-container');

         //Form
         const form = document.createElement('form');
         form.id = 'housingSituationForm'; // Handle the form submission
        
         // Render the radio input for housing situation choices
         const radioInputElement = await new RadioInput(
            'What is your housing situation?', 
            ['I am looking for housing', 'I have housing and am looking for roommates']
        ).render();
        radioInputElement.querySelector('#whatIsYourHousiRadioGrp').classList.add('battambang')
        form.appendChild(radioInputElement);
        titleOptionsContainer.appendChild(form);
        housingViewElm.appendChild(titleOptionsContainer);

        const nextBtnHandler = async () => {
            this.#events.publish('hasHousing', true); // TODO: move

             // Create a FormData object from the form element
            const formData = new FormData(form);
            // Convert the form data into a key-value pair object
            const userData = Object.fromEntries(formData.entries());

            // Placeholder values for user ID and revision number
            const userId = 'currentUserId'; 
            const userRev = 'currentUserRev'; 

            // Construct the user object with the updated housing preference
            const updatedUser = {
                id: userId,
                _rev: userRev,
                housing: userData.housing 
            };
            // Attempt to update the user document in the database
            try {
                await updateUser(updatedUser);
                // this.#events.publish('hasHousing', userData.housing) // DBT TODO: uncomment
            } catch (error) {
                console.log('Error updating housing situation: ' + error.message);
            }
            
        };

        housingViewElm.appendChild(await new Navigation('create-2', 'create-4', [nextBtnHandler]).render());

        return housingViewElm;
    }
}
