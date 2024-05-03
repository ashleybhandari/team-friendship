// created by Rachel Lahav
import { ProgressBar } from '../../components/ProgressBar.js';
import { Button } from '../../components/Button.js';
import { TextInput } from '../../components/TextInput.js';
import { Events } from '../../Events.js';
import * as db from '../../../data/DatabasePouchDB.js';

import {addUser} from '../../../data/DatabasePouchDB.js';

//import { User } from '../data../User.js';
import { User } from '../../../data/data_structures/User.js';
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
    const emailInputElement = document.getElementById('emailInput'); 
    const passwordInputElement = document.getElementById('passwordInput'); 

    const email = emailInputElement.value.trim();
    const password = passwordInputElement.value.trim();

    // This part works
    if (!email.trim() || !password.trim())  {
        alert('Please enter a valid email and password.');
        return;
    }

    console.log(email);
    console.log("hi");
    console.log(password);
            
    const newUser = new User(
    null, // id
    null, // email
    null, // avatar
    null, // name
    null, // age
    null, // gender
    null, // character
    null, // education
    null, // socials
    null, // description
    false, // hasHousing
    null, // preferences
    null, // housing
    [], // liked
    [], // rejected
    [] // matches
);

    try {
        await addUser(newUser);
        this.#events.publish('navigateTo', 'create-2');
    } catch (error) {
        console.error('Error saving user:', error.message);
        //alert('An error occurred while creating your account. Please try again later.');
    }
});
return credViewElm;
    }
}
