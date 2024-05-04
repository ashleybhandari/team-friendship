// created by Ashley Bhandari

import { Navbar1 } from '../../components/Navbar1.js';
import { LandingView } from './LandingView.js';
import { AboutView } from './AboutView.js';
import { Events } from '../../Events.js';
import express from 'express';
const router = express.Router();

export class SignedOutContainer {
    #signedOutCntrElm = null;
    #viewContainer = null;
    #landingViewElm = null;
    #aboutViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    /**
     * Sets up navbar for Landing and About views. Injected into App.
     * @returns {Promise<HTMLDivElement>}
     */
    async render() {
        this.#signedOutCntrElm = document.createElement('div');
        this.#signedOutCntrElm.id = 'signedOutCntr';

        this.#viewContainer = document.createElement('div');

        // navbar and view container
        this.#signedOutCntrElm.appendChild(await new Navbar1().render());
        this.#signedOutCntrElm.appendChild(this.#viewContainer);

        // renders views to be injected into viewContainer
        this.#landingViewElm = await new LandingView().render();
        this.#aboutViewElm = await new AboutView().render();
        
        // initializes view container
        this.#navigateTo('landing');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return this.#signedOutCntrElm;
    }

    /**
     * Called when navigateTo is published. Injects view into viewContainer and
     * styles the navbar accordingly.
     * @param {string} view
     */
    #navigateTo(view) {
        this.#viewContainer.innerHTML = '';
        
        if (view === 'landing') {    // LandingView
            // URL TODO: url should be 'index.html'
            router.get("index.html", async (req, res) => {
                try {
                    const discover = this.#landingViewElm;
                    res.json(discover);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            });
        }
        else if (view === 'about') { // AboutView
            // URL TODO: url should be 'index.html/about'
            router.get("index.html/about", async (req, res) => {
                try {
                    const about = this.#aboutViewElm;
                    res.json(about);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            });
        }
        else {                       // invalid view name
            router.all("*", async (req, res) => {
                res.status(404).send('<h2>404 Page Not Found</h2>');
            });
        }
    }

    /**
     * Applies the "selected" class only to the link associated with the
     * current view.
     * @param {string} view 
     */
    #updateNavbar(view) {
        // removes "selected" from all links
        Array
            .from(this.#signedOutCntrElm.querySelectorAll('nav a'))
            .forEach((elm) => elm.classList.remove('selected'));
        
        // applies "selected" to link associated with view
        const elm = this.#signedOutCntrElm.querySelector(`#nav-${view}`);
        if (elm) elm.classList.add('selected');
    }
}