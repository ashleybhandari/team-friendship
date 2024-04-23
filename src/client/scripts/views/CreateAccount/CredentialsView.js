import { Button } from '../../components/Button.js';
import { ProgressBar } from '../../components/ProgressBar.js';
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
        credViewElm.id = 'credentialsView';

        credViewElm.appendChild(await new ProgressBar(1).render());

        const content = document.createElement('div');
        content.innerHTML = `
            <h2>Sign In</h2>
            <label for="email">Email:</label>
            <input type="email" id="email" required>
            <label for="password">Password:</label>
            <input type="password" id="password" required>
            <div id="signin-btn-container"></div>
            <div id="signup-link-container">Don't have an account? <a href="#" id="signup-link">Sign Up</a></div>
        `;
        credViewElm.appendChild(content);

        this.#renderSignInButton(content);
        this.#renderSignUpLink(content);
        this.#renderNavigation(credViewElm);

        return credViewElm;
    }

    async #renderSignInButton(container) {
        const signInBtn = await new Button('Sign In').render();

        signInBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email && password) {
                try {
                    const user = await this.#database.authenticateUser(email, password);
                    alert(`Welcome, ${user.email}!`);
                    this.#events.publish('navigateTo', 'create-2');
                } catch (error) {
                    alert('Error signing in: ' + error.message);
                }
            } else {
                alert('Please enter both email and password.');
            }
        });

        const signInBtnContainer = container.querySelector('#signin-btn-container');
        signInBtnContainer.appendChild(signInBtn);
    }

    #renderSignUpLink(container) {
        const signUpLink = container.querySelector('#signup-link');
        signUpLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.#events.publish('navigateTo', 'create-1');
        });
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
