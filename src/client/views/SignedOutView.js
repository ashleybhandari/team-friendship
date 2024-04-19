import { Navbar1 } from '../components/Navbar1.js';
import { Events } from '../Events.js';

/**
 * Sets up navbar for Landing and About views. Injected into App.
 */
export class SignedOutView {
    #viewContainer = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const signedOutViewElm = document.createElement('div');
        signedOutViewElm.id = 'signedOutView';

        this.#viewContainer = document.createElement('div');

        signedOutViewElm.appendChild(await new Navbar1().render());
        signedOutViewElm.appendChild(this.#viewContainer);

        // TODO: render views

        // initializes container
        this.#navigateTo('discover');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return signedOutViewElm;
    }

    /**
     * Called when navigateTo is published (by navbar or footer). Injects a new
     * view into viewContainer and styles the navbar accordingly.
     * @param {string} view - "landing", "about"
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';
        // TODO
    }

    /**
     * Applies the "selected" class only to the link associated with the
     * current view.
     */
    #updateNavbar(view) {
        // TODO
    }
}