// Created by Kshama Kolur

import { Button } from '../components/Button.js';
import { TextInput } from '../components/TextInput.js';
import { Events } from '../Events.js';

export class SignInView {
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const signInContainer = document.createElement('div');
        signInContainer.classList.add('sign-in-container');

        const header = document.createElement('h1');
        header.textContent = 'Sign in';
        signInContainer.appendChild(header);

        const signUpOption = document.createElement('div');
        signUpOption.innerHTML = 'Not a member? <a href="#signup">Sign up</a>';
        signInContainer.appendChild(signUpOption);

        const emailInput = new TextInput('Email');
        const emailInputElement = await emailInput.render();
        signInContainer.appendChild(emailInputElement);

        const passwordInput = new TextInput('Password');
        const passwordInputElement = await passwordInput.render();
        signInContainer.appendChild(passwordInputElement);

        const signInButton = new Button('Sign in', 200);
        const signInButtonElement = await signInButton.render();
        signInContainer.appendChild(signInButtonElement);

        signUpOption.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            this.#events.publish('navigateTo', 'create-credentials');
        });

        signInButtonElement.addEventListener('click', (e) => {
            e.preventDefault();
            // TODO: only if account exists
            this.#events.publish('navigateTo', 'discover');
        });

        return signInContainer;
    }
}