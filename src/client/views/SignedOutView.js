import { Navbar1 } from '../components/Navbar1.js';
import { Footer } from '../components/Footer.js';

export class SignedOutView {
    async render() {
        const signedOutViewElm = document.createElement('div');
        signedOutViewElm.id = 'signed-out-view';

        const navbarElm = new Navbar1();

        const signedOutContainerElm = document.createElement('div');
        signedOutContainerElm.id = 'signed-out-container';
        /* can inject the following into signedOutContainerElm:
         * Landing
         * About
        */

        const footerElm = new Footer();

        signedOutViewElm.appendChild(await navbarElm.render());
        signedOutViewElm.appendChild(signedOutContainerElm);
        signedOutViewElm.appendChild(await footerElm.render());

        return signedOutViewElm;
    }
}