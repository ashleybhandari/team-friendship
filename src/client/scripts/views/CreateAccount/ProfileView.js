// created by Rachel Lahav
import { ProgressBar } from '../../components/ProgressBar.js';
import { UserProfile } from '../../components/UserProfile.js';
import { Navigation } from '../../components/Navigation.js';
import { Events } from '../../Events.js';
import { getUserById, updateUser } from '../../../data/DatabasePouchDB.js';

/**
 * ProfileView class
 * view: 'create-2'
 */
export class ProfileView {
    #profileViewElm = null;
    #userProfile = null;
    #database = null;
    #events = null;
    #userId = null;

    /**
     * Creates an instance of ProfileView.
     */
    constructor() {
        this.#database = { updateUser };
        this.#events = Events.events();
        this.#events.subscribe('createUser', (id) => this.#userId = id);
    }

    /**
     * Renders the ProfileView.
     *
     * @returns {Promise<HTMLDivElement>} - A promise that resolves with the rendered ProfileView element.
     */
    async render() {
        this.#profileViewElm = document.createElement('div');
        this.#profileViewElm.id = 'profileView';

        // progress bar
        this.#profileViewElm.appendChild(await new ProgressBar(2).render());

        // header
        const header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = `
        <h1 class="battambang">Tell us about yourself</h1>
        <p>starred fields are required</p>
        `;
        this.#profileViewElm.appendChild(header);

        // page content
        const form = document.createElement('form');
        this.#userProfile = new UserProfile('profile');
        form.appendChild(await this.#userProfile.render());
        this.#profileViewElm.appendChild(form);

        // navigation
        this.#profileViewElm.appendChild(await new Navigation(
            'create-1', 'create-3', this.#nextBtnHandlers(form)
        ).render());
        
        return this.#profileViewElm;
    }

    /**
     * Creates an array of functions to call when "next" is clicked
     * @param {HTMLFormElement} form 
     * @returns {function[]}
     */
    #nextBtnHandlers(form) {
        // submit form data
        const submitForm = async () => {
            if (this.#isInvalid()) {
                throw new Error('Required field(s) empty');
            }

            const formData = new FormData(form);
            const userData = Object.fromEntries(formData.entries());

            try {
                const currentUser = await getUserById(userData.id);
                const updatedUserData = { ...currentUser, ...userData };
                await updateUser(updatedUserData);
                console.log('Profile updated successfully!');
            } catch (error) {
                if (error.message) {
                    console.log(`Error updating profile: ${error.message}`);
                } else {
                    console.log('An unknown error occurred while updating the profile.');
                }
            }
        };

        return [submitForm];
    }

    #isInvalid() {
        const invalid = this.#userProfile
            .getRequiredIds('profile')
            .some((id) => {
                const elm = this.#profileViewElm.querySelector('#' + id);
                return elm ? !elm.checkValidity() : false;
            });

        if (invalid) {
            alert('Make sure all required fields are filled out (the starred ones)!');
        }

        return invalid;
    }
}

