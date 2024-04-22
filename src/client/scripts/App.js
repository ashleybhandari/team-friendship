import { Footer } from './components/Footer.js';
import { CreateAccountContainer } from './views/CreateAccount/CreateAccountContainer.js';
import { SignedInContainer } from './views/SignedIn/SignedInContainer.js';
import { SignedOutContainer } from './views/SignedOut/SignedOutContainer.js';
import { Events } from './Events.js';

/**
 * Sets up headers and footers for account creation, signed in, and signed out
 * view containers.
 */
export class App {
    #viewContainer = null;
    #createAcctCntrElm  = null;
    #signedInCntrElm  = null;
    #signedOutCntrElm  = null;
    #events  = null;

    constructor() {
        this.#events = Events.events();   
    }

    async render(root) {
        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';

        this.#viewContainer = document.createElement('div');

        // renders elements to be injected into viewContainer
        this.#createAcctCntrElm = await new CreateAccountContainer().render();
        this.#signedInCntrElm = await new SignedInContainer().render();
        this.#signedOutCntrElm = await new SignedOutContainer().render();

        // initializes view
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));
        await this.#events.publish('navigateTo', 'landing');

        rootElm.appendChild(this.#viewContainer);
        rootElm.appendChild(await new Footer().render());
    }

    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';

        // TODO: createAcctCntr views
        switch (view) {
            case 'landing':
            case 'about':
                this.#viewContainer.appendChild(this.#signedOutCntrElm);
                break;
            case 'sign-in':
            case 'create-1':   // CredentialsView
            case 'create-2':   // ProfileView
            case 'create-3':   // HousingSituationView
            case 'create-4-1': // NeedHousingView
            case 'create-4-2': // HaveHousingView
                this.#viewContainer.appendChild(this.#createAcctCntrElm);
                break;
            case 'discover':
            case 'matches':
            case 'settings':
                this.#viewContainer.appendChild(this.#signedInCntrElm);
                break;
            default:
                this.#viewContainer.appendChild(this.#signedOutCntrElm);
        }
    }
}