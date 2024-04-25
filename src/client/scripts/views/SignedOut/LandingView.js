// Created by Kshama Kolur

import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';

/**
 * Provides a UI view for the landing page. This class is responsible for rendering
 * the initial landing screen that users see when they visit the application.
 * It includes a welcome message and a join button to direct new users to sign up or sign in.
 *  view: 'landing'
 */
export class LandingView {
    /**
     * Asynchronously renders the landing view with a welcome message and a join button.
     * Sets up an interactive landing page where users can initiate the sign-up or sign-in process.
     * @returns {HTMLElement} The rendered landing container element.
     */
    async render() {
        // Create a container for the landing view and add the 'landing-container' class for styling
        const landingContainer = document.createElement('div');
        landingContainer.classList.add('landing-container');

        // Create the 'Find Your' title element, add a class for styling, and append it to the landing container
        const titleFindYour = document.createElement('div');
        titleFindYour.classList.add('title-find-your', 'battambang');
        titleFindYour.textContent = 'Find Your';
        landingContainer.appendChild(titleFindYour);

        // Create the 'Next Home' title element, add a class for styling, and append it to the landing container
        const titleNextHome = document.createElement('div');
        titleNextHome.classList.add('title-next-home', 'battambang');
        titleNextHome.textContent = 'Next Home';
        landingContainer.appendChild(titleNextHome);

        // Create the join button using the Button component, add an event listener for navigation, and append it to the landing container
        const joinButton = new Button('Join');
        const joinButtonElement = await joinButton.render();
        joinButtonElement.classList.add('join-button');
        joinButtonElement.addEventListener('click', () => {
            // DB TODO: replace with Events.events().publish('navigateTo', signed in ? 'discover' : 'sign-in');
            Events.events().publish('navigateTo', 'sign-in');
        });
        landingContainer.appendChild(joinButtonElement);

        return landingContainer;  // Return the complete landing container element
    }
}