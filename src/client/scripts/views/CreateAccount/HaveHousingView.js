import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';
import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';

// view: create-4
export class HaveHousingView {
    #viewContainer = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const haveHousingViewElm = document.createElement('div');
        haveHousingViewElm.id = 'haveHousingView';

        haveHousingViewElm.appendChild(await new ProgressBar(4).render());

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
        haveHousingViewElm.appendChild(
            await new Navigation('create-3', 'discover', true).render()
        );

        return haveHousingViewElm;
    }
}
