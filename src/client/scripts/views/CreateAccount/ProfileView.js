import { ProgressBar } from '../../components/ProgressBar.js';
import { Button } from '../../components/Button.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { TextAreaInput } from '../../components/TextAreaInput.js';
import { TextInput } from '../../components/TextInput.js';
import { SliderInput } from '../../components/SliderInput.js';
import { Navigation } from '../../components/Navigation.js';
import { Events } from '../../Events.js';
import { updateUser } from '../../../data/DatabasePouchDB.js';
import { getAllUsers } from '../../../data/DatabasePouchDB.js';
import { getUserById } from '../../../data/DatabasePouchDB.js';
import { fields } from '../../helpers/SettingsData.js';

// view: create-2
export class ProfileView {
    #events = null;
    #database = null;

    constructor() {
        this.#events = Events.events();
        this.#database = { updateUser };
    }

    async render() {
        // ... (existing code)
    }

    async #renderIdentity() {
        const identityContainer = document.createElement('div');

        identityContainer.appendChild(await new TextInput('First name*').render());

        const subgroup1 = document.createElement('div');
        subgroup1.classList.add('subgroup');
        subgroup1.appendChild(await new TextInput('Nickname', 'text', 118).render());
        subgroup1.appendChild(await new TextInput('Age*', 'text', 118).render());
        identityContainer.appendChild(subgroup1);

        identityContainer.appendChild(await this.#renderGender());
        identityContainer.appendChild(await this.#renderPronouns());

        return identityContainer;
    }

    async #renderGender() {
        return await new DropdownInput('Gender identity*', fields.genderId, 149.2).render();
    }

    async #renderPronouns() {
        return await new TextInput('Pronouns', 'text', 118).render();
    }

    async #renderEducation() {
        const educationContainer = document.createElement('div');

        educationContainer.appendChild(await new TextInput('Major').render());
        educationContainer.appendChild(await new TextInput('School').render());
        educationContainer.appendChild(await new DropdownInput('Level of education', fields.level).render());

        return educationContainer;
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
        slidersContainer.appendChild(await new SliderInput('Noise when studying*', 'very quiet', 'noise is okay').render());
        slidersContainer.appendChild(await new SliderInput('Sleeping habits*', 'early bird', 'night owl').render());
        slidersContainer.appendChild(await new SliderInput('Hosting guests*', 'never', 'frequent').render());

        return slidersContainer;
    }
}
