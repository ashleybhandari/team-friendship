// created by Rachel Lahav

import { ProgressBar } from '../../components/ProgressBar.js';
import { UserProfile } from '../../components/UserProfile.js';
import { Navigation } from '../../components/Navigation.js';
import { Events } from '../../Events.js';
import * as configHelper from '../../helpers/userConfigHelper.js';
import * as db from '../../../data/DatabasePouchDB.js';

/**
 * ProfileView class
 * view: 'create-2'
 */
export class ProfileView {
    #profileViewElm = null;
    #userId = null;
    #events = null;

    /**
     * Creates an instance of ProfileView.
     */
    constructor() {
        this.#events = Events.events();

        // Published by CredentialsView so all Create Account pages update the
        // same user.
        this.#events.subscribe('newUser', (id) => this.#userId = id);
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
        const pageContent = await new UserProfile('profile').render();
        pageContent.classList.add('content');
        this.#profileViewElm.appendChild(pageContent);

        // navigation
        this.#profileViewElm.appendChild(await new Navigation(
            'create-1', 'create-3', [this.#checkValidity(), this.#saveFields()]
        ).render());
        
        return this.#profileViewElm;
    }

    /**
     * Returns a closure that checks whether all required fields have been
     * filled out (alerting the user if necessary).
     * @returns {function}
     */
    #checkValidity() {
        return () => {
            // check if all fields are valid
            const invalid = new UserProfile()
                .getRequiredIds('profile')
                .some((id) => {
                    const elm = this.#profileViewElm.querySelector('#' + id);
                    return elm ? !elm.checkValidity() : false;
                });

            // alert user and throw error if at least 1 field is invalid
            if (invalid) {
                alert('Make sure all required fields are filled out (the starred ones)!');
                throw new Error('Required field(s) empty');
            }
        }
    }

    /**
     * Returns a closure that saves the user-inputted data to the DB.
     * @returns {function}
     */
    #saveFields() {
        return async () => {
            try {
                // get user from the DB
                const user = await db.getUserById(this.#userId);
                // save inputted data and update in DB
                configHelper.saveProfileFields(this.#profileViewElm, user, 'profile');
                await db.updateUser(user);
            } catch (error) {
                console.log(error.message
                    ? `Error updating profile: ${error.message}`
                    : 'An unknown error occurred while updating the profile.'
                );
            }
        }
    }
}

