// Created by Kshama Kolur

import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';

/**
 * Provides a UI view for the landing page. This class is responsible for rendering
 * the initial landing screen that users see when they visit the application.
 * It includes a welcome message and a join button to direct new users to sign up or sign in.
 * view: 'landing'
 */
export class LandingView {
    /**
     * Asynchronously renders the landing view with a welcome message and a join button.
     * Sets up an interactive landing page where users can initiate the sign-up or sign-in process.
     * @returns {HTMLElement} The rendered landing container element.
     */
    async render() {
        const landingContainer = document.createElement('div');
        landingContainer.classList.add('landing-container');

        // Title for the landing page
        const title = document.createElement('h1');
        title.textContent = 'Find Your Next Home';
        landingContainer.appendChild(title);

        // Join button that navigates user to sign-in or discover page based on authentication state
        const joinButton = new Button('Join', 200);
        const joinButtonElement = await joinButton.render();
        joinButtonElement.addEventListener('click', () => {
            // DB TODO: replace with Events.events().publish('navigateTo', signed in ? 'discover' : 'sign-in');
            Events.events().publish('navigateTo', 'sign-in');
        });

        landingContainer.appendChild(joinButtonElement);

        return landingContainer;  // Return the complete landing container element
    }
}