// Created by Kshama Kolur

import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';

/**
 * UI component: Housing Situation Screen
 * Includes a header, progress bar, radio inputs for housing options, and navigation buttons.
 * href: create-3
 */
export class HousingSituationView {
    async render() {
        const housingViewElm = document.createElement('div');
        housingViewElm.id = 'housingView';
        
        // progress bar
        housingViewElm.appendChild(await new ProgressBar(3).render());
        
        // Render the radio input for housing situation choices
        const radioInputElement = await new RadioInput(
            'What is your housing situation?', 
            ['I am looking for housing', 'I have housing and am looking for roommates']
        ).render();
        housingViewElm.appendChild(radioInputElement);

        // TODO: if need housing, 'create-4-1', otherwise, 'create-4-2'
        housingViewElm.appendChild(await new Navigation('create-2', 'create-4-1').render());

        return housingViewElm;
    }
}