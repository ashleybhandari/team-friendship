// created by Ashley Bhandari

import { Footer } from './components/Footer.js';
import { CreateAccountContainer } from './views/CreateAccount/CreateAccountContainer.js';
import { SignedInContainer } from './views/SignedIn/SignedInContainer.js';
import { SignedOutContainer } from './views/SignedOut/SignedOutContainer.js';
import { Events } from './Events.js';
import * as db from '../../../data/DatabasePouchDB.js';

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

    /**
     * Creates all pages and navigates to landing.
     * @param {string} root - id of root div element
     */
    async render(root) {
        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';

        this.#viewContainer = document.createElement('div');

        // renders elements to be injected into viewContainer = containers and
        // their associated views
        this.#createAcctCntrElm = await new CreateAccountContainer().render();
        this.#signedInCntrElm = await new SignedInContainer().render();
        this.#signedOutCntrElm = await new SignedOutContainer().render();

        // initializes DB
        await db.init();

        // initializes view
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));
        await this.#events.publish('navigateTo', 'landing');

        rootElm.appendChild(this.#viewContainer);
        rootElm.appendChild(await new Footer().render());
    }

    /**
     * Navigates to SignedOutContainer, CreateAccountContainer, or
     * SignedInContainer depending on what view it's called with.
     * @param {string} view
     */
    async #navigateTo(view) {
        this.#viewContainer.innerHTML = '';

        // redirects user if necessary
        if (await this.#redirect(view)) return;

        switch (view) {
            case 'landing':    // SignedOut/LandingView
            case 'about':      // SignedOut/AboutView
                this.#viewContainer.appendChild(this.#signedOutCntrElm);
                break;
            case 'sign-in':    // CreateAccount/SignInView
            case 'create-1':   // CreateAccount/CredentialsView
            case 'create-2':   // CreateAccount/ProfileView
            case 'create-3':   // CreateAccount/HousingSituationView
            case 'create-4':   // CreateAccount/NeedHousingView or CreateAccount/HaveHousingView
                this.#viewContainer.appendChild(this.#createAcctCntrElm);
                break;
            case 'discover':   // SignedIn/DiscoverView
            case 'matches':    // SignedIn/MatchesView
            case 'settings':   // SignedIn/SettingsView
                this.#viewContainer.appendChild(this.#signedInCntrElm);
                break;
            default:           // invalid view name
                this.#viewContainer.appendChild(this.#signedOutCntrElm);
        }
    }

    /**
     * Redirects the user if they try accessing a page they aren't allowed to
     * (depending on whether they're signed in).
     * @param {string} view 
     * @returns {boolean} - Whether the user was redirected
     */
    async #redirect(view) {
        const userId = (await db.getCurUser()).userId;
        const signedIn = userId !== null;
        let redirect = false;

        if (signedIn && view === 'sign-in') {
            // if signed in, the Sign in button redirects to Discover page
            redirect = true;
            this.#events.publish('authenticated', userId);
            this.#events.publish('navigateTo', 'discover');
        }

        if (!signedIn) {
            // if signed out, pages only accessible by signing in redirects to
            // Sign in page
            switch (view) {
                case 'discover':
                case 'matches':
                case 'settings': {
                    redirect = true;
                    this.#events.publish('navigateTo', 'sign-in');
                }                    
                default:
                    break;
            }
        }

        return redirect;
    }
}
