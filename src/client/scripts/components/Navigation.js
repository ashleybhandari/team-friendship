// created by Ashley Bhandari

import { Button } from './Button.js';
import { Events } from '../Events.js';

export class Navigation {
    #events = null;

    /**
     * UI component: "Back" and "Next" buttons
     * @param {string} back - href for previous page
     * @param {string} next - href for next page
     * @param {function[]} [nextHandlers] - event handlers for clicking Next or Submit 
     * @param {boolean} [final=false] - whether current page is the last one
     */
    constructor(back, next, nextHandlers = [], final = false) {
        this.back = back;
        this.next = next;
        this.nextHandlers = nextHandlers;
        this.final = final;
        this.#events = Events.events();
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('navigation');

        const backBtn = await new Button('Back', 130).render();
        const nextBtn = await new Button(
            this.final ? 'Finish' : 'Next',
            130,
            this.final ? 'submit' : 'button'
        ).render();

        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.#events.publish('navigateTo', this.back);
        });
        nextBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                for (const handler of this.nextHandlers) {
                    await handler();
                }
                this.#events.publish('navigateTo', this.next);
            } catch (error) {
                console.log(error.message);
            }
        });
        
        elm.appendChild(backBtn);
        elm.appendChild(nextBtn);

        return elm;
    }
}