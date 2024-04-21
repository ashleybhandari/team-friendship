import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';
import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';

// href: create-4-1
export class NeedHousingView {
    #viewContainer = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const needHousingViewElm = document.createElement('div');
        needHousingViewElm.id = 'needHousingView';

        needHousingViewElm.appendChild(await new ProgressBar(4).render());

        const content = document.createElement('div');
        content.innerHTML = `
            <h2>Create Account - Need Housing</h2>
            <form id="needHousingForm">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required><br><br>
                
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required><br><br>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>
                
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required><br><br>
                
                <label for="housingPreferences">Housing Preferences:</label>
                <textarea id="housingPreferences" name="housingPreferences" required></textarea><br><br>
                
                <button type="submit">Submit</button>
            </form>
        `;
        needHousingViewElm.appendChild(content);
        needHousingViewElm.appendChild(
            await new Navigation('create-3', 'landing', true).render()
        );

        return needHousingViewElm;
    }
}
