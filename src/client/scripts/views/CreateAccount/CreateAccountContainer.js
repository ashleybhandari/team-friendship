// created by Ashley Bhandari

import { Header } from '../../components/Header.js';
import { SignInView } from '../CreateAccount/SignInView.js';
import { CredentialsView } from '../CreateAccount/CredentialsView.js';
import { ProfileView } from '../CreateAccount/ProfileView.js';
import { HousingSituationView } from '../CreateAccount/HousingSituationView.js';
import { NeedHousingView } from '../CreateAccount/NeedHousingView.js';
import { HaveHousingView } from '../CreateAccount/HaveHousingView.js';
import { Events } from '../../Events.js';
import express from 'express';
const router = express.Router();

/**
 * Injected into App.js. Can be injected with Sign in and Create account views.
 */
export class CreateAccountContainer {
    #viewContainer = null;
    #signInViewElm = null;
    #credViewElm = null;
    #profileViewElm = null;
    #situationViewElm = null;
    #needHousingViewElm = null;
    #haveHousingViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const createAcctCntrElm = document.createElement('div');
        createAcctCntrElm.id = 'createAcctCntr';

        this.#viewContainer = document.createElement('div');

        // header and view container
        createAcctCntrElm.appendChild(await new Header().render());
        createAcctCntrElm.appendChild(this.#viewContainer);

        // renders views to be injected into viewContainer
        this.#signInViewElm = await new SignInView().render();
        this.#credViewElm = await new CredentialsView().render();
        this.#profileViewElm = await new ProfileView().render();
        this.#situationViewElm = await new HousingSituationView().render();
        this.#needHousingViewElm = await new NeedHousingView().render();
        this.#haveHousingViewElm = await new HaveHousingView().render();
        
        // initializes view container
        this.#navigateTo('sign-in');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return createAcctCntrElm;
    }

    /**
     * Called when navigateTo is published. Injects view into viewContainer.
     * @param {string} view
     */
    #navigateTo(view) {
     //   this.#viewContainer.innerHTML = '';
    
        if (view === 'sign-in') {         // SignInView
            // URL TODO: url should be 'index.html/sign-in'
            router.get("index.html/sign-in", async (req, res) => {
                try {
                    const signIn = this.#signInViewElm;
                    res.json(signIn);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            });
        }
        else if (view === 'create-1') {   // CredentialsView
            // URL TODO: url should be 'index.html/create-account'
            router.get("index.html/create-account", async (req, res) => {
                try {
                    const credView = this.#credViewElm;
                    res.json(credView);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            });
        }
        else if (view === 'create-2') {   // ProfileView
            // URL TODO: url should be 'index.html/create-account'
            router.get("index.html/create-account", async (req, res) => {
                try {
                    const credView = this.#credViewElm;
                    res.json(credView);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            });
        }
        else if (view === 'create-3') {   // HousingSituationView
            // URL TODO: url should be 'index.html/create-account'
            router.get("index.html/create-account", async (req, res) => {
                try {
                    const credView = this.#credViewElm;
                    res.json(credView);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            });
        }
        else if (view === 'create-4') {   // NeedHousingView or HaveHousingView
            // create-4 changes depending on whether user has housing  // DB TODO: implement when PouchDB works
            // URL TODO: url should be 'index.html/create-account'
            router.get("index.html/create-account", async (req, res) => {
                try {
                    const credView = this.#credViewElm;
                    res.json(credView);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            });
        }
        else {                            // invalid view name
            router.all("*", async (req, res) => {
                res.status(404).send('<h2>404 Page Not Found</h2>');
            });
        }
    }
}