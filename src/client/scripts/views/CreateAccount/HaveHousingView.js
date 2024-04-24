import { Navigation } from '../../components/Navigation.js';
import { TextInput } from '../../components/TextInput.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { CheckboxInput } from '../../components/CheckboxInput.js';
import { users } from '../../../data/MockData.js';
import { QueryFunctions } from '../../helpers/queryFunctions.js';

export class HaveHousingView {
    #viewContainer = null;
    #preferencesSection = null;
    #user = null;
    #queryFns = null;
    #requiredFields = null;

    constructor() {
        localStorage.setItem('user', JSON.stringify(users[5]));
        this.#user = JSON.parse(localStorage.getItem('user'));
    }

    async render() {
        const haveHousingViewElm = document.createElement('div');
        haveHousingViewElm.id = 'haveHousingView';

        const preferencesHeader = document.createElement('h2');
        preferencesHeader.innerText = 'Tell us your housing';
        preferencesHeader.classList.add('preferences-header');
        haveHousingViewElm.appendChild(preferencesHeader);

        const preferencesNote = document.createElement('p');
        preferencesNote.innerText = "photo(s) and starred fields are required";
        preferencesNote.classList.add('preferences-note');
        haveHousingViewElm.appendChild(preferencesNote);

        const smallBoxesRow = this.renderSmallBoxesRow(["Add Photo", "", "", "", ""]);
        haveHousingViewElm.appendChild(smallBoxesRow);

        this.#preferencesSection = new PreferencesSection(haveHousingViewElm);
        await this.#preferencesSection.render();

        const navigation = await new Navigation('create-3', 'discover', true).render();
        haveHousingViewElm.appendChild(navigation);

        this.#queryFns = new QueryFunctions(haveHousingViewElm, this.#user);
        this.#fillFields(haveHousingViewElm);

        this.#validationSetup(haveHousingViewElm);

        return haveHousingViewElm;
    }

    async handleSubmit(event) {
        event.preventDefault();
    }

    #fillFields(parent) {
        this.#queryFns.getFns().forEach((field) => field.fill());
    }

    #validationSetup(parent) {
        this.#requiredFields = this.#preferencesSection.requiredFields();

        this.#requiredFields.forEach((query) =>
            parent.querySelector(query).required = true
        );
    }

    renderSmallBoxesRow(labels) {
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('small-boxes-row');
        rowContainer.style.display = 'flex'; 
    
        for (let i = 0; i < 5; i++) {
            const box = document.createElement('div');
            box.classList.add('small-box');
            box.style.width = '150px';
            box.style.height = '150px';
            box.style.backgroundColor = '#CCCCCC'; 
            box.style.marginRight = '20px'; 
            if (i === 0) {
                box.textContent = "Add Photo";
            }
            rowContainer.appendChild(box);
        }
    
        return rowContainer;
    }
}

class PreferencesSection {
    #parent = null;

    constructor(parent) {
        this.#parent = parent;
    }

    requiredFields() {
        return [];
    }

    async render() {
        const section = document.createElement('div');
        section.id = 'preferences';
        section.classList.add('section');

        section.appendChild(await this.renderCol1());
        section.appendChild(await this.renderCol2());
        section.appendChild(await this.renderCol3());

        this.#parent.appendChild(section);
    }

    async renderCol1() {
        const elm = document.createElement('div');

        elm.appendChild(await new TextInput('Cities (comma-separated)').render());

        const rent = document.createElement('div');
        rent.classList.add('subgroup');
        rent.appendChild(await new TextInput('Min rent', 'text', 118).render());
        rent.appendChild(await new TextInput('Max rent', 'text', 118).render());
        elm.appendChild(rent);

        const occupants = document.createElement('div');
        occupants.classList.add('subgroup');
        occupants.appendChild(await new TextInput('Min occupants', 'text', 118).render());
        occupants.appendChild(await new TextInput('Max occupants', 'text', 118).render());
        elm.appendChild(occupants);

        elm.appendChild(await new DropdownInput(
            'Gender inclusivity', ['All-female', 'All-male', 'Mixed']
        ).render());

        elm.appendChild(await new DropdownInput(
            'Move-in period', ['Fall', 'Winter', 'Spring', 'Summer']
        ).render());

        return elm;
    }

    async renderCol2() {
        const elm = document.createElement('div');

        elm.appendChild(await new DropdownInput(
            'Lease length', ['Per semester', 'Monthly', '6 months', 'Yearly']
        ).render());

        elm.appendChild(await new DropdownInput(
            'Lease type', ['Rent', 'Sublet']
        ).render());

        elm.appendChild(await new DropdownInput(
            'Room type', ['Private', 'Shared']
        ).render());

        elm.appendChild(await new DropdownInput(
            'Building type', ['Dorm', 'Apartment', 'House']
        ).render());

        return elm;
    }

    async renderCol3() {
        const elm = document.createElement('div');
        elm.classList.add('checkbox-list');

        elm.appendChild(await new CheckboxInput('Air conditioning').render());
        elm.appendChild(await new CheckboxInput('Dishwasher').render());
        elm.appendChild(await new CheckboxInput('Hardwood floors').render());
        elm.appendChild(await new CheckboxInput('Carpet floors').render());
        elm.appendChild(await new CheckboxInput('On-site laundry').render());
        elm.appendChild(await new CheckboxInput('Residential parking').render());
        elm.appendChild(await new CheckboxInput('Nearby bus stop').render());
        elm.appendChild(await new CheckboxInput('Pet-friendly').render());

        return elm;
    }
}
// import { ProgressBar } from '../../components/ProgressBar.js';
// import { Navigation } from '../../components/Navigation.js';
// import { Button } from '../../components/Button.js';
// import { Events } from '../../Events.js';

// // view: create-4
// export class HaveHousingView {
//     #viewContainer = null;
//     #events = null;

//     constructor() {
//         this.#events = Events.events();
//     }

//     async render() {
//         const haveHousingViewElm = document.createElement('div');
//         haveHousingViewElm.id = 'haveHousingView';

//         haveHousingViewElm.appendChild(await new ProgressBar(4).render());

//         const content = document.createElement('div');
//         content.innerHTML = `
//             <h2>Create Account - Have Housing</h2>
//             <form id="haveHousingForm">
//                 <label for="firstName">First Name:</label>
//                 <input type="text" id="firstName" name="firstName" required><br><br>
                
//                 <label for="lastName">Last Name:</label>
//                 <input type="text" id="lastName" name="lastName" required><br><br>
                
//                 <label for="email">Email:</label>
//                 <input type="email" id="email" name="email" required><br><br>
                
//                 <label for="phone">Phone:</label>
//                 <input type="tel" id="phone" name="phone" required><br><br>
                
//                 <label for="availableRooms">Available Rooms:</label>
//                 <input type="number" id="availableRooms" name="availableRooms" required><br><br>
                
//                 <label for="rent">Rent per Room:</label>
//                 <input type="number" id="rent" name="rent" required><br><br>
                
//                 <button type="submit">Submit</button>
//             </form>
//         `;
//         haveHousingViewElm.appendChild(content);
//         haveHousingViewElm.appendChild(
//             await new Navigation('create-3', 'discover', true).render()
//         );

//         return haveHousingViewElm;
//     }
// }
