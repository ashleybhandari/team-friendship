import { Header } from '../components/Header.js';
import { Navbar2 } from '../components/Navbar2.js';
import { Footer } from '../components/Footer.js';
import { MatchesView } from './MatchesView.js';
import { SettingsView } from './SettingsView.js';
import { Events } from '../Events.js';

/**
 * Injected into App.js. Contains a container that may be injected with:
 *   - Discover - Profile with housing
 *   - Discover - Profile without housing
 *   - Matches
 *   - Settings
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
        this.#signedInViewElm.id = 'signed-in-view';

        const headerElm = new Header();
        const navbarElm = new Navbar2();

        this.#viewContainer = document.createElement('div');
        this.#viewContainer.id = 'signed-in-container';

        const footerElm = new Footer();

        this.#signedInViewElm.appendChild(await headerElm.render());
        this.#signedInViewElm.appendChild(await navbarElm.render());
        this.#signedInViewElm.appendChild(this.#viewContainer);
        this.#signedInViewElm.appendChild(await footerElm.render());

        // renders views
        const matchesView = new MatchesView();
        const settingsView = new SettingsView();
        this.#matchesViewElm = await matchesView.render();
        this.#settingsViewElm = await settingsView.render();

        // initializes container
        this.#navigateTo('discover');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return this.#signedInViewElm;
    }

    /**
     * Called when navigateTo is published (by navbar or footer). Injects a new
     * view into viewContainer and styles the navbar accordingly.
     * @param {string} view - "matches", "settings"
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';

        if (view === 'matches') {
            this.#viewContainer.appendChild(this.#matchesViewElm);
        }
        else if (view === 'settings') {
            this.#viewContainer.appendChild(this.#settingsViewElm);
        }
        else {
            this.#viewContainer.innerHTML = '<h2>404 Page Not Found</h2>'
        }
        
        window.location.hash = view;

        // apply the "selected" class only to the link associated with the
        // current view
        Array
            .from(this.#signedInViewElm.querySelectorAll('nav a'))
            .forEach((elm) => elm.classList.remove('selected'));
            
        this.#signedInViewElm
            .querySelector(`#nav2-${view}`)
            .classList.add('selected');
    }
}