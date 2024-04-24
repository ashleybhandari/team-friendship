import { Button } from '../../components/Button.js';
import { TextInput } from '../../components/TextInput.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { TextAreaInput } from '../../components/TextAreaInput.js';
import { SliderInput } from '../../components/SliderInput.js';
import { Events } from '../../Events.js';
import * as db from '../../../data/DatabasePouchDB.js';

// view: create-2
export class ProfileView {
    #events = null;
    #database = null;

    constructor() {
        this.#events = Events.events();
        this.#database = db.default;
    }

    async render() {
        const profileViewElm = document.createElement('div');
        profileViewElm.id = 'profileView';

        const header = document.createElement('h1');
        header.textContent = 'Create Your Profile';
        profileViewElm.appendChild(header);

        const form = document.createElement('form');
        form.appendChild(await this.#renderIdentity());
        form.appendChild(await this.#renderEducation());
        form.appendChild(await this.#renderBio());
        form.appendChild(await this.#renderSocials());
        form.appendChild(await this.#renderSliders());

        profileViewElm.appendChild(form);

        const saveButton = new Button('Save', 200);
        const saveButtonElement = await saveButton.render();
        profileViewElm.appendChild(saveButtonElement);

        saveButtonElement.addEventListener('click', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());

            try {
                await this.#database.updateUserProfile(userData);
                alert('Profile updated successfully!');
                this.#events.publish('navigateTo', 'create-3');
            } catch (error) {
                alert('Error updating profile: ' + error.message);
            }
        });

        return profileViewElm;
    }

    async #renderIdentity() {
        const identityContainer = document.createElement('div');

        identityContainer.appendChild(await new TextInput('First Name*').render());

        const subgroup1 = document.createElement('div');
        subgroup1.classList.add('subgroup');
        subgroup1.appendChild(await new TextInput('Nickname', 'text', 118).render());
        subgroup1.appendChild(await new TextInput('Age*', 'text', 118).render());
        identityContainer.appendChild(subgroup1);

        const subgroup2 = document.createElement('div');
        subgroup2.classList.add('subgroup');
        subgroup2.appendChild(await new DropdownInput('Gender Identity*', ['Woman', 'Man', 'Nonbinary'], 149.2).render());
        subgroup2.appendChild(await new TextInput('Pronouns', 'text', 118).render());
        identityContainer.appendChild(subgroup2);

        return identityContainer;
    }

    async #renderEducation() {
        const educationContainer = document.createElement('div');

        educationContainer.appendChild(await new TextInput('Major').render());
        educationContainer.appendChild(await new TextInput('School').render());
        educationContainer.appendChild(await new DropdownInput('Level of Education', ['Undergrad', 'Grad', 'Other']).render());

        return educationContainer;
    }

    async #renderBio() {
        const bioContainer = document.createElement('div');

        bioContainer.appendChild(await new TextAreaInput('Tell us about yourself', 'Lifestyle, hobbies, routines, allergies...').render());

        return bioContainer;
    }

    async #renderSocials() {
        const socialsContainer = document.createElement('div');

        socialsContainer.appendChild(await new TextInput('Facebook').render());
        socialsContainer.appendChild(await new TextInput('Instagram').render());

        return socialsContainer;
    }

    async #renderSliders() {
        const slidersContainer = document.createElement('div');

        slidersContainer.appendChild(await new SliderInput('Cleanliness*', 'not clean', 'very clean').render());
        slidersContainer.appendChild(await new SliderInput('Noise When Studying*', 'very quiet', 'noise is okay').render());
        slidersContainer.appendChild(await new SliderInput('Sleeping Habits*', 'early bird', 'night owl').render());
        slidersContainer.appendChild(await new SliderInput('Hosting Guests*', 'never', 'frequent').render());

        return slidersContainer;
    }
}
