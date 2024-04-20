// Created by Kshama Kolur

import { Button } from '../components/Button.js';
import { Events } from '../Events.js';

export class LandingView {
    async render() {
        const landingContainer = document.createElement('div');
        landingContainer.classList.add('landing-container');

        const title = document.createElement('h1');
        title.textContent = 'Find Your Next Home';
        landingContainer.appendChild(title);

        const joinButton = new Button('Join', 200);
        const joinButtonElement = await joinButton.render();
        joinButtonElement.addEventListener('click', () => {
            // TODO: Events.events().publish('navigateTo', signed in ? 'discover' : 'sign-in');
            Events.events().publish('navigateTo', 'sign-in');
        });

        landingContainer.appendChild(joinButtonElement);

        return landingContainer;
    }
}