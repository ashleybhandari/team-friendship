import { Events } from '../Events.js';

/**
 * UI component: Footer with acknowledgements and navigation links. Goes at the
 * bottom of every page.
 */
export class Footer {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('footer');

        // text at center of footer
        const center = document.createElement('div');
        center.classList.add('center');
        center.innerHTML = `
        <h2 class="battambang">KeyMate</h2>
        <p>© 2024 Team Friendship. All Rights Reserved</p>
        <a href="https://www.flaticon.com/free-icons/magic" title="flaticon.com">
            Logo created by Freepik - Flaticon
        </a>
        `;

        // links on left side of footer
        const links1 = document.createElement('ul');
        links1.classList.add('left');
        links1.innerHTML = `
        <li><a href="#landing">Home</a></li>
        <li><a href="#about">About us</a></li>
        `;

        // links on right side of footer
        const links2 = document.createElement('ul');
        links2.classList.add('right');
        links2.innerHTML = `
        <li><a href="#discover">Discover</a></li>
        <li><a href="#matches">Matches</a></li>
        <li><a href="#settings">Settings</a></li>
        `;

        elm.appendChild(center);
        elm.appendChild(links1);
        elm.appendChild(links2);

        // add click event listener to each link
        elm
            .querySelectorAll('li a')
            .forEach(link =>
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const view = e.target.getAttribute('href').replace('#', '');
                    this.#navigate(view);
                })
            );

        return elm;
    }

    /**
     * Navigates to v. If a signed out user clicks a link that requires an
     * account, redirects them to the Sign in page.
     * @param {string} v - View to navigate to
     */
    async #navigate(v) {
        const view = (() => {
            switch(v) {
                case 'discover':
                case 'matches':
                case 'settings':
                    // TODO: if (not signed in) return 'sign-in'
                default:
                    return v;
            }
        })();

        window.location.hash = view;
        await this.#events.publish('navigateTo', view);
    }
}