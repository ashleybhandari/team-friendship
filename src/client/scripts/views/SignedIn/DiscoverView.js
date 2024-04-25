import { DiscoverButton } from '../../components/DiscoverButton.js';
import { levelMap, characterMap, houseMap } from '../../helpers/DiscoverData.js';
import { Events } from '../../Events.js';
import { users } from '../../../data/MockData.js';
import { getUsers, getUser } from '../../../data/Backend.js';

/**
 * Created by Ashley Bhandari
 * view: 'discover'
 */
export class DiscoverView {
    #discoverViewElm = null;
    #curUser = null;
    #unseenIndex = null;
    #events = null;

    constructor() {
        this.#curUser = users[0];
        this.#events = Events.events();
        this.#events.subscribe('getProfile', async (id) => await this.renderFromId(id));
    }

    async render() {
        this.#discoverViewElm = document.createElement('div');
        this.#discoverViewElm.classList.add('discoverElm')

        // get list of users to render on Discover
        const allUsers = await getUsers();
        const unseen = allUsers.filter((user) => {
            const compatible = this.#curUser.hasHousing !== user.hasHousing;
            return compatible                             &&
                user.id !== this.#curUser.id              &&
                !this.#curUser.liked.includes(user.id)    &&
                !this.#curUser.rejected.includes(user.id) &&
                !this.#curUser.matches.includes(user.id)
        });

        this.#unseenIndex = 0; // index of currently displayed profile in unseen
        const curProfile = unseen[this.#unseenIndex];

        // left side of page: pic, name, bio (depending on housing situation)
        const bioSection = this.#renderBioSection();
        this.#discoverViewElm.appendChild(bioSection);

        // right side of page: info abt housing or bio (depending on housing situation)
        const hasHousing = curProfile ? curProfile.hasHousing : false; // necessary if unseen is empty
        const infoSection = hasHousing
            ? this.#renderInfoSectionWithHousing()
            : this.#renderInfoSectionWithoutHousing();

        this.#discoverViewElm.appendChild(infoSection);

        // like and reject buttons
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const rejectBtn = await new DiscoverButton(false).render();
        const likeBtn = await new DiscoverButton(true).render();

        rejectBtn.addEventListener('click', () => {
            this.#curUser.rejected.push(unseen[this.#unseenIndex].id);
            this.#injectProfile(unseen[++this.#unseenIndex], bioSection, infoSection);
        });
        likeBtn.addEventListener('click', () => {
            this.#curUser.rejected.push(unseen[this.#unseenIndex].id);
            this.#injectProfile(unseen[++this.#unseenIndex], bioSection, infoSection);
        });

        buttons.appendChild(rejectBtn);
        buttons.appendChild(likeBtn);
        this.#discoverViewElm.appendChild(buttons);

        // inject information into HTML
        this.#injectProfile(curProfile, bioSection, infoSection);

        return this.#discoverViewElm;
    }

    async renderFromId(id) {
        const elm = document.createElement('div');
        elm.id = 'discoverProfile'
        elm.classList.add('discoverElm');

        const user = await getUser(id);

        const bioSection = this.#renderBioSection();
        const infoSection = user.hasHousing
            ? this.#renderInfoSectionWithHousing()
            : this.#renderInfoSectionWithoutHousing();
        elm.appendChild(bioSection);
        elm.appendChild(infoSection);
        
        this.#injectBio(bioSection, user)
        user.hasHousing
            ? this.#injectInfoWithHousing(infoSection, user)
            : this.#injectInfoWithoutHousing(infoSection, user);

        this.#events.publish('sendProfile', {
            id: user.id, profile: elm
        });
    }

    #renderBioSection() {
        const elm = document.createElement('div');
        elm.classList.add('discover-bio');
        
        elm.innerHTML = `
        <img class="bio-pfp">
        <h1 class="bio-name battambang"></h1>
        <div class="bio-titles">
            <p class="bio-major"></p>
            <p class="bio-level"></p>
            <p class="bio-school"></p>
        </div>
        <div class="bio-description">
            <div class="about"></div>
        </div>
        `;

        return elm;
    }
    
    #renderInfoSectionWithHousing() {
        const elm = document.createElement('div');
        elm.classList.add('discover-info');

        elm.innerHTML = `
        <div class="about">
            <h1 class="battambang">About me</h1>
            <div class="about-details"></div>
        </div>
        <div class="accommodation">
            <h1 class="battambang">My accommodation</h1>
            <div class="accommodation-details">
            </div>
        </div>
        <div class="accommodation-stats">
            <p>Rent includes</p>
            <div class="rent-includes list"></div>
            <p>Amenities</p>
            <div class="amenities list"></div>
            <p>Notes</p>
            <div class="notes"></div>
        </div>
        <div class="pics"></div>
        `;

        return elm;
    }

    #renderInfoSectionWithoutHousing() {
        const elm = document.createElement('div');
        elm.classList.add('discover-info');

        elm.innerHTML = `
        <div class="about">
            <h1 class="battambang">About me</h1>
            <div class="about-details"></div>
        </div>
        <div class="bio-description">
        </div>
        `;

        return elm;
    }

    #injectProfile(user, bioSection, infoSection) {
        // shows message if no more users left to display
        if (!user) {
            this.#discoverViewElm.innerHTML = `
            <p class="no-users-msg">
                No more users fitting your preferences. Wait and more will come!
            </p>
            `;
            return;
        }

        this.#injectBio(bioSection, user);

        user.hasHousing 
            ? this.#injectInfoWithHousing(infoSection, user)
            : this.#injectInfoWithoutHousing(infoSection, user);
    }

    #injectBio(container, user) {
        // profile picture
        container.querySelector('.bio-pfp').src = user.avatar;
        
        // name
        const name = user.name.nname 
            ? `${user.name.fname} (${user.name.nname})` 
            : `${user.name.fname}`;
            container.querySelector('.bio-name').innerText = `${name}, ${user.age}`;

        // major
        const major = `${user.education.major} Major`;
        if (user.education.major) {
            container.querySelector('.bio-major').innerText = major;
        }

        // level of education
        const level = `${levelMap.get(user.education.level)} Student`
        if (user.education.level) {
            container.querySelector('.bio-level').innerText = level;
        }

        // school
        if (user.education.school) {
            container.querySelector('.bio-school').innerText = user.education.school;
        }

        // display description in bio section if user has housing
        if (user.hasHousing && user.description) {
            container.querySelector('.bio-description').innerText = user.description;
        }
    }

    #injectInfoWithHousing(container, user) {
        // about me
        this.#injectCharacteristics(container, user);

        // accommodation details
        this.#injectAccommodationDetails(container, user);

        // accommodation stats
        this.#injectAccommodationStats(container, user);
    }

    #injectInfoWithoutHousing(container, user) {
        // about me
        this.#injectCharacteristics(container, user);

        // user description
        this.#injectDescription(container, user);
    }

    #injectCharacteristics(container, user) {
        const section = container.querySelector('.about-details');
        section.innerHTML = '';

        const render = (trait, value) => {
            const elm = document.createElement('div');
            elm.classList.add('character-trait');
            elm.innerText = characterMap.get(trait)[value - 1];
            section.appendChild(elm);
        };

        render('clean', user.character.clean);
        render('sleep', user.character.sleep);
        render('noise', user.character.noise);
        render('guests', user.character.guests);
    }

    #injectAccommodationDetails(container, user) {
        const section = container.querySelector('.accommodation-details');
        const house = user.housing;

        section.innerHTML = `
        <div>
            <p>${house.city}</p>
            <p>$${house.rent.price}/${house.rent.period}</p>
            <p>${houseMap.get(house.leaseLength)} lease</p>
            <p>${houseMap.get(house.timeframe)} move-in</p>
        </div>
        <div>
            <p>${houseMap.get(house.roomType)} room for rent</p>
            <p>${houseMap.get(house.buildingType)} (${house.beds}BR/${house.baths}BA)</p>
            <p>${houseMap.get(house.gender)}</p>
        </div>
        `;
    }

    #injectAccommodationStats(container, user) {
        const house = user.housing;

        const renderList = (cntr, attributes) => {
            const elm = document.createElement('div');
            cntr.innerHTML = '';

            Object.entries(attributes).forEach(([key, value], i) => {
                const separator = document.createElement('div');
                separator.innerHTML = `
                <i class="material-symbols-outlined">radio_button_unchecked</i>
                `;

                const attribute = document.createElement('p');
                attribute.innerText = houseMap.get(key)    

                if (value) {
                    if (i !== 0) cntr.appendChild(separator);
                    cntr.appendChild(attribute)
                }
            });
            
            if (cntr.innerHTML === '') cntr.innerText = 'None'
            cntr.appendChild(elm);
        };

        const rentIncludes = container.querySelector('.rent-includes');
        const amenities = container.querySelector('.amenities');
        const notes = container.querySelector('.notes');

        renderList(rentIncludes, house.utilities);
        renderList(amenities, house.amenities);
        notes.innerHTML = `<p>${house.notes}</p>`
    }

    #injectDescription(container, user) {
        const elm = container.querySelector('.bio-description');
        elm.innerText = user.description;
    }
}