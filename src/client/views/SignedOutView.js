import { Navbar1 } from '../components/Navbar1.js';
import { Footer } from '../components/Footer.js';

/**
 * Injected into App.js. Contains a container that may be injected with:
 *   - Landing
 *   - About
 */
export class SignedOutView {
    #viewContainer = null;

    async render() {
        const signedOutViewElm = document.createElement('div');
        signedOutViewElm.id = 'signedOutView';

        this.#viewContainer = document.createElement('div');

        signedOutViewElm.appendChild(await new Navbar1().render());
        signedOutViewElm.appendChild(this.#viewContainer);
        signedOutViewElm.appendChild(await new Footer().render());

        return signedOutViewElm;
    }
}