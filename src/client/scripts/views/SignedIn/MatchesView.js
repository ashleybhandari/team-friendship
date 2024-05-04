// created by Ashley Bhandari

import { getUserById, getMatches, removeMatch } from '../../../data/MockBackend.js';
import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';
import { users } from '../../../data/MockData.js';

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
        this.#events.subscribe('newUser', (user) => this.render(user));
    }

    /**
     * Displays the user's matches as a list of abbreviated profiles (can click
     * on a profile to view more details). Injected into SignedInContainer.
     * @param {User} [user] - Currently signed-in user
     * @returns {Promise<HTMLDivElement>}
     */
    async render(user = null) {
        // if user has not signed in, mock user is used for backdoor entry
        if (!user) {
            this.#matchesViewElm = document.createElement('div');
            this.#matchesViewElm.id = 'matchesView';
            this.#user = users[0];
        } else {
            this.#user = user;
            this.#matchesViewElm.innerHTML = '';
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
        this.#listViewElm = document.createElement('div');
        this.#listViewElm.id = 'listView';

        const matches = await getMatches(this.#user.id) // DB TODO: replace with below when PouchDB works
        // const matches = await db.getMatches(this.#user.id);

        // show message if user has no matches
        if (matches.length === 0) {
            const noMatches = document.createElement('div');
            noMatches.id = 'noMatches';
            noMatches.innerText = `No matches yet (don't worry, they'll come!)`;
            this.#matchesViewElm.appendChild(noMatches);
            return;
        }

        // show list if user has matches
        for (const id of matches) {
            const user = await getUserById(id); // DB TODO: replace with below when PouchDB works
            // const user = await db.getUserById(id);
            
            // match's entry in list
            const elm = document.createElement('div');
            elm.id = `user${user.id}`;
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
                elm.getElementsByClassName('bio')[0].appendChild(housing);
            }
            
            // (truncated) description if match wrote one
            if (user.description) {
                const description = document.createElement('p');
                description.innerText = user.description
                    .replaceAll('\n', ' ')
                    .slice(0, 120) + '...';
                elm.getElementsByClassName('bio')[0].appendChild(description);
            }

            // switch to profile view if match is clicked
            elm.addEventListener('click', (e) => {
                e.preventDefault();
                this.#switchView(user.id);
            });
            this.#listViewElm.appendChild(elm);
        }

        this.#matchesViewElm.appendChild(this.#listViewElm);
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
            await removeMatch(this.#user.id, this.#openedMatchId); // DB TODO: replace with below when PouchDB works
            // await db.removeMatch(this.#user.id, this.#openedMatchId) ;
            await this.#renderList();
            this.#switchView();
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
     * @param {HTMLDivElement} match.id - Selected match's profile
     */
    async #injectProfile(match) {
        const [id, profile] = Object.values(match);
        const email = (await getUserById(id)).email;

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
            window.location.hash = `match${matchId}`; // URL TODO: url should be `index.html/matches/${matchId}`
        }
        else {
            // view matches list
            this.#listViewElm.classList.remove('hidden');
            this.#profileViewElm.classList.add('hidden');
            window.location.hash = 'matches'; // URL TODO: url should be 'index.html/matches'
        }
    }
}
