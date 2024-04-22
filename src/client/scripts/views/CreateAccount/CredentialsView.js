import { Button } from '../../components/Button.js';
import { ProgressBar } from '../../components/ProgressBar.js';
import { Events } from '../../Events.js';

// view: create-1
export class CredentialsView {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const credViewElm = document.createElement('div');
        credViewElm.id = 'credentialsView';

        credViewElm.appendChild(await new ProgressBar(1).render());

        // TODO: view content

        this.#renderNavigation(credViewElm);

        return credViewElm;
    }

    async #renderNavigation(container) {
        const nextBtn = await new Button('Next').render();

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.#events.publish('navigateTo', 'create-2');
        });

        container.append(nextBtn);
    }
}