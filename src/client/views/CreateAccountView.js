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
    async render() {
        const createAcctViewElm = document.createElement('div');
        createAcctViewElm.id = 'create-acct-view';

        const headerElm = new Header();

        const createAcctContainerElm = document.createElement('div');
        createAcctContainerElm.id = 'create-acct-container';

        const footerElm = new Footer();

        createAcctViewElm.appendChild(await headerElm.render());
        createAcctViewElm.appendChild(createAcctContainerElm);
        createAcctViewElm.appendChild(await footerElm.render());

        return createAcctViewElm;
    }
}