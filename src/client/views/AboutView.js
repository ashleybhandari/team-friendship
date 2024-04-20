// Created by Kshama Kolur

import { Navbar1 } from './Navbar1.js';
import { Button } from './Button.js';
import { Events } from './Events.js';

export class LandingView {
    
    async render() {
        const container = document.createElement('div');
        container.classList.add('landing-view-container');
        
        const navbar = new Navbar1();
        const navbarElement = await navbar.render();
        container.appendChild(navbarElement);
        
        const contentArea = document.createElement('div');
        contentArea.classList.add('content-area');

        const image = new Image();
        image.src = 'landing.jpg';
        image.classList.add('background-image');
        contentArea.appendChild(image);
        
        const joinButton = new Button('Join', 200); 
        const joinButtonElement = await joinButton.render();
        
        joinButtonElement.addEventListener('click', () => {
            Events.events().publish('navigateTo', 'create-account');
        });

        contentArea.appendChild(joinButtonElement);
        
        container.appendChild(contentArea);

        return container;
    }
}
