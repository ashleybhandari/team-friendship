import { User } from '../DataStructures.js';
import { getUser, getMatches } from '../Data.js';

/**
 * Displays the user's matches as a list of abbreviated profiles (can click on
 * a profile to view more details)
 */
export class MatchesView {
    async render() {
        const matchesViewElm = document.createElement('div');
        matchesViewElm.id = 'matches-view';

        await this.#renderUsers(matchesViewElm);
        await this.#renderPopup(matchesViewElm);

        return matchesViewElm;
    }

    /**
     * Renders a list of the user's matches. Each entry consists of the match's
     * profile picture, name, location (if applicable), and self-written
     * description
     * @param {string} container 
     */
    async #renderUsers(container) {
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

            elm.addEventListener('click', (e) => this.#openPopup(e, user, elm.id));
            container.appendChild(elm);
        }
    }

    /**
     * Renders the popup that appears when a match is clicked on. Initially
     * hidden.
     * @param {string} container 
     */
    async #renderPopup(container) {
        const elm = document.createElement('div');

        elm.innerHTML = `
        <div id="overlay"></div>
        <div id="popup">
            <i id="popup-close" class="material-symbols-outlined">close</i>
            <div id="popup-content"></div>
        </div>
        `;

        // TODO: inject Discover profile into popup-content

        elm.querySelector('#overlay')
           .addEventListener('click', (e) => this.#closePopup(e));

        elm.querySelector('#popup-close')
           .addEventListener('click', (e) => this.#closePopup(e));

        container.appendChild(elm);
    }

    /**
     * Opens a popup with the selected match's information, and styles the
     * match's entry in the Match list
     * @param {Event} event 
     * @param {User} user 
     * @param {string} elmId - id of the match's HTML element in the Matches list
     */
    #openPopup(event, user, elmId) {
        event.preventDefault();

        const popup = document.getElementById('popup');
        popup['data-selected'] = elmId;

        popup.style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('popup-content').innerText = `Inject ${user.name.fname}'s profile`;
        // TODO: inject user's Discover profile, add contact information

        document.getElementById(elmId).classList.add('selected');
    }
    
    /**
     * Closes the popup and removes styling from the match's entry in the
     * Matches list.
     * @param {Event} event 
     */
    #closePopup(event) {
        event.preventDefault();

        const popup = document.getElementById('popup');
        
        popup.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';

        document
            .getElementById(popup['data-selected'])
            .classList.remove('selected');
    }
}