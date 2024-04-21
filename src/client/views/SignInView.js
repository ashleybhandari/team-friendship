// Created by Kshama Kolur

import { Button } from '../components/Button.js';
import { TextInput } from '../components/TextInput.js';
import { Events } from '../Events.js';

/**
 * Provides a UI view for user sign-in. This class is responsible for rendering the
 * sign-in form and handling user interactions such as signing in and navigating
 * to the sign-up page.
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
     * @returns {HTMLElement} The rendered sign-in container element.
     */
    async render() {
        const signInContainer = document.createElement('div');
        signInContainer.classList.add('sign-in-container');

        // Header for the sign-in form
        const header = document.createElement('h1');
        header.textContent = 'Sign in';
        signInContainer.appendChild(header);

        // Option to navigate to sign-up if not already a member
        const signUpOption = document.createElement('div');
        signUpOption.innerHTML = 'Not a member? <a href="#signup">Sign up</a>';
        signInContainer.appendChild(signUpOption);

        // Email input field
        const emailInput = new TextInput('Email');
        const emailInputElement = await emailInput.render();
        signInContainer.appendChild(emailInputElement);

        // Password input field with type 'password' to hide characters
        const passwordInput = new TextInput('Password', 'password');
        const passwordInputElement = await passwordInput.render();
        signInContainer.appendChild(passwordInputElement);

        // Sign-in button
        const signInButton = new Button('Sign in', 200);
        const signInButtonElement = await signInButton.render();
        signInContainer.appendChild(signInButtonElement);

        // Event listener for navigating to sign-up via link
        signUpOption.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.#events.publish('navigateTo', 'create-credentials');
        });

        // Event listener for sign-in button to validate credentials and sign in
        signInButtonElement.addEventListener('click', (e) => {
            e.preventDefault();
            // TODO: implement validation of account existence and credentials
            this.#events.publish('navigateTo', 'discover');
        });

        return signInContainer;  // Return the complete sign-in container element
    }
}