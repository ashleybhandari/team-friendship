import { Header } from '../components/Header.js';
import { Navbar2 } from '../components/Navbar2.js';
import { MatchesView } from './MatchesView.js';
import { SettingsView } from './SettingsView.js';
import { Events } from '../Events.js';

/**
 * Sets up header and navbar for Discover, Matches, and Settings views.
 * Injected into App.
 */
export class SignedInContainer {
    #signedInCntrElm = null;
    #viewContainer = null;
    #matchesViewElm = null;
    #settingsViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        this.#signedInCntrElm = document.createElement('div');
        this.#signedInCntrElm.id = 'signedInCntr';

        this.#viewContainer = document.createElement('div');

        // header, navbar, and view container
        this.#signedInCntrElm.appendChild(await new Header().render());
        this.#signedInCntrElm.appendChild(await new Navbar2().render());
        this.#signedInCntrElm.appendChild(this.#viewContainer);

        // renders views to be injected into viewContainer
        // TODO: discover views
        this.#matchesViewElm = await new MatchesView().render();
        this.#settingsViewElm = await new SettingsView().render();

        // initializes view container
        this.#navigateTo('discover');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return this.#signedInCntrElm;
    }

    /**
     * Called when navigateTo is published. Injects view into viewContainer and
     * styles the navbar accordingly.
     * @param {string} view - "matches", "settings"
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';

        // TODO: discover views
        if (view === 'matches') {
            this.#viewContainer.appendChild(this.#matchesViewElm);
            this.#updateNavbar(view);
        }
        else if (view === 'settings') {
            this.#viewContainer.appendChild(this.#settingsViewElm);
            this.#updateNavbar(view);
        }
        else {
            this.#viewContainer.innerHTML = '<h2>404 Page Not Found</h2>'
            this.#updateNavbar(view);
        }
        
        window.location.hash = view;
    }

    /**
     * Applies the "selected" class only to the link associated with the
     * current view.
     * @param {string} view 
     */
    #updateNavbar(view) {
        Array
            .from(this.#signedInCntrElm.querySelectorAll('nav a'))
            .forEach((elm) => elm.classList.remove('selected'));
        
        const elm = this.#signedInCntrElm.querySelector(`#nav-${view}`);
        if (elm) elm.classList.add('selected');
    }
}