import { Events } from './Events.js';

export class Footer {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('footer');

        const center = document.createElement('div');
        center.classList.add('center');
        center.innerHTML = `
        <h2 class="battambang">KeyMate</h2>
        <p>© 2024 Team Friendship. All Rights Reserved</p>
        <a href="https://www.flaticon.com/free-icons/magic" title="flaticon.com">
            Logo created by Freepik - Flaticon
        </a>
        `;

        const links1 = document.createElement('ul');
        links1.classList.add('left');
        links1.innerHTML = `
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About us</a></li>
        `;

        const links2 = document.createElement('ul');
        links2.classList.add('right');
        links2.innerHTML = `
        <li><a href="#discover">Discover</a></li>
        <li><a href="#matches">Matches</a></li>
        <li><a href="#settings">Settings</a></li>
        `;

        elm
            .querySelectorAll('li a')
            .forEach(link =>
                link.addEventListener('click', async (e) => {
                    e.preventDefault();
                    const view = e.target.getAttribute('href').replace('#', '');
                    window.location.hash = view;
                    await this.#events.publish('navigateTo', view);
                })
            );

        elm.appendChild(center);
        elm.appendChild(links1);
        elm.appendChild(links2);

        return elm;
    }
}