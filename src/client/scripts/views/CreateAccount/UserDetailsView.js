// created by Isha Bang

import { ProgressBar } from '../../components/ProgressBar.js';
import { UserPreferences } from '../../components/UserPreferences.js';
import { UserHousing } from '../../components/UserHousing.js';
import { Navigation } from '../../components/Navigation.js';
import { Events } from '../../Events.js';
import { getUserById, updateUser } from '../../../data/DatabasePouchDB.js';
import { users } from '../../../data/MockData.js';

// view: 'create-4'
export class UserDetailsView {
    #detailsViewElm = null;
    #userHousing = null;
    #events = null;
    #database = null;

    constructor() {
        this.#events = Events.events();
        this.#database = { updateUser };

        // Published by HousingSituationView. Renders the page depending on
        // whether the user selected they are looking for housing.
        this.#events.subscribe(
            'hasHousing', (hasHousing) => this.render(hasHousing)
        );
    }

    /**
     * Renders fields for the user to input information about their housing (if
     * they need roommates) or their housing preferences (if they need housing).
     * @param {boolean} [hasHousing] - Whether the user has housing
     * @returns {Promise<HTMLDivElement>}
     */
    async render(hasHousing = null) {
        if (hasHousing === null) {
            this.#detailsViewElm = document.createElement('div');
            this.#detailsViewElm.id = 'detailsView';
        }
        else {
            // element if emptied if render is called again
            this.#detailsViewElm.innerHTML = '';
        }

        // progress bar
        this.#detailsViewElm.appendChild(await new ProgressBar(4).render());

        // header
        const header = document.createElement('div');
        header.classList.add('header');

        // header depends on submitted input to HousingSituationView
        const headerContent = hasHousing
            ? 'Tell us about your housing'
            : 'Tell us your preferences';
        const subtitleContent = hasHousing
            ? 'starred fields are required'
            : `we'll use this to set up your feed`;

        header.innerHTML = `
        <h1 class="battambang">${headerContent}</h1>
        <p>${subtitleContent}</p>
        `;
        this.#detailsViewElm.appendChild(header);

        // page content
        const form = document.createElement('form');
        if (hasHousing) {
            this.#userHousing = new UserHousing('housing');
            form.appendChild(await this.#userHousing.render());
        }
        else {
            form.appendChild(await new UserPreferences('prefs').render())
        }
        this.#detailsViewElm.appendChild(form);

        // navigation
        this.#detailsViewElm.appendChild(await new Navigation(
            'create-3', 'discover', this.#nextBtnHandlers(form), true
        ).render());
        
        return this.#detailsViewElm;
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
                console.log('User details updated successfully!');
            } catch (error) {
                if (error.message) {
                    console.log(`Error updating user details: ${error.message}`);
                } else {
                    console.log('An unknown error occurred while updating user details.');
                }
            }

        }

        // publish user info to SignedIn views
        const newUser = () => this.#events.publish('newUser', users[0]); // DB TODO: change to PouchDB

        return [submitForm, newUser];
    };

    /**
     * Alerts the user if they left a required field empty.
     * @returns {boolean} - If any required field is empty
     */
    #isInvalid() {
        // UserPreferences doesn't have required fields
        if (!this.#userHousing) return false;

        // check all fields for validity
        const invalid = this.#userHousing
            .getRequiredIds('housing')
            .some((id) => {
                const elm = this.#detailsViewElm.querySelector('#' + id);
                return elm ? !elm.checkValidity() : false;
            });

        // alert user if invalid field found
        if (invalid) {
            alert('Make sure all required fields are filled out (the starred ones)!');
        }

        return invalid;
    }
}