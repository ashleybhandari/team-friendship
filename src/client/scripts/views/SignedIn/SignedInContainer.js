// created by Ashley Bhandari

import { Header } from '../../components/Header.js';
import { Navbar2 } from '../../components/Navbar2.js';
import { DisplayWithHousingView } from './DisplayWithHousingView.js';
import { DisplayWithoutHousingView } from './DisplayWithoutHousingView.js'
import { MatchesView } from './MatchesView.js';
import { SettingsView } from './SettingsView.js';
import { Events } from '../../Events.js';

/**
 * Sets up header and navbar for Discover, Matches, and Settings views.
 * Injected into App.
 */
export class SignedInContainer {
    #signedInCntrElm = null;
    #viewContainer = null;
    #withHousingViewElm = null;
    #withoutHousingViewElm = null;
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
        this.#withHousingViewElm = await new DisplayWithHousingView().render();
        this.#withoutHousingViewElm = await new DisplayWithoutHousingView().render();
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
        this.#viewContainer.innerHTML = '';

        if (view === 'discover') {      // DisplayWithHousingView or DisplayWithoutHousingView
            // discover changes depending on whether user has housing  // DB TODO: implement
            this.#viewContainer.appendChild(this.#withHousingViewElm);
            this.#updateNavbar(view);
        }
        else if (view === 'matches') {  // MatchesView
            this.#viewContainer.appendChild(this.#matchesViewElm);
            this.#updateNavbar(view);
        }
        else if (view === 'settings') { // SettingsView
            this.#viewContainer.appendChild(this.#settingsViewElm);
            this.#updateNavbar(view);
        }
        else {                          // invalid view name
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
        // removes "selected" from all links
        Array
            .from(this.#signedInCntrElm.querySelectorAll('nav a'))
            .forEach((elm) => elm.classList.remove('selected'));
        
        // applies "selected" to link associated with view
        const elm = this.#signedInCntrElm.querySelector(`#nav-${view}`);
        if (elm) elm.classList.add('selected');
    }
}