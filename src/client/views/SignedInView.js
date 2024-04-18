import { Header } from '../components/Header.js';
import { Navbar2 } from '../components/Navbar2.js';
import { Footer } from '../components/Footer.js';
import { MatchesView } from './MatchesView.js';
import { SettingsView } from './SettingsView.js';
import { Events } from '../Events.js';

/**
 * Sets up header, navbar, and footer for Discover, Matches, and Settings
 * views. Injected into App.
 */
export class SignedInView {
    #signedInViewElm = null;
    #viewContainer = null;
    #matchesViewElm = null;
    #settingsViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        this.#signedInViewElm = document.createElement('div');
        this.#signedInViewElm.id = 'signedInView';

        this.#viewContainer = document.createElement('div');

        this.#signedInViewElm.appendChild(await new Header().render());
        this.#signedInViewElm.appendChild(await new Navbar2().render());
        this.#signedInViewElm.appendChild(this.#viewContainer);
        this.#signedInViewElm.appendChild(await new Footer().render());

        // renders views to be injected into viewContainer
        this.#matchesViewElm = await new MatchesView().render();
        this.#settingsViewElm = await new SettingsView().render();

        // initializes container
        this.#navigateTo('discover');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return this.#signedInViewElm;
    }

    /**
     * Called when navigateTo is published (by navbar or footer). Injects a new
     * view into viewContainer and styles the navbar accordingly.
     * @param {string} view "matches", "settings"
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';

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
        }
        
        window.location.hash = view;
    }

    /**
     * Applies the "selected" class only to the link associated with the
     * current view.
     */
    #updateNavbar(view) {
        Array
            .from(this.#signedInViewElm.querySelectorAll('nav a'))
            .forEach((elm) => elm.classList.remove('selected'));
            
        this.#signedInViewElm
            .querySelector(`#nav2-${view}`)
            .classList.add('selected');
    }
}