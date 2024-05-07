// created by Ashley Bhandari

import { Header } from '../../components/Header.js';
import { Navbar2 } from '../../components/Navbar2.js';
import { DiscoverView } from './DiscoverView.js';
import { MatchesView } from './MatchesView.js';
import { SettingsView } from './SettingsView.js';
import { Events } from '../../Events.js';

export class SignedInContainer {
    #signedInCntrElm = null;
    #viewContainer = null;
    #discoverViewElm = null;
    #matchesViewElm = null;
    #settingsViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    /**
     * Sets up header and navbar for Discover, Matches, and Settings views.
     * Injected into App.
     * @returns {Promise<HTMLDivElement>}
     */
    async render() {
        this.#signedInCntrElm = document.createElement('div');
        this.#signedInCntrElm.id = 'signedInCntr';

        this.#viewContainer = document.createElement('div');

        // header, navbar, and view container
        this.#signedInCntrElm.appendChild(await new Header().render());
        this.#signedInCntrElm.appendChild(await new Navbar2().render());
        this.#signedInCntrElm.appendChild(this.#viewContainer);

        // renders views to be injected into viewContainer
        this.#discoverViewElm = await new DiscoverView().render();
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
     * @param {string} view
     */
    #navigateTo(view) {
        const userId = 0; // DB TODO: replace with current user's id
        this.#viewContainer.innerHTML = '';

        if (view === 'discover') {      // DiscoverView
            this.#viewContainer.appendChild(this.#discoverViewElm);
            this.#updateNavbar(view);
            history.replaceState(null, "", `/index.html/${userId}/discover`);
        }
        else if (view === 'matches') {  // MatchesView
            this.#viewContainer.appendChild(this.#matchesViewElm);
            this.#updateNavbar(view);
            history.replaceState(null, "", `/index.html/${userId}/matches`);
        }
        else if (view === 'settings') { // SettingsView
            this.#viewContainer.appendChild(this.#settingsViewElm);
            this.#updateNavbar(view);
            history.replaceState(null, "", `/index.html/${userId}/settings`);
        }
        else {                          // invalid view name
            this.#viewContainer.innerHTML = '<h2>404 Page Not Found</h2>'
            this.#updateNavbar(view);
        }
    }

    /**
     * Applies the "selected" class only to the link associated with the
     * current view.
     * @param {string} view 
     */
    #updateNavbar(view) {
        // removes "selected" from all links
        Array
            .from(this.#signedInCntrElm.querySelectorAll('nav a'))
            .forEach((elm) => elm.classList.remove('selected'));
        
        // applies "selected" to link associated with view
        const elm = this.#signedInCntrElm.querySelector(`#nav-${view}`);
        if (elm) elm.classList.add('selected');
    }
}