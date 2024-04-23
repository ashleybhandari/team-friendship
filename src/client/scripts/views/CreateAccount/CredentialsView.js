import { Button } from '../../components/Button.js';
import { TextInput } from '../../components/TextInput.js';
import { Events } from '../../Events.js';
import * as db from '../../../data/DatabasePouchDB.js';

// view: create-1
export class CredentialsView {
    #events = null;
    #database = null;

    constructor() {
        this.#events = Events.events();
        this.#database = db.default;
    }

    async render() {
        const credViewElm = document.createElement('div');
        credViewElm.classList.add('create-account-container');

        const header = document.createElement('h1');
        header.textContent = 'Create Your Account';
        credViewElm.appendChild(header);

        const emailInput = new TextInput('Email');
        const emailInputElement = await emailInput.render();
        credViewElm.appendChild(emailInputElement);

        const passwordInput = new TextInput('Password', 'password');
        const passwordInputElement = await passwordInput.render();
        credViewElm.appendChild(passwordInputElement);

        const signUpButton = new Button('Sign Up', 200);
        const signUpButtonElement = await signUpButton.render();
        credViewElm.appendChild(signUpButtonElement);

        signUpButtonElement.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = emailInputElement.value;
            const password = passwordInputElement.value;

            if (email && password) {
                try {
                    await this.#database.createUser(email, password);
                    alert('Account created successfully!');
                    this.#events.publish('navigateTo', 'create-2');
                } catch (error) {
                    alert('Error creating account: ' + error.message);
                }
            } else {
                alert('Please enter both email and password.');
            }
        });

        this.#renderNavigation(credViewElm);

        return credViewElm;
    }

}
