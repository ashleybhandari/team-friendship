import { Header } from '../components/Header.js';
import { SignInView } from './SignInView.js';
import { CreateCredentialsView } from './CreateCredentialsView.js';
import { Events } from '../Events.js';

/**
 * Injected into App.js. Can be injected with Sign in and Create account views.
 */
export class CreateAccountContainer {
    #viewContainer = null;
    #signInViewElm = null;
    #createCredViewElm = null;
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
        // TODO: other views
        this.#signInViewElm = await new SignInView().render()
        this.#createCredViewElm = await new CreateCredentialsView().render()
        
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
    
        if (view === 'sign-in') {
            this.#viewContainer.appendChild(this.#signInViewElm);
        }
        else if (view === 'create-credentials') {
            console.log(view)
            this.#viewContainer.appendChild(this.#createCredViewElm);
        }
        else {
            this.#viewContainer.innerHTML = '<h2>404 Page Not Found</h2>'
        }

        window.location.hash = view;
    }
}