// created by Ashley Bhandari

import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';
import * as db from '../../../data/DatabasePouchDB.js';

// view: 'matches'
export class MatchesView {
    #matchesViewElm = null;
    #listViewElm = null;
    #profileViewElm = null;
    #profileViewContainer = null;
    #events = null;

    #user = null;          // current user
    #openedMatchId = null; // id of match whose profile is open

    constructor() {
        this.#events = Events.events();

        // Published by SignInView, HaveHousingView, and NeedHousing View.
        // Loads the view according to the user's preferences and saved 
        // likes/rejects/matches
        this.#events.subscribe('authenticated', (id) => this.render(id));

        // Published by DiscoverView when a new match occurs.
        this.#events.subscribe('newMatch', (matchId) => this.#renderList())
    }

    /**
     * Displays the user's matches as a list of abbreviated profiles (can click
     * on a profile to view more details). Injected into SignedInContainer.
     * @param {string} [userId] - id of currently signed-in user
     * @returns {Promise<HTMLDivElement>}
     */
    async render(userId = null) {
        if (!userId) {
            // page is empty if user hasn't signed in
            this.#matchesViewElm = document.createElement('div');
            this.#matchesViewElm.id = 'matchesView';
            return this.#matchesViewElm;
        } else {
            // get user if signed in
            try {
                this.#user = await db.getUserById(userId);
                this.#matchesViewElm.innerHTML = '';
            } catch (error) {
                console.log(`Error fetching ${userId}: ${error.message}`);
                return this.#matchesViewElm;
            }
        }

        // matches list, profile container
        await this.#renderList();
        await this.#renderProfile();

        // initialize view with matches list
        this.#switchView();

        // Published by DiscoverView. Injects the published element (a user
        // profile) into MatchView's profile view.
        this.#events.subscribe('sendProfile', (elm) => this.#injectProfile(elm));

        return this.#matchesViewElm;
    }

    /**
     * Renders a list of the user's matches. Each entry consists of the match's
     * profile picture, name, location (if applicable), and self-written
     * description.
     */
    async #renderList() {
        if (!this.#listViewElm) {
            this.#listViewElm = document.createElement('div');
            this.#listViewElm.id = 'listView';

            // message if user has no matches
            const noMatchesMsg = document.createElement('div');
            noMatchesMsg.id = 'noMatchesMsg';
            noMatchesMsg.innerText = `No matches yet (don't worry, they'll come!)`;

            this.#matchesViewElm.appendChild(noMatchesMsg);
            this.#matchesViewElm.appendChild(this.#listViewElm);
        } else {
            this.#listViewElm.innerHTML = '';
        }

