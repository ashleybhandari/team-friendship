import { Events } from '../Events.js';

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

        elm.innerHTML = `
        <div class="logo">
            <img src="https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/logo.png">
            <h2 class="battambang">KeyMate</h2>
            <div class="links">
                <a href="#landing" id="nav-landing">Home</a>
                <a href="#about" id="nav-about">About us</a>
            </div>
        </div>
        <div>
            <a href="#sign-in" id="nav-sign-in">Sign in</a>
        </div>
        `;

        // add click event listener to each link
        elm
            .querySelectorAll('a')
            .forEach((link) =>
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const view = e.target.getAttribute('href').replace('#', '');
                    this.#navigate(view);
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