// created by Ashley Bhandari
import { DiscoverButton } from '../../components/DiscoverButton.js';
import { Button } from '../../components/Button.js';
import { levelMap, characterMap, houseMap } from '../../helpers/discoverHelper.js';
import { Events } from '../../Events.js';
import { getAllUsers, getUserById } from '../../../data/MockBackend.js';
import { users } from '../../../data/MockData.js';

// view: 'discover'
export class DiscoverView {
    #discoverViewElm = null;
    #curUser = null;
    #unseenIndex = null;
    #events = null;

    constructor() {
        this.#events = Events.events();

        // Published by SignInView, HaveHousingView, and NeedHousing View.
        // Loads the view according to the user's preferences and saved 
        // likes/rejects/matches
        this.#events.subscribe('newUser', (user) => this.render(user));

        // Published by MatchesView. Creates a profile element of the user with
        // the published id, and sends it back to MatchesView.
        this.#events.subscribe('getProfile', async (id) => await this.#renderFromId(id));
    }

    /**
     * User can view other users by either liking or rejecting them.
     * @param {User} [curUser] - Currently signed-in user
     * @returns {Promise<HTMLDivElement>}
     */
    async render(curUser = null) {
        // if user has not signed in, mock user is used for backdoor entry
        if (!curUser) {
            this.#discoverViewElm = document.createElement('div');
            this.#discoverViewElm.classList.add('discoverView')
            this.#curUser = users[0];
        } else {
            this.#curUser = curUser;
            this.#discoverViewElm.innerHTML = '';
        }

        // get list of users to render on Discover
        const unseen = await this.#getUnseenUsers();

        // index in unseen - keeps track of what profile to display
        this.#unseenIndex = 0;

        // profile to display
        const curProfile = unseen[this.#unseenIndex];

        // left side of page: pic, name; bio as well if user has housing
        const bioSection = this.#addBioSection();
        this.#discoverViewElm.appendChild(bioSection);

        // right side of page: info about housing or bio (depending on housing situation)
        const hasHousing = curProfile ? curProfile.hasHousing : false; // necessary if unseen is empty
        const infoSection = hasHousing
            ? this.#addInfoSectionWithHousing()
            : this.#addInfoSectionWithoutHousing();
        this.#discoverViewElm.appendChild(infoSection);

        // like and reject buttons
        const buttons = document.createElement('div');
        buttons.classList.add('buttons');

        const rejectBtn = await new DiscoverButton(false).render();
        const likeBtn = await new DiscoverButton(true).render();

        // handles "liking" or "rejecting" a profile
        rejectBtn.addEventListener('click', () => {
            // add to user's rejected list
            this.#curUser.rejected.push(unseen[this.#unseenIndex].id);
            // view the next profile
            this.#injectProfile(unseen[++this.#unseenIndex], bioSection, infoSection);
        });
        likeBtn.addEventListener('click', () => {
            // add to user's liked list
            this.#curUser.liked.push(unseen[this.#unseenIndex].id);
            // view the next profile
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
    async #renderFromId(id) {
        const elm = document.createElement('div');
        elm.id = 'discoverProfile'
        elm.classList.add('discoverView');

        // user to display
        const user = await getUserById(id);

        // add HTML
        const bioSection = this.#addBioSection();
        const infoSection = user.hasHousing
            ? this.#addInfoSectionWithHousing()
            : this.#addInfoSectionWithoutHousing();
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
     * Gets an array of users that curUser hasn't liked, rejected, or matched
     * with yet.
     * @returns {User[]}
     */
    async #getUnseenUsers() {
        const allUsers = await getAllUsers();

        const fitsRequirements = (user) =>
            // user has housing if curUser doesn't, vice versa
            this.#curUser.hasHousing !== user.hasHousing &&
            // user is not curUser
            user.id !== this.#curUser.id                 &&
            // curUser has not already liked, rejected, or matched with user
            !this.#curUser.liked.includes(user.id)       &&
            !this.#curUser.rejected.includes(user.id)    &&
            !this.#curUser.matches.includes(user.id);

        const fitsPreferences = (user) =>
            this.#curUser.hasHousing !== user.hasHousing &&
            !this.#curUser.hasHousing &&
            user.id !== this.#curUser.id && 
            this.#curUser.preferences.cities.includes(user.housing.city) &&
            user.housing.rent <= this.#curUser.preferences.rent.max &&
            this.#curUser.preferences.gender[user.housing.gender] &&
            this.#curUser.preferences.leaseLength[user.housing.leaseLength] &&
            this.#curUser.preferences.leaseType[user.housing.leaseType] &&
            this.#curUser.preferences.roomType[user.housing.roomType] &&
            this.#curUser.preferences.buildingType[user.housing.buildingType] &&
            this.#curUser.preferences.timeframe[user.housing.timeframe] &&
             Object.keys(this.#curUser.preferences.amenities).some(
            amenity => this.#curUser.preferences.amenities[amenity] && user.housing.amenities.includes(amenity)
        );
        return allUsers.filter(fitsRequirements).filter(fitsPreferences);
    }

    /**
     * Creates containers for the left side of the page, to be injected with
     * information at a later point in time. Holds the user's profile picture,
     * name, education, and a self-written bio.
     * @returns {HTMLDivElement}
     */
    #addBioSection() {
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
        <div class="bio-social-media">
            <div class="discover-instagram">
                <div class="discover-instagram-text"></div>
            </div>
            <div class="discover-facebook">
                <div class="discover-facebook-text"></div>
            </div>
        </div>
        `;

        return elm;
    }
    
    /**
     * Creates containers for the right side of the page, to be injected with
     * information at a later point in time. Specific to users with housing, it
     * holds their personal characteristics and basic information about their
     * housing.
     * @returns {HTMLDivElement}
     */
    #addInfoSectionWithHousing() {
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
     * Creates containers for the right side of the page, to be injected with
     * information at a later point in time. Specific to users without housing,
     * it holds their personal characteristics and self-written bio.
     * @returns {HTMLDivElement}
     */
    #addInfoSectionWithoutHousing() {
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
                No more users fitting your preferences. Wait for more users or adjust your preferences in Settings.
            </p>
            `;
            return;
        }

        // inject info into bio section
        this.#injectBio(bioSection, user);

        // inject info into info section
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

        // Adds user social media
        if(user.socials.ig !== "") {
            // Note: image tag is not working, so it's commented out for now.
            // container.querySelector('.discover-instagram-icon').src = "https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/instagram.png";
            // container.querySelector('.discover-instagram-icon').style.width = "18px";
            // container.querySelector('.discover-instagram-icon').style.height = "18px";
            container.querySelector('.discover-instagram-text').innerText = "Instagram: " + user.socials.ig;
        }

        if(user.socials.fb !== "") {
            // Note: image tag is not working, so it's commented out for now.
            // container.querySelector('.discover-facebook-icon').src = "https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/facebook.png";
            // container.querySelector('.discover-facebook-icon').style.width = "18px";
            // container.querySelector('.discover-facebook-icon').style.height = "18px";
            container.querySelector('.discover-facebook-text').innerText = "Facebook: " + user.socials.fb;
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

        /**
         * Creates a yellow div to display each trait in.
         * @param {string} trait
         * @param {string} value
         */
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
         * Goes through a list of string-boolean pairs and renders a list of
         * elements associated with pairs whose boolean value is true.
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
            
            if (cntr.innerHTML === '') {
                cntr.innerHTML = `<span class="stats-empty">None</span>`
            }
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
