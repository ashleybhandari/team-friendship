import { ProgressBar } from '../../components/ProgressBar.js';
import { Button } from '../../components/Button.js';
import { TextInput } from '../../components/TextInput.js';
import { Events } from '../../Events.js';
import * as db from '../../../data/DatabasePouchDB.js';

//Rachel
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

        // progress bar
        credViewElm.appendChild(await new ProgressBar(1).render());

        const header = document.createElement('h1');
        header.classList.add('battambang');
        header.textContent = 'Create an account';
        credViewElm.appendChild(header);

        // container for email and password
        const input = document.createElement('div');
        input.classList.add('input');

        const emailInput = new TextInput('Email');
        const emailInputElement = await emailInput.render();
        input.appendChild(emailInputElement);

        const passwordInput = new TextInput('Password', 'password');
        const passwordInputElement = await passwordInput.render();
        input.appendChild(passwordInputElement);

        credViewElm.appendChild(input);

        const signUpButton = new Button('Next');
        const signUpButtonElement = await signUpButton.render();
        credViewElm.appendChild(signUpButtonElement);

        signUpButtonElement.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = emailInputElement.value;
            const password = passwordInputElement.value;

            if (if (!email.trim() || !password.trim())  {
                alert('Please enter a valid email and password.');
                return;
            }

            try {
                await addUser({
                    id: email, 
                    email,
                    password
                });

                this.#events.publish('navigateTo', 'create-2');
            } catch (error) {
                console.error('Error saving user:', error);
                alert('An error occurred while creating your account. Please try again later.');
            }
        });
        return credViewElm;
    }
}
