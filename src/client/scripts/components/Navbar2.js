import { Events } from '../Events.js';

/**
 * UI component: Navbar for screens when the user is logged in. Only used in
 * SignedInView.js.
 */
export class Navbar2 {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('navbar2');

        // Discover and Matches links
        elm.innerHTML = `
        <nav>
            <div class="main-links">
                <a href="#discover" id="nav-discover">Discover</a>
                <a href="#matches" id="nav-matches">Matches</a>
            </div>
        </nav>
        <hr>
        `;

        // dropdown for Settings and Sign out
        await this.#renderDropdown(elm);

        // add event listeners to links
        elm
            .querySelectorAll('a')
            .forEach(link =>
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const view = e.currentTarget.getAttribute('href').replace('#', '');
                    window.location.hash = view;
                    await this.#events.publish('navigateTo', view);
                })
            );

        return elm;
    }

    /**
     * Renders an account icon at the right end of the navbar. Clicking it
     * opens a dropdown with options to navigate to Settings or sign out.
     * @param {HTMLDivElement} container
     */
    async #renderDropdown(container) {
        // dropdown button
        const btn = document.createElement('div');
        btn.classList.add('button-container');
        btn.innerHTML = `
        <button class="dropdown-button">
            <i class="material-symbols-outlined">account_circle</i>
        </button>
        `;
        
        // links in dropdown
        const dropdown = document.createElement('div');
        dropdown.id = 'accountDropdown';
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = `
        <a href="#settings" id="nav-settings">Settings</a>
        <a href="#landing" id="nav-landing">Sign out</a>
        `;

        // dropdown appears when button is clicked
        btn.querySelector('button').addEventListener('click', () => {
            dropdown.classList.toggle('show')
        });
          
        // dropdown closes when window is clicked
        window.onclick = (e) => {
            const btnClicked = e.target.matches('.dropdown-button') || e.target.matches('.dropdown-button i');
            if (!btnClicked) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        }

        // signs out
        dropdown.querySelector('#nav-landing').addEventListener('click', () => {
            localStorage.removeItem('authToken'); // DB TODO: switch to PouchDB
        });

        container.querySelector('nav').appendChild(btn);
        container.appendChild(dropdown);
    }
}