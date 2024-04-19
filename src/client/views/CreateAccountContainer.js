import { Header } from '../components/Header.js';
import { Events } from '../Events.js';

/**
 * Injected into App.js. Can be injected with Sign in and Create account views.
 */
export class CreateAccountContainer {
    #viewContainer = null;
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
        // TODO: render views
        
        // initializes view container
        this.#navigateTo(''); // TODO
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return createAcctCntrElm;
    }

    /**
     * Called when navigateTo is published. Injects view into viewContainer.
     * @param {string} view
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';
        // TODO
    }
}