import { Header } from '../components/Header.js';
import { Events } from '../Events.js';

export class NeedHousingView {
    #viewContainer = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const needHousingViewElm = document.createElement('div');
        needHousingViewElm.id = 'needHousingView';
        const header = new Header();
        needHousingViewElm.appendChild(await header.render());
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
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return needHousingViewElm;
    }

    /**
     * Called when navigateTo is published. Injects a new view into
     * viewContainer.
     * @param {string} view
     */
    #navigateTo(view) {
        // Handle navigation to other views if needed
    }
}
