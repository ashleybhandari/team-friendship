import { Events } from '../Events.js';

/**
 * UI component: Navbar for screens when the user is logged in. Only used in
 * SignedInContainer.js.
 */
export class Navbar2 {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('navbar2');

        elm.innerHTML = `
        <nav>
            <div class="main-links">
                <a href="#discover" id="nav-discover">Discover</a>
                <a href="#matches" id="nav-matches">Matches</a>
            </div>
        </nav>
        <hr>
        `;

        await this.#renderDropdown(elm);

        // add click event listener to each link
        elm
            .querySelectorAll('a')
            .forEach((link) =>
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const view = e.currentTarget.getAttribute('href').replace('#', '');
                    this.#navigate(view);
                })
            );

        return elm;
    }

    /**
     * Renders a button on the navbar that, when clicked, displays a dropdown
     * with links to Settings and Sign out.
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
        
        // dropdown content
        const dropdown = document.createElement('div');
        dropdown.id = 'accountDropdown';
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = `
        <a href="#settings" id="nav-settings">Settings</a>
        <a href="#sign-out" id="nav-sign-out">Sign out</a>
        `;

        // events to open and close the dropdown
        btn.querySelector('button').addEventListener('click', (e) => {
            e.preventDefault();
            dropdown.classList.toggle('show');
        });

        window.onclick = (e) => {
            const btnClicked = e.target.matches('.dropdown-button') ||
                e.target.matches('.dropdown-button i');
            if (!btnClicked) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        }

        container.querySelector('nav').appendChild(btn);
        container.appendChild(dropdown);
    }

    
    /**
     * Navigates to v. Signs out and navigates to landing if the Sign out
     * button was clicked.
     * @param {string} v - View to navigate to
     */
    async #navigate(v) {
        let view = v;

        if (view === 'sign-out') {
            view = 'landing';
            localStorage.removeItem('authToken'); // TODO: switch to PouchDB
        }

        window.location.hash = view;
        await this.#events.publish('navigateTo', view);
    }
}
