// created by Rachel Lahav

import { ProgressBar } from '../../components/ProgressBar.js';
import { Button } from '../../components/Button.js';
import { TextInput } from '../../components/TextInput.js';
import { Events } from '../../Events.js';
import { User } from '../../../data/data_structures/User.js';
import { Housing } from '../../../data/data_structures/Housing.js';
import { Preferences } from '../../../data/data_structures/Preferences.js';
import * as db from '../../../data/DatabasePouchDB.js';

/**
 * The CredentialsView class represents the first step of the account creation process.
 * It displays a form for the user to enter their email and password.
 */

// view: create-1
export class CredentialsView {
    #database = null;
    #events = null;

    constructor() {
        this.#database = db.default;
        this.#events = Events.events();
    }
     /**
     * Renders the CredentialsView and sets up event listeners.
     *
     * @returns {Promise<HTMLDivElement>} A promise that resolves with the rendered CredentialsView element.
     */

    async render() {
        const credViewElm = document.createElement('div');
        credViewElm.classList.add('create-account-container');

        // progress bar
        credViewElm.appendChild(await new ProgressBar(1).render());

        const header = document.createElement('h1');
        header.classList.add('battambang');
        header.textContent = 'Create an account';
        credViewElm.appendChild(header);

        // container for email and password
        const input = document.createElement('div');
        input.classList.add('input');

        // email field
        const emailInput = new TextInput('Email');
        const emailInputElement = await emailInput.render();
        input.appendChild(emailInputElement);

        // password field
        const passwordInput = new TextInput('Password', 'password');
        const passwordInputElement = await passwordInput.render();
        input.appendChild(passwordInputElement);

        credViewElm.appendChild(input);

        // sign up button
        const signUpButton = new Button('Next');
        const signUpButtonElement = await signUpButton.render();
        credViewElm.appendChild(signUpButtonElement);

        // listener for click event
        signUpButtonElement.addEventListener('click', async (e) => {
            e.preventDefault();
            const emailInputElement = document.getElementById('emailInput'); 
            const passwordInputElement = document.getElementById('passwordInput'); 

            const email = emailInputElement.value.trim();
            const password = passwordInputElement.value.trim();

            // alert user if email or password was not filled out
            if (!email.trim() || !password.trim())  {
                alert('Please enter a valid email and password.');
                return;
            }
                    
            try {
                // add to DB
                const newUser = this.#createUser(email);
                const userId = (await db.addUser(newUser))._id; 
                // publish user id to the other Create Account views
                this.#events.publish('newUser', userId);
                // navigate to next page
                this.#events.publish('navigateTo', 'create-2');
            } catch (error) {
                console.error('Error saving user:', error.message);
                alert('An error occurred while creating your account. Please try again later.');
            }
        });

        return credViewElm;
    }

    /**
     * Creates a new User instance to be added to the DB.
     * @param {string} [email] 
     * @returns {User}
     */
    #createUser(email = null) {
        const housing = new Housing(
            null, // city
            {}, // rent
            null, // beds
            null, // baths
            null, // gender
            {}, // utilities
            null, // leaseLength
            null, // leaseType
            null, // roomType
            null, // buildingType
            null, // timeframe
            {}, // amenities
            [], // pics
            null // notes
        );

        const prefs = new Preferences(
            [], // cities
            {}, // rent
            {}, // occupants
            {}, // gender
            {}, // leaseLength
            {}, // leaseType
            {}, // roomType
            {}, // buildingType
            {}, // timeframe
            {} // amenities
        );
        
        return new User(
            null,     // id
            email,    // email
            null,     // avatar
            {},       // name
            null,     // age
            {},       // gender
            {},       // character
            {},       // education
            {},       // socials
            null,     // description
            false,    // hasHousing
            prefs,    // preferences
            housing,  // housing
            [],       // liked
            [],       // rejected
            []        // matches
        );
    }
}