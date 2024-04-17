import { Header } from '../components/Header.js';
import { Navbar2 } from '../components/Navbar2.js';
import { Footer } from '../components/Footer.js';

/**
 * Injected into App.js. Contains a container that may be injected with:
 *   - Discover - Profile with housing
 *   - Discover - Profile without housing
 *   - Matches
 *   - Settings
 */
export class SignedInView {
    async render() {
        const signedInViewElm = document.createElement('div');
        signedInViewElm.id = 'signed-in-view';

        const headerElm = new Header();
        const navbarElm = new Navbar2();

        const signedInContainerElm = document.createElement('div');
        signedInContainerElm.id = 'signed-in-container';

        const footerElm = new Footer();

        signedInViewElm.appendChild(await headerElm.render());
        signedInViewElm.appendChild(await navbarElm.render());
        signedInViewElm.appendChild(signedInContainerElm);
        signedInViewElm.appendChild(await footerElm.render());

        return signedInViewElm;
    }
}