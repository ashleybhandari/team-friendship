import { CreateAccountView } from "./views/CreateAccountView.js";
import { SignedInView } from "./views/SignedInView.js";
import { SignedOutView } from "./views/SignedOutView.js";
import { Events } from './Events.js';

/**
 * Sets up headers and footers for account creation views, signed in views, and
 * signed out views.
 */
export class App {
    #viewContainer = null;
    #createAcctViewElm  = null;
    #signedInViewElm  = null;
    #signedOutViewElm  = null;
    #events  = null;

    constructor() {
        this.#events = Events.events();   
    }

    async render(root) {
        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';

        this.#viewContainer = document.createElement('div');

        // renders views to be injected into viewContainer
        this.#createAcctViewElm = await new CreateAccountView().render();
        this.#signedInViewElm = await new SignedInView().render();
        this.#signedOutViewElm = await new SignedOutView().render();

        // initializes view
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));
        await this.#events.publish('navigateTo', 'landing');

        rootElm.appendChild(this.#viewContainer);
    }

    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';

        // TODO: create accounts views
        switch (view) {
            case 'landing':
            case 'about':
                this.#viewContainer.appendChild(this.#signedOutViewElm);
                break;
            case 'discover':
            case 'matches':
            case 'settings':
                this.#viewContainer.appendChild(this.#signedInViewElm);
                break;
            default:
                this.#viewContainer.appendChild(this.#signedOutViewElm);
        }
    }
}