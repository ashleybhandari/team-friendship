// created by Isha Bang

import { ProgressBar } from '../../components/ProgressBar.js';
import { UserPreferences } from '../../components/UserPreferences.js';
import { UserHousing } from '../../components/UserHousing.js';
import { Navigation } from '../../components/Navigation.js';
import { Events } from '../../Events.js';
import * as configHelper from '../../helpers/userConfigHelper.js';
import * as db from '../../../data/DatabasePouchDB.js';

// view: 'create-4'
export class UserDetailsView {
    #detailsViewElm = null;
    #userId = null;
    #hasHousing = null;
    #events = null;

    constructor() {
        this.#events = Events.events();

        // Published by CredentialsView so all Create Account pages update the
        // same user.
        this.#events.subscribe('newUser', (id) => this.#userId = id);

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
            this.#hasHousing = hasHousing;
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
        const pageContent = hasHousing
            ? await new UserHousing('create').render()
            : await new UserPreferences('create').render();
        pageContent.classList.add('content');
        this.#detailsViewElm.appendChild(pageContent);

        // navigation
        this.#detailsViewElm.appendChild(await new Navigation(
            'create-3',
            'discover',
            [this.#checkValidity(), this.#saveFields(), this.#publishUser()],
            true
        ).render());
        
        return this.#detailsViewElm;
    }

    /**
     * Returns a closure that checks whether all required fields have been
     * filled out (alerting the user if necessary).
     * @returns {function}
     */
    #checkValidity() {
        return () => {
            // UserPreferences doesn't have required fields
            if (!this.#hasHousing) return false;

            // check if all fields are valid
            const invalid = new UserHousing()
                .getRequiredIds('create')
                .some((id) => {
                    const elm = this.#detailsViewElm.querySelector('#' + id);
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

                // save inputted data
                const args = [this.#detailsViewElm, user, 'create'];
                this.#hasHousing
                    ? configHelper.saveHousingFields(...args)
                    : configHelper.savePreferencesFields(...args);

                // update in DB
                await db.updateUser(user);
            } catch (error) {
                console.log(error.message
                    ? `Error updating user details: ${error.message}`
                    : 'An unknown error occurred while updating the user details.'
                );
            }
        }
    }

    /**
     * Returns a closure that publishes the user's id to SignedInViews.
     * @returns {function}
     */
    #publishUser() {
        return () => {}//this.#events.publish('authenticated', this.#userId);
    }
}