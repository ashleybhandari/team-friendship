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

        elm.innerHTML = `
        <nav>
            <div class="main-links">
                <a href="#discover" id="nav2-discover">Discover</a>
                <a href="#matches" id="nav2-matches">Matches</a>
            </div>
        </nav>
        <hr>
        `;

        await this.#renderDropdown(elm);

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

    async #renderDropdown(container) {
        const btn = document.createElement('div');
        btn.classList.add('button-container');
        btn.innerHTML = `
        <button class="dropdown-button">
            <i class="material-symbols-outlined">account_circle</i>
        </button>
        `;
        
        const dropdown = document.createElement('div');
        dropdown.id = 'accountDropdown';
        dropdown.classList.add('dropdown-content');
        dropdown.innerHTML = `
        <a href="#settings" id="nav2-settings">Settings</a>
        <a href="#landing" id="nav2-landing">Sign out</a>
        `;

        btn.querySelector('button').addEventListener('click', () => {
            dropdown.classList.toggle('show')
        });
          
        window.onclick = (e) => {
            const btnClicked = e.target.matches('.dropdown-button') || e.target.matches('.dropdown-button i');
            if (!btnClicked) {
                if (dropdown.classList.contains('show')) {
                    dropdown.classList.remove('show');
                }
            }
        }

        container.querySelector('nav').appendChild(btn);
        container.appendChild(dropdown);
    }
}