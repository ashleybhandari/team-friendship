import { Header } from '../components/Header.js';
import { Events } from '../Events.js';

export class HaveHousingView {
    #viewContainer = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const haveHousingViewElm = document.createElement('div');
        haveHousingViewElm.id = 'haveHousingView';
        const header = new Header();
        haveHousingViewElm.appendChild(await header.render());
        const content = document.createElement('div');
        content.innerHTML = `
            <h2>Create Account - Have Housing</h2>
            <form id="haveHousingForm">
                <label for="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" required><br><br>
                
                <label for="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" required><br><br>
                
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br><br>
                
                <label for="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" required><br><br>
                
                <label for="availableRooms">Available Rooms:</label>
                <input type="number" id="availableRooms" name="availableRooms" required><br><br>
                
                <label for="rent">Rent per Room:</label>
                <input type="number" id="rent" name="rent" required><br><br>
                
                <button type="submit">Submit</button>
            </form>
        `;
        haveHousingViewElm.appendChild(content);
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return haveHousingViewElm;
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
