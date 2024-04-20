import { Navbar1 } from '../components/Navbar1.js';
import { LandingView } from '../views/LandingView.js';
import { AboutView } from '../views/AboutView.js';
import { Events } from '../Events.js';

/**
 * Sets up navbar for Landing and About views. Injected into App.
 */
export class SignedOutContainer {
    #signedOutCntrElm = null;
    #viewContainer = null;
    #landingViewElm = null;
    #aboutViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        this.#signedOutCntrElm = document.createElement('div');
        this.#signedOutCntrElm.id = 'signedOutCntr';

        this.#viewContainer = document.createElement('div');

        // navbar and view container
        this.#signedOutCntrElm.appendChild(await new Navbar1().render());
        this.#signedOutCntrElm.appendChild(this.#viewContainer);

        // renders views to be injected into viewContainer
        this.#landingViewElm = await new LandingView().render();
        this.#aboutViewElm = await new AboutView().render();
        
        // initializes view container
        this.#navigateTo('landing');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return this.#signedOutCntrElm;
    }

    /**
     * Called when navigateTo is published. Injects view into viewContainer and
     * styles the navbar accordingly.
     * @param {string} view
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';
        
        if (view === 'landing') {
            this.#viewContainer.appendChild(this.#landingViewElm);
            this.#updateNavbar(view);
        }
        else if (view === 'about') {
            this.#viewContainer.appendChild(this.#aboutViewElm);
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
            .from(this.#signedOutCntrElm.querySelectorAll('nav a'))
            .forEach((elm) => elm.classList.remove('selected'));
        
        const elm = this.#signedOutCntrElm.querySelector(`#nav-${view}`);
        if (elm) elm.classList.add('selected');
    }
}