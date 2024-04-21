// Created by Kshama Kolur

import { Header } from '../components/Header.js';
import { ProgressBar } from '../components/ProgressBar.js';
import { RadioInput } from '../components/RadioInput.js';
import { Button } from '../components/Button.js';

/**
 * UI component: Housing Situation Screen
 * Includes a header, progress bar, radio inputs for housing options, and navigation buttons.
 */
export class HousingSituationScreen {
    constructor() {
        // Assuming step 3 for the "What is your housing situation?" progress
        this.progressBar = new ProgressBar(3);
        this.header = new Header();
        this.radioInput = new RadioInput(
            'What is your housing situation?', 
            ['I am looking for housing', 'I have housing and am looking for roommates']
        );
        this.backButton = new Button('Back', 150, 'button');
        this.nextButton = new Button('Next', 150, 'button');
    }

    async render() {
        const screenContainer = document.createElement('div');
        screenContainer.classList.add('housing-situation-screen');

        // Render the header and add it to the container
        const headerElement = await this.header.render();
        screenContainer.appendChild(headerElement);

        // Render the progress bar and add it to the container
        const progressBarElement = await this.progressBar.render();
        screenContainer.appendChild(progressBarElement);

        // Render the radio input for housing situation choices
        const radioInputElement = await this.radioInput.render();
        screenContainer.appendChild(radioInputElement);

        // Create a container for the navigation buttons
        const buttonsContainer = document.createElement('div');
        buttonsContainer.classList.add('buttons-container');

        // Render the back button and add it to the buttons container
        const backButtonElement = await this.backButton.render();
        buttonsContainer.appendChild(backButtonElement);

        // Render the next button and add it to the buttons container
        const nextButtonElement = await this.nextButton.render();
        buttonsContainer.appendChild(nextButtonElement);

        // Add the buttons container to the screen container
        screenContainer.appendChild(buttonsContainer);

        return screenContainer;
    }
}
