// Created by Kshama Kolur

import { Button } from '../components/Button.js';
import { TextInput } from '../components/TextInput.js';

export class SignInView {
    async render() {
        const signInContainer = document.createElement('div');
        signInContainer.classList.add('sign-in-container');

        const header = document.createElement('h1');
        header.textContent = 'Sign in';
        signInContainer.appendChild(header);

        const signUpOption = document.createElement('div');
        signUpOption.innerHTML = 'Not a member? <a href="#signup">Sign up</a>';
        signInContainer.appendChild(signUpOption);

        const emailInput = new TextInput('Email', '', 'email');
        const emailInputElement = await emailInput.render();
        signInContainer.appendChild(emailInputElement);

        const passwordInput = new TextInput('Password', '', 'password');
        const passwordInputElement = await passwordInput.render();
        signInContainer.appendChild(passwordInputElement);

        const forgotPasswordLink = document.createElement('a');
        forgotPasswordLink.textContent = 'Forgot Password?';
        forgotPasswordLink.href = '#';
        signInContainer.appendChild(forgotPasswordLink);

        const signInButton = new Button('Sign in', 200);
        const signInButtonElement = await signInButton.render();
        signInContainer.appendChild(signInButtonElement);

        signUpOption.querySelector('a').addEventListener('click', (e) => {
            e.preventDefault();
            Events.events().publish('navigateTo', 'create-account');
        });

        return signInContainer;
    }
}