import { Header } from '../components/Header.js';
import { Events } from '../Events.js';

/**
 * Injected into App.js. Contains a container that may be injected with:
 *   - Sign in
 *   - Create Account - Credentials
 *   - Create Account - Profile
 *   - Create Account - Housing situation
 *   - Create Account - Need housing
 *   - Create Account - Have housing
 */
export class CreateAccountView {
    #viewContainer = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const createAcctViewElm = document.createElement('div');
        createAcctViewElm.id = 'createAcctView';

        this.#viewContainer = document.createElement('div');

        createAcctViewElm.appendChild(await new Header().render());
        createAcctViewElm.appendChild(this.#viewContainer);

        // TODO: render views
        
        // initializes container
        this.#navigateTo(''); // TODO
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return createAcctViewElm;
    }

    /**
     * Called when navigateTo is published. Injects a new view into
     * viewContainer.
     * @param {string} view
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';
        // TODO
    }
}