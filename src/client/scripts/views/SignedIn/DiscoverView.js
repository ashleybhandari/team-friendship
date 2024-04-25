import { DiscoverButton } from '../../components/DiscoverButton.js';
import { levelMap, characterMap, houseMap } from '../../helpers/DiscoverData.js';
import { Events } from '../../Events.js';
import { getCurrentUser, getAllUsers, getUserById } from '../../../data/MockBackend.js';

/**
 * Created by Ashley Bhandari
 * User can view other users by either liking or rejecting them.
 * view: 'discover'
 */
export class DiscoverView {
    #discoverViewElm = null;
    #curUser = null;
    #unseenIndex = null;
    #events = null;

    constructor() {
        this.#events = Events.events();

        // Published by MatchesView. Creates a profile element of the user with
        // the published id, and sends it back to MatchesView.
        this.#events.subscribe('getProfile', async (id) => await this.renderFromId(id));
    }

    async render() {
        this.#curUser = await getCurrentUser(); // DB TODO: Replace when PouchDB works

        this.#discoverViewElm = document.createElement('div');
        this.#discoverViewElm.classList.add('discoverElm')

        // get list of users to render on Discover
        const allUsers = await getAllUsers();
        const unseen = allUsers.filter((user) => {
            const compatible = this.#curUser.hasHousing !== user.hasHousing;
            return compatible                             &&
                user.id !== this.#curUser.id              &&
                !this.#curUser.liked.includes(user.id)    &&
                !this.#curUser.rejected.includes(user.id) &&
                !this.#curUser.matches.includes(user.id)
        });

        // index in unseen of the profile to display
        this.#unseenIndex = 0;

        // profile to display
        const curProfile = unseen[this.#unseenIndex];

        // left side of page: pic, name; bio as well if user has housing
        const bioSection = this.#renderBioSection();
        this.#discoverViewElm.appendChild(bioSection);

        // right side of page: info about housing or bio (depending on housing situation)
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

        // handles "liking" or "rejecting" a profile
        rejectBtn.addEventListener('click', () => {
            this.#curUser.rejected.push(unseen[this.#unseenIndex].id);
            this.#injectProfile(unseen[++this.#unseenIndex], bioSection, infoSection);
        });
        likeBtn.addEventListener('click', () => {
            this.#curUser.liked.push(unseen[this.#unseenIndex].id);
            this.#injectProfile(unseen[++this.#unseenIndex], bioSection, infoSection);
        });

        buttons.appendChild(rejectBtn);
        buttons.appendChild(likeBtn);
        this.#discoverViewElm.appendChild(buttons);

        // inject user's information into the page
        this.#injectProfile(curProfile, bioSection, infoSection);

        return this.#discoverViewElm;
    }

    /**
     * Creates an element with a single profile. Published to MatchesView for
     * its match profile pages.
     * @param {string} id - id of the user whose profile will be published
     */
    async renderFromId(id) {
        const elm = document.createElement('div');
        elm.id = 'discoverProfile'
        elm.classList.add('discoverElm');

        // user to display
        const user = await getUserById(id);

        // render HTML
        const bioSection = this.#renderBioSection();
        const infoSection = user.hasHousing
            ? this.#renderInfoSectionWithHousing()
            : this.#renderInfoSectionWithoutHousing();
        elm.appendChild(bioSection);
        elm.appendChild(infoSection);
        
        // inject user's info into the HTML
        this.#injectBio(bioSection, user)
        user.hasHousing
            ? this.#injectInfoWithHousing(infoSection, user)
            : this.#injectInfoWithoutHousing(infoSection, user);

        // send the profile to MatchesView
        this.#events.publish('sendProfile', {
            id: user.id, profile: elm
        });
    }


    /**
     * Renders containers for the left side of the page, to be injected with
     * information at a later point in time. Holds the user's profile picture,
     * name, education, and a self-written bio.
     * @returns {HTMLDivElement}
     */
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
    
    /**
     * Renders containers for the right side of the page, to be injected with
     * information at a later point in time. Specific to users with housing, it
     * holds their personal characteristics and basic information about their
     * housing.
     * @returns {HTMLDivElement}
     */
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

    /**
     * Renders containers for the right side of the page, to be injected with
     * information at a later point in time. Specific to users without housing,
     * it holds their personal characteristics and self-written bio.
     * @returns {HTMLDivElement}
     */
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

    /**
     * Inject the profile with user's information.
     * @param {User} user - User to display
     * @param {HTMLDivElement} bioSection - Bio section of their profile
     * @param {HTMLDivElement} infoSection - Info section of their profile
     * @returns 
     */
    #injectProfile(user, bioSection, infoSection) {
        // shows message if the user does not exist (there are not more unseen
        // matches)
        if (!user) {
            this.#discoverViewElm.innerHTML = `
            <p class="no-users-msg">
                No more users fitting your preferences. Wait and more will come!
            </p>
            `;
            return;
        }

        // inject bio section
        this.#injectBio(bioSection, user);

        // inject info section
        user.hasHousing 
            ? this.#injectInfoWithHousing(infoSection, user)
            : this.#injectInfoWithoutHousing(infoSection, user);
    }

    /**
     * Injects the bio section with user's information.
     * @param {HTMLDivElement} container - Bio section
     * @param {User} user - User to display
     */
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

    /**
     * Injects the info section with user's housing information.
     * @param {HTMLDivElement} container - Info section
     * @param {User} user - User to display
     */
    #injectInfoWithHousing(container, user) {
        // about me: characteristics
        this.#injectCharacteristics(container, user);

        // accommodation details: lease info, occupants
        this.#injectAccommodationDetails(container, user);

        // accommodation stats: utilities, amenities, notes
        this.#injectAccommodationStats(container, user);
    }

    #injectInfoWithoutHousing(container, user) {
        // about me: characteristics
        this.#injectCharacteristics(container, user);

        // user self-written description
        this.#injectDescription(container, user);
    }

    /**
     * Injects user's characteristics into the info section.
     * @param {HTMLDivElement} container - Info section
     * @param {User} user - User to display
     */
    #injectCharacteristics(container, user) {
        const section = container.querySelector('.about-details');
        section.innerHTML = '';

        const render = (trait, value) => {
            const elm = document.createElement('div');
            elm.classList.add('character-trait');
            
            // gets user-friendly text for the property
            elm.innerText = characterMap.get(trait)[value - 1];
            section.appendChild(elm);
        };

        render('clean', user.character.clean);   // cleanliness
        render('sleep', user.character.sleep);   // sleeping habits
        render('noise', user.character.noise);   // noise while studying
        render('guests', user.character.guests); // how often they host guests
    }

    /**
     * Injects housing information into the info section. Only for users with
     * housing.
     * @param {HTMLDivElement} container - Info section
     * @param {User} user - User to display
     */
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

    /**
     * Injects utilities and amenities into the info section. Only for users
     * with housing.
     * @param {HTMLDivElement} container - Info section
     * @param {User} user - User to display
     */
    #injectAccommodationStats(container, user) {
        const house = user.housing;

        /**
         * Goes through a list of string-boolean pairs and creates elements
         * based on the boolean value.
         * @param {HTMLDivElement} cntr - Container to hold created elements
         * @param {Object<string, boolean>} attributes - key: property, value: whether user has that property
         */
        const renderList = (cntr, attributes) => {
            const elm = document.createElement('div');
            cntr.innerHTML = '';

            Object.entries(attributes).forEach(([key, value], i) => {
                // little dot to separate the created elements
                const separator = document.createElement('div');
                separator.innerHTML = `
                <i class="material-symbols-outlined">radio_button_unchecked</i>
                `;

                const attribute = document.createElement('p');
                attribute.innerText = houseMap.get(key); // for user-friendly text

                if (value) {
                    // if the boolean value is true, add the attribute and
                    // separator to cntr
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

        // render utilities and amenities
        renderList(rentIncludes, house.utilities);
        renderList(amenities, house.amenities);

        // render user-inputted notes about housing
        notes.innerHTML = `<p>${house.notes}</p>`
    }

    /**
     * Injects the user's self-written description into the info section. Only
     * for users without housing (users with housing have this field in the
     * bio section).
     * @param {HTMLDivElement} container - Info section
     * @param {User} user - User to display
     */
    #injectDescription(container, user) {
        const elm = container.querySelector('.bio-description');
        elm.innerText = user.description;
    }
}