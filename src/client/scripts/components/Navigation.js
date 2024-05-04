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
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // DB TODO: move next 2 lines into a try-catch
            this.nextHandlers.forEach((handler) => handler(e));
            this.#events.publish('navigateTo', this.next);
        });
        
        elm.appendChild(backBtn);
        elm.appendChild(nextBtn);

        return elm;
    }
}