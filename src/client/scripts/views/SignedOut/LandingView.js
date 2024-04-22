// Created by Kshama Kolur

import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';

/**
 * Provides a UI view for the landing page. This class is responsible for rendering
 * the initial landing screen that users see when they visit the application.
 * It includes a welcome message and a join button to direct new users to sign up or sign in.
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

        // Set the background image for the landing container
        const imageUrl = 'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/landing.jpg';
        landingContainer.style.backgroundImage = `url('${imageUrl}')`;
        landingContainer.style.backgroundSize = 'cover';
        landingContainer.style.backgroundPosition = 'center center';
        landingContainer.style.height = '100vh'; // Make it full height
        landingContainer.style.display = 'flex';
        landingContainer.style.flexDirection = 'column';
        landingContainer.style.justifyContent = 'center';
        landingContainer.style.alignItems = 'flex-start';
        landingContainer.style.paddingLeft = '10%'; // Adjust based on design

        // Title for the landing page

        // Title for the landing page - "Find Your"
        const titleFindYour = document.createElement('div');
        titleFindYour.textContent = 'Find Your';
        titleFindYour.style.fontSize = '2rem'; // Smaller font size for 'Find Your'
        titleFindYour.style.color = '#FFFFFF'; // Adjust color if necessary
        titleFindYour.style.fontWeight = 'bold'; // Normal font weight for 'Find Your'
        titleFindYour.style.marginBottom = '0'; // Remove bottom margin to bring "Next Home" closer
        
        // Title for the landing page - "Next Home"
        const titleNextHome = document.createElement('div');
        titleNextHome.textContent = 'Next Home';
        titleNextHome.style.fontSize = '4rem'; // Larger font size for 'Next Home'
        titleNextHome.style.color = '#FFFFFF'; // Adjust color if necessary
        titleNextHome.style.fontWeight = 'bold'; // Bolder font weight for 'Next Home'
        titleNextHome.style.marginTop = '0'; // Remove top margin to bring "Next Home" closer to "Find Your"
    
        landingContainer.appendChild(titleFindYour);
        landingContainer.appendChild(titleNextHome);    


        // Join button that navigates user to sign-in or discover page based on authentication state
        const joinButton = new Button('Join', 200);
        const joinButtonElement = await joinButton.render();
        joinButtonElement.addEventListener('click', () => {
            Events.events().publish('navigateTo', 'sign-in');
        });
        joinButtonElement.style.marginTop = '1rem'; // Space between title and button
        joinButtonElement.style.fontSize = '1.5rem'; // Larger font size for button text
        joinButtonElement.style.padding = '1rem 2rem'; // Bigger button by increasing padding
        joinButtonElement.style.backgroundColor = '#FFD700'; // Adjust color if necessary
        joinButtonElement.style.border = 'none'; // Remove border if necessary
        joinButtonElement.style.borderRadius = '2rem'; // Rounded corners for button
        joinButtonElement.style.cursor = 'pointer'; // Pointer cursor on hover

        landingContainer.appendChild(joinButtonElement);

        return landingContainer;  // Return the complete landing container element
    }
}