        try {
            const matches = await db.getMatches(this.#user._id);

            // only show "no matches" message if user has no matches
            const noMatchesMsg = this.#matchesViewElm.querySelector('#noMatchesMsg');
            if (matches.length === 0) {
                noMatchesMsg.classList.remove('hidden');
                return; // do not render the matches list
            } else {
                noMatchesMsg.classList.add('hidden')
            }            

            // show list if user has matches
            for (const id of matches) {
                const user = await db.getUserById(id);
                
                // match's entry in list
                const elm = document.createElement('div');
                elm.id = `user${user._id}`;
                elm.classList.add('user');
                
                // name, profile picture
                const name = user.name.nname
                    ? `${user.name.fname} (${user.name.nname})`
                    : user.name.fname;
                
                elm.innerHTML = `
                <img src=${user.avatar} alt="${user.name.fname}'s profile picture">
                <div class="bio">
                    <h2>${name}</h2>
                </div>
                `;

                // location if match has housing
                if (user.hasHousing) {
                    const housing = document.createElement('h3');
                    housing.innerText = `${user.housing.city} - `
                        + `$${user.housing.rent.price}/${user.housing.rent.period}`;
                    elm.querySelector('.bio').appendChild(housing);
                }
                
                // (truncated) description if match wrote one
                if (user.description) {
                    const description = document.createElement('p');
                    description.innerText = user.description
                        .replaceAll('\n', ' ')
                        .slice(0, 120) + '...';
                    elm.querySelector('.bio').appendChild(description);
                }

                // switch to profile view if match is clicked
                elm.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.#switchView(user._id);
                });
                this.#listViewElm.appendChild(elm);
            }   
        } catch (error) {
            console.log(`Error to rendering matches list: ${error.message}`);
        }
    }

    /**
     * Renders the view in which the selected match's profile will be injected.
     */
    async #renderProfile() {
        this.#profileViewElm = document.createElement('div');
        this.#profileViewElm.id = 'matchProfileView';

        // Back to Matches button, contact info, and Unmatch button
        this.#profileViewElm.appendChild(await this.#renderOptions());

        // container, injected with selected match's information
        this.#profileViewContainer = document.createElement('div');
        this.#profileViewContainer.id = 'profileViewContainer';
        this.#profileViewElm.appendChild(this.#profileViewContainer);

        this.#matchesViewElm.appendChild(this.#profileViewElm);
    }

    /**
     * Render the buttons/info that go at the top of a match's profile.
     * @returns {Promise<HTMLDivElement>}
     */
    async #renderOptions() {
        const elm = document.createElement('div');
        elm.classList.add('options');

        // Back to Matches button
        const toMatchesBtn = await new Button(
            '<i class="material-symbols-outlined">arrow_back</i>Back to Matches',
            200
            ).render();
        toMatchesBtn.id = 'toMatchesBtn';

        // switch to matches list
        toMatchesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.#switchView();
        });

        // contact info
        const contact = document.createElement('div');
        contact.classList.add('contact');
        contact.innerHTML = `
        <span class="battambang">Contact me</span>
        <a id="matchContact"></a>
        `;

        // unmatch button
        const unmatchBtn = await new Button('Unmatch', 200, 'danger').render();
        unmatchBtn.id = 'unmatchBtn';

        // unmatch and switch to matches list
        unmatchBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await db.removeMatch(this.#user._id, this.#openedMatchId) ;
                await this.#renderList();
                this.#switchView();
            } catch (error) {
                console.log(`Error unmatching ${this.#openedMatchId}: ${error.message}`);
            }
        });

        elm.appendChild(toMatchesBtn);
        elm.appendChild(contact);
        elm.appendChild(unmatchBtn);

        return elm;
    }

    /**
     * Injects the page with the selected match's Discover profile.
     * @param {Object} match - Discover page's publisher message
     * @param {number} match.id - Selected match's id
     * @param {HTMLDivElement} match.profile - Selected match's profile
     */
    async #injectProfile(match) {
        const [id, profile] = Object.values(match);
        let email = '';

        try {
            email = (await db.getUserById(id)).email;
        } catch (error) {
            console.log(`Error fetching ${id}'s email: ${error.message}`);
        }
        
        this.#openedMatchId = id;

        // contact information
        const contactElm = document.getElementById('matchContact');
        contactElm.href = `mailto: ${email}`;
        contactElm.innerHTML = `
        <i class="material-symbols-outlined">mail</i>
        ${email}
        `;

        this.#profileViewContainer.innerHTML = '';
        this.#profileViewContainer.appendChild(profile);
    }

    /**
     * Switches between viewing all matches and a selected match's profile
     * @param {number} [matchId]
     */
    #switchView(matchId = null) {
        if (matchId !== null) {
            // view match's profile
            this.#events.publish('getProfile', matchId); // ask Discover page for profile
            this.#listViewElm.classList.add('hidden');
            this.#profileViewElm.classList.remove('hidden');
            history.replaceState(null, '', `/${this.#user._id}/matches/${matchId}`);
        }
        else {
            // view matches list
            this.#listViewElm.classList.remove('hidden');
            this.#profileViewElm.classList.add('hidden');
            history.replaceState(null, '', `/${this.#user._id}/matches`);
        }
    }
}
