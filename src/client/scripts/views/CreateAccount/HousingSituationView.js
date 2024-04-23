// Created by Kshama Kolur

import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';
import { RadioInput } from '../../components/RadioInput.js';

/**
 * UI component: Housing Situation Screen
 * Includes a header, progress bar, radio inputs for housing options, and navigation buttons.
 * view: create-3
 */
export class HousingSituationView {
    async render() {
        const housingViewElm = document.createElement('div');
        housingViewElm.id = 'housingView';
        
        // progress bar
        housingViewElm.appendChild(await new ProgressBar(3).render());

         // Title
         const titleOptionsContainer = document.createElement('div');
         titleOptionsContainer.classList.add('title-options-container');
        
         // Render the radio input for housing situation choices
         const radioInputElement = await new RadioInput(
            'What is your housing situation?', 
            ['I am looking for housing', 'I have housing and am looking for roommates']
        ).render();
        titleOptionsContainer.appendChild(radioInputElement);;

        housingViewElm.appendChild(titleOptionsContainer);

        housingViewElm.appendChild(await new Navigation('create-2', 'create-4').render());

        return housingViewElm;
    }
}