import { Events } from '../Events.js';
import { Header } from './Header.js';
import { Button } from './Button.js';
import { createElementId } from '../helpers/createElementId.js';

export class Navbar1 {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }
    
    async render() {
        const elm = document.createElement('nav');
        elm.classList.add('navbar1');
        
        const header = new Header();
        const headerElement = await header.render();

        const container = document.createElement('div');
        container.classList.add('navbar1-container');
        container.style.display = 'flex';
        container.style.alignItems = 'center';

        container.appendChild(headerElement);

        const homeLink = document.createElement('a');
        homeLink.href = '#landing';
        homeLink.id = 'nav-landing';
        homeLink.innerText = 'Home';
        homeLink.style.color = 'black';
        homeLink.style.textDecoration = 'none'; 
        homeLink.style.cursor = 'pointer';
        homeLink.style.marginRight = '10px';
        homeLink.style.fontWeight = 'bold';

        const aboutLink = document.createElement('a');
        aboutLink.href = '#about';
        aboutLink.id = 'nav-about';
        aboutLink.innerText = 'About Us';
        aboutLink.style.color = 'black';
        aboutLink.style.textDecoration = 'none'; 
        aboutLink.style.cursor = 'pointer';
        aboutLink.style.fontWeight = 'bold';

        const signInButton = new Button('Sign In', 100); 
        const signInElement = await signInButton.render();
        signInElement.id = createElementId('Sign In', 'Btn');
        signInElement.addEventListener('click', () => {
            window.location.href = '#sign-in';
        });

        const buttonContainer = document.createElement('div');
        buttonContainer.style.marginLeft = 'auto'; 
        buttonContainer.style.cursor = 'pointer';
        buttonContainer.appendChild(signInElement);

        container.appendChild(homeLink);
        container.appendChild(aboutLink);
        container.appendChild(buttonContainer); 

        elm.appendChild(container);

        elm.querySelectorAll('a').forEach((link) =>
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const view = e.target.getAttribute('href').replace('#', '');
                await this.#navigate(view);
            })
        );
        
        return elm;
    }

    async #navigate(v) {
        const view = v;
        // DB TODO: replace with const view = (v === 'sign-in' && signed in) ? 'discover' : v;

        window.location.hash = view;
        await this.#events.publish('navigateTo', view);
    }
}
