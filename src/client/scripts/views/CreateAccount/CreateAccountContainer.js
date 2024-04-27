// created by Ashley Bhandari

import { Header } from '../../components/Header.js';
import { SignInView } from '../CreateAccount/SignInView.js';
import { CredentialsView } from '../CreateAccount/CredentialsView.js';
import { ProfileView } from '../CreateAccount/ProfileView.js';
import { HousingSituationView } from '../CreateAccount/HousingSituationView.js';
import { UserDetailsView } from '../CreateAccount/UserDetailsView.js';
import { Events } from '../../Events.js';

/**
 * Injected into App.js. Can be injected with Sign in and Create account views.
 */
export class CreateAccountContainer {
    #viewContainer = null;
    #signInViewElm = null;
    #credViewElm = null;
    #profileViewElm = null;
    #situationViewElm = null;
    #detailsViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const createAcctCntrElm = document.createElement('div');
        createAcctCntrElm.id = 'createAcctCntr';

        this.#viewContainer = document.createElement('div');

        // header and view container
        createAcctCntrElm.appendChild(await new Header().render());
        createAcctCntrElm.appendChild(this.#viewContainer);

        // renders views to be injected into viewContainer
        this.#signInViewElm = await new SignInView().render();
        this.#credViewElm = await new CredentialsView().render();
        this.#profileViewElm = await new ProfileView().render();
        this.#situationViewElm = await new HousingSituationView().render();
        this.#detailsViewElm = await new UserDetailsView().render();
        
        // initializes view container
        this.#navigateTo('sign-in');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return createAcctCntrElm;
    }

    /**
     * Called when navigateTo is published. Injects view into viewContainer.
     * @param {string} view
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';
    
        if (view === 'sign-in') {         // SignInView
            this.#viewContainer.appendChild(this.#signInViewElm);
        }
        else if (view === 'create-1') {   // CredentialsView
            this.#viewContainer.appendChild(this.#credViewElm);
        }
        else if (view === 'create-2') {   // ProfileView
            this.#viewContainer.appendChild(this.#profileViewElm);
        }
        else if (view === 'create-3') {   // HousingSituationView
            this.#viewContainer.appendChild(this.#situationViewElm);
        }
        else if (view === 'create-4') {   // UserDetailsView
            this.#viewContainer.appendChild(this.#detailsViewElm);
        }
        else {                            // invalid view name
            this.#viewContainer.innerHTML = '<h2>404 Page Not Found</h2>'
        }

        window.location.hash = view;
    }
}