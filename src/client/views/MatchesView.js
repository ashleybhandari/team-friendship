import { User } from '../DataStructures.js';
import { getUser, getMatches } from '../Data.js';
import { Button } from '../components/Button.js';

/**
 * Displays the user's matches as a list of abbreviated profiles (can click on
 * a profile to view more details)
 */
export class MatchesView {
    #usersViewElm = null;
    #profileViewElm = null;
    #profileViewContainer = null;

    async render() {
        const matchesViewElm = document.createElement('div');
        matchesViewElm.id = 'matchesView';

        await this.#renderUsers(matchesViewElm);
        await this.#renderProfile(matchesViewElm);
        matchesViewElm
            .querySelector('#toMatchesBtn')
            .addEventListener('click', () => this.#switchView());

        this.#switchView();

        return matchesViewElm;
    }

    /**
     * Renders a list of the user's matches. Each entry consists of the match's
     * profile picture, name, location (if applicable), and self-written
     * description
     * @param {HTMLDivElement} container 
     */
    async #renderUsers(container) {
        this.#usersViewElm = document.createElement('div');
        this.#usersViewElm.id = 'usersView';

        for (const match of await getMatches()) {
            const user = await getUser(match);
            
            const elm = document.createElement('div');
            elm.id = `user${user.id}`;
            elm.classList.add('user');
            
            const name = user.name.nname
                ? `${user.name.fname} (${user.name.nname})`
                : user.name.fname;
            
            elm.innerHTML = `
            <img src=${user.pic} alt="${user.name.fname}'s profile picture">
            <div class="bio">
                <h2>${name}</h2>
            </div>
            `;

            if (user.housing) {
                const housing = document.createElement('h3');
                housing.innerText = `${user.housing.city} - `
                    + `$${user.housing.rent.price}/${user.housing.rent.period}`;
                elm.getElementsByClassName('bio')[0].appendChild(housing);
            }
            
            if (user.description) {
                const description = document.createElement('p');
                description.innerText = user.description
                    .replaceAll('\n', ' ')
                    .slice(0, 120) + '...';
                elm.getElementsByClassName('bio')[0].appendChild(description);
            }

            elm.addEventListener('click', () => this.#switchView(user));
            this.#usersViewElm.appendChild(elm);
        }

        container.appendChild(this.#usersViewElm);
    }

    /**
     * Renders the selected match's profile.
     * @param {HTMLDivElement} container 
     * @param {User} user 
     */
    async #renderProfile(container) {
        this.#profileViewElm = document.createElement('div');
        this.#profileViewElm.id = 'profileView';

        const toMatchesBtn = await new Button(
            '<i class="material-symbols-outlined">arrow_back</i>Back to Matches',
            200
            ).render();
        toMatchesBtn.id = 'toMatchesBtn';

        this.#profileViewContainer = document.createElement('div');
        this.#profileViewContainer.id = 'profileViewContainer';

        this.#profileViewElm.appendChild(toMatchesBtn);
        this.#profileViewElm.appendChild(this.#profileViewContainer);

        container.appendChild(this.#profileViewElm);
    }

    /**
     * Injects the page with the selected match's Discover profile
     * @param {User} user 
     */
    #injectProfile(user) {
        this.#profileViewContainer.innerText = `Inject ${user.name.fname}'s profile`;
        // TODO: inject profile from DIscover page
    }

    /**
     * Switches between viewing all matches and a selected match's profile
     * @param {User} user 
     */
    #switchView(user = null) {
        if (user) {
            // view user's profile
            this.#usersViewElm.classList.add('hidden');
            this.#profileViewElm.classList.remove('hidden');
            this.#injectProfile(user);
            window.location.hash = `matches/${user.id}`;
        }
        else {
            // view all matches
            this.#usersViewElm.classList.remove('hidden');
            this.#profileViewElm.classList.add('hidden');
            window.location.hash = 'matches';
        }
    }
}