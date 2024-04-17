import { Events } from '../Events.js';

export class Navbar2 {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('navbar2');

        elm.innerHTML = `
        <nav>
            <div class="text-links">
                <a href="#discover" id="discover">Discover</a>
                <a href="#matches" id="matches">Matches</a>
            </div>
            <div class="settings">
                <a href="#settings" id="settings">
                    <i class="material-symbols-outlined">settings</i>
                </a>
            </div>
        </nav>
        <hr>
        `;

        elm
            .querySelectorAll('a')
            .forEach(link =>
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const view = e.currentTarget.getAttribute('id');
                    window.location.hash = view;
                    await this.#events.publish('navigateTo', view);
                })
            );
        
        return elm;
    }
}