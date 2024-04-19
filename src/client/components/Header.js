import { Events } from '../Events.js';

/**
 * UI component: Logo + "KeyMate" centered at the top of the screen.
 */
export class Header {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const header = document.createElement('header');
        header.classList.add('header');

        // logo image
        const logo = document.createElement('img');
        logo.src = 'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/logo.png';
        logo.alt = 'KeyMate logo';

        // "KeyMate"
        const title = document.createElement('h1');
        title.classList.add('battambang');
        title.innerText = 'KeyMate';

        header.appendChild(logo);
        header.appendChild(title);

        // when header is clicked, navigates to the Discover page (if user is
        // signed in) or the Landing page (if user is signed out)
        header.addEventListener('click', async (e) => {
            e.preventDefault();

            const view = 'landing';
            // TODO: const view = signed in ? 'discover' : 'landing';

            window.location.hash = view;
            await this.#events.publish('navigateTo', view);
        });

        return header;
    }
}