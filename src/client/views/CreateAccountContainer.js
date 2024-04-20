import { Header } from '../components/Header.js';
import { Events } from '../Events.js';
import { SignInView } from './SignInView.js';
import { CreateAccountView } from './CreateAccountView.js';


/**
 * Injected into App.js. Can be injected with Sign in and Create account views.
 */
export class CreateAccountContainer {
    #viewContainer = null;
    #events = null;
    #createAccountViewElm = null;
    #signInViewElm = null;

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
        // TODO: render views
        
        // initializes view container
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));
        this.#navigateTo('sign-in');
        return createAcctCntrElm;
    }

    /**
     * Called when navigateTo is published. Injects view into viewContainer.
     * @param {string} view
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';
    
        if (view === 'sign-in') {
            const signInViewInstance = new SignInView();
            signInViewInstance.render().then(viewElm => {
                this.#viewContainer.appendChild(viewElm);
            });
        } else if (view === 'create-account') {
            const createAccountViewInstance = new CreateAccountView();
            createAccountViewInstance.render().then(viewElm => {
                this.#viewContainer.appendChild(viewElm);
            });
        } else {
            const notFoundText = document.createElement('h2');
            notFoundText.textContent = 'Page Not Found';
            this.#viewContainer.appendChild(notFoundText);
        }
    }    
}