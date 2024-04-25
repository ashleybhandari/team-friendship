// created by Isha Bang
import { Navigation } from '../../components/Navigation.js';
import { TextInput } from '../../components/TextInput.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { CheckboxInput } from '../../components/CheckboxInput.js';
import { SettingsFns } from '../../helpers/SettingsFns.js';
import { getCurrentUser } from '../../../data/MockBackend.js';

export class HaveHousingView {
    #preferencesSection = null;
    #user = null;
    #queryFns = null;
    #requiredFields = null;
    #events = null;

    constructor(events) {
        this.#events = events; 
    }

    async render() {
        const user = await getCurrentUser();
        localStorage.setItem('user', JSON.stringify(user));
        this.#user = JSON.parse(localStorage.getItem('user'));

        const haveHousingViewElm = document.createElement('div');
        haveHousingViewElm.id = 'haveHousingView';

        const headerContainer = document.createElement('div');
        headerContainer.style.textAlign = 'center'; 
    
        const preferencesHeader = document.createElement('h2');
        preferencesHeader.innerText = 'Tell us your housing';
        preferencesHeader.classList.add('preferences-header');
        headerContainer.appendChild(preferencesHeader);
    
        const preferencesNote = document.createElement('p');
        preferencesNote.innerText = "photo(s) and starred fields are required";
        preferencesNote.classList.add('preferences-note');
        headerContainer.appendChild(preferencesNote);
    
        haveHousingViewElm.appendChild(headerContainer);

        const smallBoxesRow = this.renderSmallBoxesRow(["Add Photo", "", "", "", ""]);
        haveHousingViewElm.appendChild(smallBoxesRow);

        const additionalBox = document.createElement('div');
        additionalBox.style.backgroundColor = '#FFFFFF';
        additionalBox.style.padding = '10px';
        additionalBox.style.width = '500px';
        additionalBox.style.height = '250px';
        additionalBox.style.position = 'absolute';
        additionalBox.style.bottom = '300px';
        additionalBox.style.right = '300px';
        additionalBox.style.borderRadius = '10px';
        
        const textArea = document.createElement('textarea');
        textArea.placeholder = 'Anything else you want to mention!';
        textArea.style.width = '100%';
        textArea.style.height = '100%';
        additionalBox.appendChild(textArea);
    
        haveHousingViewElm.appendChild(additionalBox);

        this.#preferencesSection = new PreferencesSection(haveHousingViewElm);
        await this.#preferencesSection.render();

        const navigation = await new Navigation('create-3', 'discover', [], true).render();
        haveHousingViewElm.appendChild(navigation);

        this.#queryFns = new SettingsFns(haveHousingViewElm, this.#user); 
        this.#fillFields(haveHousingViewElm); 

        this.#validationSetup(haveHousingViewElm);

        return haveHousingViewElm;
    }

    // async handleSubmit(event) {
    //     event.preventDefault();
    // }
    async handleSubmit(event) {
        event.preventDefault();
        try {
            alert('Housing information saved successfully!');
            this.#events.publish('navigateTo', 'create-5');
        } catch (error) {
            console.error('Error saving housing information:', error);
            alert('Error saving housing information: ' + error.message);
        }
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
        const container = document.createElement('div');
        container.style.display = 'flex';
        container.style.justifyContent = 'center'; 
    
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('small-boxes-row');
        rowContainer.style.display = 'flex'; 
    
        for (let i = 0; i < 5; i++) {
            const box = document.createElement('div');
            box.classList.add('small-box');
            box.style.width = '100px';
            box.style.height = '100px'; 
            box.style.border = '2px solid #CCCCCC'; 
            box.style.backgroundColor = '#FFFFFF'; 
            box.style.marginRight = '20px'; 
            box.style.borderRadius = '10px';
            box.style.display = 'flex';
            box.style.alignItems = 'center';
            box.style.justifyContent = 'center';
            if (i === 0) {
                const fileInput = document.createElement('input');
                fileInput.type = 'file';
                fileInput.accept = 'image/*'; // Allow only image files
                fileInput.style.display = 'none'; // Hide the input visually
                fileInput.addEventListener('change', handleFileSelect);
                box.appendChild(fileInput);
                const addButton = document.createElement('button');
                addButton.textContent = 'Add Photo';
                addButton.addEventListener('click', () => fileInput.click());
                box.appendChild(addButton);
                // box.textContent = "Add Photo";
            }
            function handleFileSelect(event) {
                const file = event.target.files[0];
                if (file) {
                    // Handle the file upload here, you can send it to the server or preview it, etc.
                    console.log('Selected file:', file);
                }
            }

            rowContainer.appendChild(box);
        }
    
        container.appendChild(rowContainer);
        return container;
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
