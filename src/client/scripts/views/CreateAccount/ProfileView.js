import { ProgressBar } from '../../components/ProgressBar.js';
import { Button } from '../../components/Button.js';
import { DropdownInput } from '../../components/DropdownInput.js';
import { TextAreaInput } from '../../components/TextAreaInput.js';
import { TextInput } from '../../components/TextInput.js';
import { SliderInput } from '../../components/SliderInput.js';
import { CheckboxGroup } from '../../components/CheckboxGroup.js';
import { Navigation } from '../../components/Navigation.js';
import { Events } from '../../Events.js';
import { updateUser } from '../../../data/DatabasePouchDB.js';
import { getAllUsers } from '../../../data/DatabasePouchDB.js';
import { getUserById } from '../../../data/DatabasePouchDB.js';
import { toMap, fields } from '../../helpers/SettingsData.js';

/**
 * ProfileView class
 */
export class ProfileView {
    #events = null;
    #database = null;

    /**
     * Creates an instance of ProfileView.
     */
    constructor() {
        this.#events = Events.events();
        this.#database = { updateUser };
    }

    /**
     * Renders the ProfileView.
     *
     * @returns {Promise<HTMLElement>} A promise that resolves with the rendered ProfileView element.
     */
    async render() {
        const profileViewElm = document.createElement('div');
        profileViewElm.id = 'profileViewElm';

        // progress bar
        profileViewElm.appendChild(await new ProgressBar(2).render());

        const viewContent = document.createElement('div');
        viewContent.id = 'profileView';

        // page header
        const header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = `
        <h1 class="battambang">Tell us about yourself</h1>
        <p>starred fields are required</p>
        `;
        viewContent.appendChild(header);

        const form = document.createElement('form');
        form.appendChild(await this.#renderIdentity());
        form.appendChild(await this.#renderEducation());
        form.appendChild(await this.#renderBio());
        form.appendChild(await this.#renderSocials());
        form.appendChild(await this.#renderSliders());

        viewContent.appendChild(form);

        const nextBtnHandler = async () => {
            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());
            let success = true;

            try {
                const currentUser = await getUserById(userData.id);
                const updatedUserData = { ...currentUser, ...userData };
                await updateUser(updatedUserData);
                console.log('Profile updated successfully!');
                this.#events.publish('navigateTo', 'create-3');
            } catch (error) {
                if (error.message) {
                    console.log(`Error updating profile: ${error.message}`);
                } else {
                    console.log('An unknown error occurred while updating the profile.');
                }
            }
        };

        profileViewElm.appendChild(viewContent);

        // navigation between account creation pages
        profileViewElm.appendChild(
            await new Navigation('create-1', 'create-3', [nextBtnHandler]).render()
        );


        return profileViewElm;
    }

    /**
     * Renders the identity section of the profile.
     *
     * @returns {Promise<HTMLElement>} A promise that resolves with the rendered identity section element.
     */
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

    /**
     * Renders the gender dropdown input.
     *
     * @returns {Promise<HTMLElement>} A promise that resolves with the rendered gender dropdown input element.
     */
    async #renderGender() {
        return await new DropdownInput('Gender identity*', fields.genderId, 149.2).render();
    }

    /**
     * Renders the pronouns text input.
     *
     * @returns {Promise<HTMLElement>} A promise that resolves with the rendered pronouns text input element.
     */
    async #renderPronouns() {
        return await new TextInput('Pronouns', 'text', 118).render();
    }

    /**
     * Renders the education section of the profile.
     *
     * @returns {Promise<HTMLElement>} A promise that resolves with the rendered education section element.
     */
    async #renderEducation() {
        const educationContainer = document.createElement('div');

        educationContainer.appendChild(await new TextInput('Major').render());
        educationContainer.appendChild(await new TextInput('School').render());
        educationContainer.appendChild(await new DropdownInput('Level of education', fields.level).render());

        return educationContainer;
    }

    /**
     * Renders the bio text area input.
     *
     * @returns {Promise<HTMLElement>} A promise that resolves with the rendered bio text area input element.
     */
    async #renderBio() {
        const bioContainer = document.createElement('div');

        bioContainer.appendChild(await new TextAreaInput('Tell us about yourself', 'Lifestyle, hobbies, routines, allergies...').render());

        return bioContainer;
    }

    /**
     * Renders the socials section of the profile.
     *
     * @returns {Promise<HTMLElement>} A promise that resolves with the rendered socials section element.
     */
    async #renderSocials() {
        const socialsContainer = document.createElement('div');

        socialsContainer.appendChild(await new TextInput('Facebook').render());
        socialsContainer.appendChild(await new TextInput('Instagram').render());

        return socialsContainer;
    }

    /**
     * Renders the sliders section of the profile.
     *
     * @returns {Promise<HTMLElement>} A promise that resolves with the rendered sliders section element.
     */
    async #renderSliders() {
        const slidersContainer = document.createElement('div');

        slidersContainer.appendChild(await new SliderInput('Cleanliness*', 'not clean', 'very clean').render());
        slidersContainer.appendChild(await new SliderInput('Noise when studying*', 'very quiet', 'noise is okay').render());
        slidersContainer.appendChild(await new SliderInput('Sleeping habits*', 'early bird', 'night owl').render());
        slidersContainer.appendChild(await new SliderInput('Hosting guests*', 'never', 'frequent').render());

        return slidersContainer;
    }
}
