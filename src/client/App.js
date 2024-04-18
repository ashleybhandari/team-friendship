import { CreateAccountView } from "./views/CreateAccountView.js";
import { SignedInView } from "./views/SignedInView.js";
import { SignedOutView } from "./views/SignedOutView.js";
import { Events } from './Events.js';

/**
 * May be injected with:
 *   - CreateAccountView
 *   - SignedInView
 *   - SignedOutView
 */
export class App {
    #viewContainer = null;
    #createAcctViewElm  = null;
    #signedInViewElm  = null;
    #signedOutViewElm  = null;
    #events  = null;

    constructor() {
        this.#events = Events.events();   
    }

    async render(root) {
        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';
    }

    #navigateTo(view) {}
}