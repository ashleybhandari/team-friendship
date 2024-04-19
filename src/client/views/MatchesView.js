import { User } from '../data/User.js';
import { getUser, getMatches } from '../data/Backend.js';
import { Button } from '../components/Button.js';

/**
 * Displays the user's matches as a list of abbreviated profiles (can click on
 * a profile to view more details). Injected into SignedInContainer.
 */
export class MatchesView {
    #listViewElm = null;
    #profileViewElm = null;
    #profileViewContainer = null;

    async render() {
        const matchesViewElm = document.createElement('div');
        matchesViewElm.id = 'matchesView';

        // matches list, profile container
        await this.#renderList(matchesViewElm);
        await this.#renderProfile(matchesViewElm);

        // initialize view with matches list
        this.#switchView();

        return matchesViewElm;
    }

    /**
     * Renders a list of the user's matches. Each entry consists of the match's
     * profile picture, name, location (if applicable), and self-written
     * description.
     * @param {HTMLDivElement} container 
     */
    async #renderList(container) {
        this.#listViewElm = document.createElement('div');
        this.#listViewElm.id = 'listView';

        const matches = await getMatches();

        // show message if user has no matches
        if (matches.length === 0) {
            const noMatches = document.createElement('div');
            noMatches.id = 'noMatches';
            noMatches.innerText = `No matches yet (don't worry, they'll come!)`;
            container.appendChild(noMatches);
            return;
        }

        // show list if user has matches
        for (const match of matches) {
            const user = await getUser(match);
            
            // match's entry in list
            const elm = document.createElement('div');
            elm.id = `user${user.id}`;
            elm.classList.add('user');
            
            // name, profile picture
            const name = user.name.nname
                ? `${user.name.fname} (${user.name.nname})`
                : user.name.fname;
            
            elm.innerHTML = `
            <img src=${user.pic} alt="${user.name.fname}'s profile picture">
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
                this.#switchView(user);
            });
            this.#listViewElm.appendChild(elm);
        }

        container.appendChild(this.#listViewElm);
    }

    /**
     * Renders the selected match's profile.
     * @param {HTMLDivElement} container 
     */
    async #renderProfile(container) {
        this.#profileViewElm = document.createElement('div');
        this.#profileViewElm.id = 'profileView';

        // Back to Matches button
        const toMatchesBtn = await new Button(
            '<i class="material-symbols-outlined">arrow_back</i>Back to Matches',
            200
            ).render();
        toMatchesBtn.id = 'toMatchesBtn';

        // switch to matches list when Back to Matches is clicked
        toMatchesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.#switchView();
        });

        // container, injected with selected match's information
        this.#profileViewContainer = document.createElement('div');
        this.#profileViewContainer.id = 'profileViewContainer';

        this.#profileViewElm.appendChild(toMatchesBtn);
        this.#profileViewElm.appendChild(this.#profileViewContainer);

        container.appendChild(this.#profileViewElm);
    }

    /**
     * Injects the page with the selected match's Discover profile
     * @param {User} match 
     */
    #injectProfile(match) {
        this.#profileViewContainer.innerText = `Inject ${match.name.fname}'s profile`;
        // TODO: inject profile from Discover page, add contact info
    }

    /**
     * Switches between viewing all matches and a selected match's profile
     * @param {User} match
     */
    #switchView(match = null) {
        if (match) {
            // view match's profile
            this.#listViewElm.classList.add('hidden');
            this.#profileViewElm.classList.remove('hidden');
            this.#injectProfile(match);
            window.location.hash = `match${match.id}`;
        }
        else {
            // view matches list
            this.#listViewElm.classList.remove('hidden');
            this.#profileViewElm.classList.add('hidden');
            window.location.hash = 'matches';
        }
    }
}