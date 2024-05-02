// Created by Kshama Kolur

import { Button } from '../../components/Button.js';
import { TextInput } from '../../components/TextInput.js';
// import { login } from '../../../data/LogIn.js'; // DB TODO: Uncomment when PouchDB works
import { users } from '../../../data/MockData.js'; // TODO: delete
=======
import { Events } from '../../Events.js';
//import { authenticateUser } from '../../../data/DatabasePouchDB.js';
import * as db from '../../../data/DatabasePouchDB.js';

/**
 * Provides a UI view for user sign-in. This class is responsible for rendering the
 * sign-in form and handling user interactions such as signing in and navigating
 * to the sign-up page.
 * view: 'sign-in'
 */
export class SignInView {
    #events = null;

    /**
     * Initializes the SignInView with an instance of the events handler.
     */
    constructor() {
        this.#events = Events.events();
    }

    /**
     * Asynchronously renders the sign-in view with form inputs and sign-in button.
     * It sets up an interactive sign-in form where users can enter their credentials.
     * @returns {Promise<HTMLElement>} The rendered sign-in container element.
     */
    async render() {
        const signInContainer = document.createElement('div');
        signInContainer.classList.add('sign-in-container');

        // Header for the sign-in form
        const header = document.createElement('h1');
        header.classList.add('battambang');
        header.textContent = 'Sign in';
        signInContainer.appendChild(header);

        // Option to navigate to sign-up if not already a member
        const signUpOption = document.createElement('div');
        signUpOption.innerHTML = 'Not a member? <a href="#signup">Sign up</a>';
        signInContainer.appendChild(signUpOption);

        // Container for email and password
        const input = document.createElement('div');
        input.classList.add('input');

        // Email input field
        const emailInput = new TextInput('Email');
        const emailInputElement = await emailInput.render();
        input.appendChild(emailInputElement);

        // Password input field with type 'password' to hide characters
        const passwordInput = new TextInput('Password', 'password');
        const passwordInputElement = await passwordInput.render();
        input.appendChild(passwordInputElement);

        signInContainer.appendChild(input);

        // Sign-in button
        const signInButton = new Button('Sign in', 200);
        const signInButtonElement = await signInButton.render();
        signInContainer.appendChild(signInButtonElement);

        // Event listener for navigating to sign-up via link
        signUpOption.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.#events.publish('navigateTo', 'create-1');
        });

        // Event listener for sign-in button to validate credentials and sign in
        signInButtonElement.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                const user = await authenticateUser (emailInputElement.value, passwordInputElement.value);

            // DB TODO: replace with login function below
            this.#events.publish('navigateTo', 'discover');

            } catch {
                 alert('Login failed. Double-check your credentials.');
            }
            // login(
            //     emailInputElement.value,
            //     passwordInputElement.value,
            //     signInFns,
            //     [() => alert('Login failed. Double-check your credentials.')]
            // );
        });

        return signInContainer;  // Return the complete sign-in container element
    }
}
