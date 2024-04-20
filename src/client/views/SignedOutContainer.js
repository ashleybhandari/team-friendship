import { Navbar1 } from '../components/Navbar1.js';
import { Events } from '../Events.js';
import { LandingView } from '../views/LandingView.js';

/**
 * Sets up navbar for Landing and About views. Injected into App.
 */
export class SignedOutContainer {
    #viewContainer = null;
    #landingViewElm = null;
    #aboutViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const signedOutCntrElm = document.createElement('div');
        signedOutCntrElm.id = 'signedOutCntr';

        this.#viewContainer = document.createElement('div');

        // navbar and view container
        signedOutCntrElm.appendChild(await new Navbar1().render());
        signedOutCntrElm.appendChild(this.#viewContainer);

        // renders views to be injected into viewContainer
        // TODO: render #landingViewElm and #aboutViewElm

        // initializes view container
        this.#navigateTo('landing');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return signedOutCntrElm;
    }

    /**
     * Called when navigateTo is published. Injects view into viewContainer and
     * styles the navbar accordingly.
     * @param {string} view - "landing", "about"
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';
        let viewElement;
    
        if (view === 'landing') {
            if (!this.#landingViewElm) {
                this.#landingViewElm = new LandingView().render();
            }
            viewElement = this.#landingViewElm;
        } else if (view === 'about') {
            if (!this.#aboutViewElm) {
                this.#aboutViewElm = new AboutView().render();
            }
            viewElement = this.#aboutViewElm;
        } else {
            viewElement = document.createElement('h2');
            viewElement.textContent = '404 Page Not Found';
        }
    
        this.#updateNavbar(view);
        this.#viewContainer.appendChild(viewElement);
        
        // TODO
        // if (view === 'landing') {
        //     this.#viewContainer.appendChild(this.#landingViewElm);
        //     this.#updateNavbar(view);
        // }
        // else if (view === 'about') {
        //     this.#viewContainer.appendChild(this.#aboutViewElm);
        //     this.#updateNavbar(view);
        // }
        // else {
        //     this.#viewContainer.innerHTML = '<h2>404 Page Not Found</h2>'
        //     this.#updateNavbar(view);
        // }

        // window.location.hash = view;
    }

    /**
     * Applies the "selected" class only to the link associated with the
     * current view.
     * @param {string} view 
     */
    #updateNavbar(view) {
        // TODO
    }
}