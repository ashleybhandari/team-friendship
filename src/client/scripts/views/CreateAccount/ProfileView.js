// created by Rachel Lahav
import { ProgressBar } from '../../components/ProgressBar.js';
import { UserProfile } from '../../components/UserProfile.js';
import { Events } from '../../Events.js';


import { Navigation } from '../../components/Navigation.js';
import { updateUser } from '../../../data/DatabasePouchDB.js';
import { getUserById } from '../../../data/DatabasePouchDB.js';
import { fields } from '../../helpers/SettingsData.js';

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
     * @returns {Promise<HTMLDivElement>} - A promise that resolves with the rendered ProfileView element.
     */
    async render() {
        const profileViewElm = document.createElement('div');
        profileViewElm.id = 'profileView';

        // progress bar
        profileViewElm.appendChild(await new ProgressBar(2).render());

        // header
        const header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = `
        <h1 class="battambang">Tell us about yourself</h1>
        <p>starred fields are required</p>
        `;
        profileViewElm.appendChild(header);

        // profile content
        const form = document.createElement('form');
        form.appendChild(await new UserProfile('profile').render());
        profileViewElm.appendChild(form);

        // navigation
        profileViewElm.appendChild(await new Navigation(
            'create-1', 'create-3', [this.nextBtnHandler(form)]
        ).render());
        
        return profileViewElm;
    }

    nextBtnHandler(form) {
        return async () => {
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
        }
    };
}
