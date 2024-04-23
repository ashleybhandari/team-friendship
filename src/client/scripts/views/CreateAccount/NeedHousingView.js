import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';
import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';

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
                <label for="housingPreferences">Housing Preferences:</label>
                <div class="input-box">
                    <textarea id="housingPreferences" name="housingPreferences" rows="9" style="width: 360px; height: 354.45px;" required></textarea>
                    <div class="ovals">
                        <div class="row">
                            <button class="oval-button">Cities (comma-separated)</button>
                        </div>
                        <div class="row">
                            <button class="oval-button">Min-rent</button>
                            <span>-</span>
                            <button class="oval-button">Max-rent</button>
                        </div>
                        <div class="row">
                            <button class="oval-button">Min-occupants</button>
                            <span>-</span>
                            <button class="oval-button">Max-occupants</button>
                        </div>
                        <div class="row">
                            <button class="oval-button">Gender inclusivity</button>
                        </div>
                        <div class="row">
                            <button class="oval-button">Lease length</button>
                        </div>
                        <div class="row">
                            <button class="oval-button">Lease type</button>
                        </div>
                        <div class="row">
                            <button class="oval-button">Room type</button>
                        </div>
                        <div class="row">
                            <button class="oval-button">Building type</button>
                        </div>
                        <div class="row">
                            <button class="oval-button">Move-in period</button>
                        </div>
                    </div>
                </div>
                <div class="checkboxes">
                    <div class="preferences-heading">
                        <h3>Tell Us Your Preferences</h3>
                        <p>We'll use this to set up your feed</p>
                    </div>
                    <input type="checkbox" id="airConditioning" name="airConditioning">
                    <label for="airConditioning">Air conditioning</label><br>
                    <input type="checkbox" id="dishwasher" name="dishwasher">
                    <label for="dishwasher">Dishwasher</label><br>
                    <input type="checkbox" id="hardwoodFloors" name="hardwoodFloors">
                    <label for="hardwoodFloors">Hard-wood floors</label><br>
                    <input type="checkbox" id="carpetFloors" name="carpetFloors">
                    <label for="carpetFloors">Carpet floors</label><br>
                    <input type="checkbox" id="onSiteLaundry" name="onSiteLaundry">
                    <label for="onSiteLaundry">On-site laundry</label><br>
                    <input type="checkbox" id="residentialParking" name="residentialParking">
                    <label for="residentialParking">Residential parking</label><br>
                    <input type="checkbox" id="nearbyBusStop" name="nearbyBusStop">
                    <label for="nearbyBusStop">Nearby bus stop</label><br>
                    <input type="checkbox" id="petFriendly" name="petFriendly">
                    <label for="petFriendly">Pet-friendly</label><br>
                </div>
                <button type="submit">Submit</button>
            </form>
        `;
        needHousingViewElm.appendChild(content);

        const navigation = await new Navigation('create-3', 'discover', true).render();
        needHousingViewElm.appendChild(navigation);

        return needHousingViewElm;
    }
}
// import { ProgressBar } from '../../components/ProgressBar.js';
// import { Navigation } from '../../components/Navigation.js';
// import { Button } from '../../components/Button.js';
// import { Events } from '../../Events.js';

// // view: create-4
// export class NeedHousingView {
//     #viewContainer = null;
//     #events = null;

//     constructor() {
//         this.#events = Events.events();
//     }

//     async render() {
//         const needHousingViewElm = document.createElement('div');
//         needHousingViewElm.id = 'needHousingView';

//         needHousingViewElm.appendChild(await new ProgressBar(4).render());

//         const content = document.createElement('div');
//         content.innerHTML = `
//             <h2>Create Account - Need Housing</h2>
//             <form id="needHousingForm">
//                 <label for="firstName">First Name:</label>
//                 <input type="text" id="firstName" name="firstName" required><br><br>
                
//                 <label for="lastName">Last Name:</label>
//                 <input type="text" id="lastName" name="lastName" required><br><br>
                
//                 <label for="email">Email:</label>
//                 <input type="email" id="email" name="email" required><br><br>
                
//                 <label for="phone">Phone:</label>
//                 <input type="tel" id="phone" name="phone" required><br><br>
                
//                 <label for="housingPreferences">Housing Preferences:</label>
//                 <textarea id="housingPreferences" name="housingPreferences" required></textarea><br><br>
                
//                 <button type="submit">Submit</button>
//             </form>
//         `;
//         needHousingViewElm.appendChild(content);
//         needHousingViewElm.appendChild(
//             await new Navigation('create-3', 'discover', true).render()
//         );

//         return needHousingViewElm;
//     }
// }
