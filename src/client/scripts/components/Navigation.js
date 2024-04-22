import { Button } from './Button.js';
import { Events } from '../Events.js';

export class Navigation {
    #events = null;

    /**
     * UI component: "Back" and "Next" buttons
     * @param {string} back - href for previous page
     * @param {string} next - href for next page
     * @param {boolean} [final=false] - whether current page is the last one
     */
    constructor(back, next, final = false) {
        this.back = back;
        this.next = next;
        this.final = final;
        this.#events = Events.events();
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('navigation');

        const backBtn = await new Button('Back', 130).render();
        const nextBtn = await new Button(
            'Next', 130, this.final ? 'submit' : 'button'
        ).render();

        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.#events.publish('navigateTo', this.back);
        });
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.#events.publish('navigateTo', this.next);
        });
        
        elm.appendChild(backBtn);
        elm.appendChild(nextBtn);

        return elm;
    }
}