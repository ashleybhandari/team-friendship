import { Events } from '../Events.js';
import { Header } from './Header.js'; // Assuming Header.js file path

/**
 * UI component: Navbar for screens when the user is logged out. Only used in
 * SignedOutContainer.js.
 */
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

        const keyMateText = headerElement.querySelector('h1');
        container.appendChild(keyMateText);

        const homeLink = document.createElement('a');
        homeLink.href = '#landing';
        homeLink.id = 'nav-landing';
        homeLink.innerText = 'Home';
        homeLink.style.color = 'black';
        homeLink.style.textDecoration = 'none'; 
        homeLink.style.cursor = 'default';
        homeLink.style.marginRight = '10px';

        const aboutLink = document.createElement('a');
        aboutLink.href = '#about';
        aboutLink.id = 'nav-about';
        aboutLink.innerText = 'About Us';
        aboutLink.style.color = 'black';
        aboutLink.style.textDecoration = 'none'; 
        aboutLink.style.cursor = 'default';

        container.appendChild(homeLink);
        container.appendChild(aboutLink);

        elm.appendChild(container);

        elm
        .querySelectorAll('a')
        .forEach((link) =>
            link.addEventListener('click', async (e) => {
                e.preventDefault();
                const view = e.target.getAttribute('href').replace('#', '');
                await this.#navigate(view);
            })
        );
        
        return elm;
    }

    /**
     * Navigates to v. If the user is already signed in, clicking the Sign in
     * button redirects them to the Discover page.
     * @param {string} v - View to navigate to
     */
    async #navigate(v) {
        const view = v;
        // DB TODO: replace with const view = (v === 'sign-in' && signed in) ? 'discover' : v;

        window.location.hash = view;
        await this.#events.publish('navigateTo', view);
    }
}
