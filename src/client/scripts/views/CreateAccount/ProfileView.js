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

// view: create-2
export class ProfileView {
    #events = null;
    #database = null;

    constructor() {
        this.#events = Events.events();
        this.#database = this.#database = { updateUser };
    }

    async render() {
        const profileViewElm = document.createElement('div');
        profileViewElm.id = 'profileView';

        // progress bar
        profileViewElm.appendChild(await new ProgressBar(2).render());

        // page header
        const header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = `
        <h1 class="battambang">Tell us about yourself</h1>
        <p>starred fields are required</p>
        `;
        profileViewElm.appendChild(header);

        const form = document.createElement('form');
        form.appendChild(await this.#renderIdentity());
        form.appendChild(await this.#renderEducation());
        form.appendChild(await this.#renderBio());
        form.appendChild(await this.#renderSocials());
        form.appendChild(await this.#renderSliders());

        profileViewElm.appendChild(form);

        const nextBtnHandler = async () => {
            
            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());

    try {

       const currentUser = await getUserByID(userData.id);
        const updatedUserData = { ...currentUser, ...userData };
        await updateUser(updatedUserData);
        alert('Profile updated successfully!');
        this.#events.publish('navigateTo', 'create-3');
        
    } catch (error) {
        if (error.message) {
            alert(`Error updating profile: ${error.message}`);
        } else {
            alert('An unknown error occurred while updating the profile.');
        }
    }
};
        

        // navigation between account creation pages
        profileViewElm.appendChild(
            await new Navigation('create-1', 'create-3', [nextBtnHandler]).render()
        );

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
