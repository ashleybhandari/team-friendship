import { DiscoverButton } from '../../components/DiscoverButton.js';
import { levelMap, characterMap, houseMap } from '../../helpers/DiscoverData.js';
import { Events } from '../../Events.js';
import { users } from '../../../data/MockData.js';
import { getUsers, getUser } from '../../../data/Backend.js';

// view: 'discover'
export class DiscoverView {
    #discoverViewElm = null;
    #bioSectionElm = null
    #infoSectionElm = null;
    #events = null;

    #curUser = null;
    #curProfile = null;
    #profileIndex = null;

    constructor() {
        this.#curUser = users[0];
        this.#events = Events.events();
        this.#events.subscribe('getProfile', async (id) => {
            // await this.render(id);
        });
    }

    async render() {
        this.#discoverViewElm = document.createElement('div');
        this.#discoverViewElm.id = 'discoverElm';

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

        this.#profileIndex = 0; // index of currently displayed profile in unseen
        this.#curProfile = unseen[this.#profileIndex];

        // left side of page: pic, name, bio (depending on housing situation)
        this.#renderBioSection();

        // right side of page: info abt housing or bio (depending on housing situation)
        this.#curProfile.hasHousing
            ? this.#renderInfoSectionWithHousing()
            : this.#renderInfoSectionWithoutHousing();

        // like and reject buttons
        this.#renderButtons(unseen);

        // inject information into HTML
        this.#injectProfile();

        this.#events.publish('sendProfile', {
            id: this.#curProfile.id, profile: this.#discoverViewElm
        });

        return this.#discoverViewElm;
    }

    async #renderButtons(unseen) {
        const elm = document.createElement('div');
        elm.classList.add('buttons');

        const rejectBtn = await new DiscoverButton(false).render();
        const likeBtn = await new DiscoverButton(true).render();

        rejectBtn.addEventListener('click', () => {
            this.#curUser.rejected.push(this.#profileIndex.id);
            this.#curProfile = unseen[++this.#profileIndex];
            this.#injectProfile();
        });
        likeBtn.addEventListener('click', () => {
            this.#curUser.liked.push(this.#profileIndex.id);
            this.#curProfile = unseen[++this.#profileIndex];
            this.#injectProfile();
        });

        elm.appendChild(rejectBtn);
        elm.appendChild(likeBtn);
        this.#discoverViewElm.appendChild(elm);
    }

    #renderBioSection() {
        this.#bioSectionElm = document.createElement('div');
        this.#bioSectionElm.classList.add('discover-bio');
        
        this.#bioSectionElm.innerHTML = `
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

        this.#discoverViewElm.appendChild(this.#bioSectionElm);
    }
    
    #renderInfoSectionWithHousing() {
        this.#infoSectionElm = document.createElement('div');
        this.#infoSectionElm.classList.add('discover-info');
        this.#infoSectionElm.innerHTML = `
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

        this.#discoverViewElm.appendChild(this.#infoSectionElm);
    }

    #renderInfoSectionWithoutHousing() {
        this.#infoSectionElm = document.createElement('div');
        this.#infoSectionElm.classList.add('discover-info');
        this.#infoSectionElm.innerHTML = `
        <div class="about">
            <h1 class="battambang">About me</h1>
            <div class="about-details"></div>
        </div>
        <div class="bio-description">
        </div>
        `;

        this.#discoverViewElm.appendChild(this.#infoSectionElm);
    }

    #injectProfile() {
        // shows message if no more users left to display
        if (!this.#curProfile) {
            this.#discoverViewElm.innerHTML = `
            <p class="no-users-msg">
                No more users fitting your preferences. Wait and more will come!
            </p>
            `;
            return;
        }

        this.#injectBio();

        this.#curProfile.hasHousing 
            ? this.#injectInfoWithHousing()
            : this.#injectInfoWithoutHousing();
    }

    #injectBio() {
        const p = this.#curProfile;

        // profile picture
        this.#bioSectionElm.querySelector('.bio-pfp').src = p.avatar;
        
        // name
        const name = p.name.nname 
            ? `${p.name.fname} (${p.name.nname})` 
            : `${p.name.fname}`;
        this.#bioSectionElm.querySelector('.bio-name').innerText = `${name}, ${p.age}`;

        // major
        const major = `${p.education.major} Major`;
        if (p.education.major) {
            this.#bioSectionElm.querySelector('.bio-major').innerText = major;
        }

        // level of education
        const level = `${levelMap.get(p.education.level)} Student`
        if (p.education.level) {
            this.#bioSectionElm.querySelector('.bio-level').innerText = level;
        }

        // school
        if (p.education.school) {
            this.#bioSectionElm.querySelector('.bio-school').innerText = p.education.school;
        }

        // display description in bio section if user has housing
        if (p.hasHousing && p.description) {
            this.#bioSectionElm.querySelector('.bio-description').innerText = p.description;
        }
    }

    #injectInfoWithHousing() {
        // about me
        this.#injectCharacteristics();

        // accommodation details
        this.#injectAccommodationDetails();

        // accommodation stats
        this.#injectAccommodationStats();
    }

    #injectInfoWithoutHousing() {
        // about me
        this.#injectCharacteristics();

        // user description
        this.#injectDescription();
    }

    #injectCharacteristics() {
        const section = this.#infoSectionElm.querySelector('.about-details');
        section.innerHTML = '';

        const render = (trait, value) => {
            const elm = document.createElement('div');
            elm.classList.add('character-trait');
            elm.innerText = characterMap.get(trait)[value - 1];
            section.appendChild(elm);
        };

        render('clean', this.#curProfile.character.clean);
        render('sleep', this.#curProfile.character.sleep);
        render('noise', this.#curProfile.character.noise);
        render('guests', this.#curProfile.character.guests);
    }

    #injectAccommodationDetails() {
        const section = this.#infoSectionElm.querySelector('.accommodation-details');
        const h = this.#curProfile.housing;

        section.innerHTML = `
        <div>
            <p>${h.city}</p>
            <p>$${h.rent.price}/${h.rent.period}</p>
            <p>${houseMap.get(h.leaseLength)} lease</p>
            <p>${houseMap.get(h.timeframe)} move-in</p>
        </div>
        <div>
            <p>${houseMap.get(h.roomType)} room for rent</p>
            <p>${houseMap.get(h.buildingType)} (${h.beds}BR/${h.baths}BA)</p>
            <p>${houseMap.get(h.gender)}</p>
        </div>
        `;
    }

    #injectAccommodationStats() {
        const h = this.#curProfile.housing;

        const renderList = (container, attributes) => {
            const elm = document.createElement('div');
            container.innerHTML = '';

            Object.entries(attributes).forEach(([key, value], i) => {
                const separator = document.createElement('div');
                separator.innerHTML = `
                <i class="material-symbols-outlined">radio_button_unchecked</i>
                `;

                const attribute = document.createElement('p');
                attribute.innerText = houseMap.get(key)    

                if (value) {
                    if (i !== 0) container.appendChild(separator);
                    container.appendChild(attribute)
                }
            });
            
            if (container.innerHTML === '') container.innerText = 'None'
            container.appendChild(elm);
        };

        const rentIncludes = this.#infoSectionElm.querySelector('.rent-includes');
        const amenities = this.#infoSectionElm.querySelector('.amenities');
        const notes = this.#infoSectionElm.querySelector('.notes');

        renderList(rentIncludes, h.utilities);
        renderList(amenities, h.amenities);
        notes.innerHTML = `<p>${h.notes}</p>`
    }

    #injectDescription() {
        const container = this.#infoSectionElm.querySelector('.bio-description');
        container.innerText = this.#curProfile.description;
    }
}