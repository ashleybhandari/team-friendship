import { Button } from '../../components/Button.js';
import { ProgressBar } from '../../components/ProgressBar.js';
import { Events } from '../../Events.js';
import { DatabasePouchDB } from '../../data/DatabasePouchDB.js';

// view: create-1
export class CredentialsView {
    #events = null;
    #database = null;

    constructor() {
        this.#events = Events.events();
        this.#database = new DatabasePouchDB('users');
    }

    async render() {
        const credViewElm = document.createElement('div');
        credViewElm.id = 'credentialsView';

        credViewElm.appendChild(await new ProgressBar(1).render());

        const content = document.createElement('div');
        content.innerHTML = `
            <h2>Create Your Account</h2>
            <label for="email">Email:</label>
            <input type="email" id="email" required>
            <label for="password">Password:</label>
            <input type="password" id="password" required>
            <div id="signup-btn-container"></div>
        `;
        credViewElm.appendChild(content);

        this.#renderSignUpButton(content);
        this.#renderNavigation(credViewElm);

        return credViewElm;
    }

    async #renderSignUpButton(container) {
        const signUpBtn = await new Button('Sign Up').render();

        signUpBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

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

        const signUpBtnContainer = container.querySelector('#signup-btn-container');
        signUpBtnContainer.appendChild(signUpBtn);
    }

    async #renderNavigation(container) {
        const nextBtn = await new Button('Next').render();

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.#events.publish('navigateTo', 'create-2');
        });

        container.append(nextBtn);
    }
}
