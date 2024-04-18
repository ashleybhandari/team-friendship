import { Header } from '../components/Header.js';
import { Footer } from '../components/Footer.js';

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

    async render() {
        const createAcctViewElm = document.createElement('div');
        createAcctViewElm.id = 'createAcctView';

        this.#viewContainer = document.createElement('div');

        createAcctViewElm.appendChild(await new Header().render());
        createAcctViewElm.appendChild(this.#viewContainer);
        createAcctViewElm.appendChild(await new Footer().render());

        return createAcctViewElm;
    }
}