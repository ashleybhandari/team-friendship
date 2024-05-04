// created by Ashley Bhandari

import { Header } from '../../components/Header.js';
import { Navbar2 } from '../../components/Navbar2.js';
import { DiscoverView } from './DiscoverView.js';
import { MatchesView } from './MatchesView.js';
import { SettingsView } from './SettingsView.js';
import { Events } from '../../Events.js';
import express from 'express';
const router = express.Router();

export class SignedInContainer {
    #signedInCntrElm = null;
    #viewContainer = null;
    #discoverViewElm = null;
    #matchesViewElm = null;
    #settingsViewElm = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    /**
     * Sets up header and navbar for Discover, Matches, and Settings views.
     * Injected into App.
     * @returns {Promise<HTMLDivElement>}
     */
    async render() {
        this.#signedInCntrElm = document.createElement('div');
        this.#signedInCntrElm.id = 'signedInCntr';

        this.#viewContainer = document.createElement('div');

        // header, navbar, and view container
        this.#signedInCntrElm.appendChild(await new Header().render());
        this.#signedInCntrElm.appendChild(await new Navbar2().render());
        this.#signedInCntrElm.appendChild(this.#viewContainer);

        // renders views to be injected into viewContainer
        this.#discoverViewElm = await new DiscoverView().render();
        this.#matchesViewElm = await new MatchesView().render();
        this.#settingsViewElm = await new SettingsView().render();

        // initializes view container
        this.#navigateTo('discover');
        this.#events.subscribe('navigateTo', (view) => this.#navigateTo(view));

        return this.#signedInCntrElm;
    }

    /**
     * Called when navigateTo is published. Injects view into viewContainer and
     * styles the navbar accordingly.
     * @param {string} view
     */
    #navigateTo(view) {
      //  this.#viewContainer.innerHTML = '';

        if (view === 'discover') {      // DiscoverView
            // URL TODO: url should be 'index.html/discover'
            router.get("index.html/discover", async (req, res) => {
                try {
                    const discover = this.#discoverViewElm;
                    res.json(discover);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            });
        }
        else if (view === 'matches') {  // MatchesView
            // URL TODO: url should be 'index.html/matches'
            router.get("index.html/discover", async (req, res) => {
                try {
                    const matches = this.#matchesViewElm;
                    res.json(matches);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            }); 
        }
        else if (view === 'settings') { // SettingsView
            // URL TODO: url should be 'index.html/settings'
            router.get("index.html/settings", async (req, res) => {
                try {
                    const settings = this.#settingsViewElm;
                    res.json(settings);
                }
                catch(error) {
                    res.status(500).json({
                        error: error.message
                    })
                }
            });
        }
        else {                          // invalid view name
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
            .from(this.#signedInCntrElm.querySelectorAll('nav a'))
            .forEach((elm) => elm.classList.remove('selected'));
        
        // applies "selected" to link associated with view
        const elm = this.#signedInCntrElm.querySelector(`#nav-${view}`);
        if (elm) elm.classList.add('selected');
    }
}