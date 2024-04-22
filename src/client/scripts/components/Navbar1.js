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
        const elm = document.createElement('div');
        elm.classList.add('navbar1');

        elm.innerHTML = `
        <nav>
            <div class="main-links">
                <a href="#landing" id="nav-landing">Home</a>
                <a href="#about" id="nav-about">About us</a>
                <a href="#sign-in" id="nav-sign-in">Sign in</a>
            </div>
        </nav>
        <hr>
        `;

        elm
            .querySelectorAll('a')
            .forEach(link =>
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const view = e.currentTarget.getAttribute('href').replace('#', '');
                    window.location.hash = view;
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
        // TODO: const view = (v === 'sign-in' && signed in) ? 'discover' : v;

        await this.#events.publish('navigateTo', view);
    }
}
