// created by Ashley Bhandari
import { DiscoverButton } from '../../components/DiscoverButton.js';
import { Button } from '../../components/Button.js';
import { CheckboxGroup } from '../../components/CheckboxGroup.js';
import { levelMap, characterMap, houseMap } from '../../helpers/DiscoverData.js';
import { Events } from '../../Events.js';
import { getAllUsers, getUserById } from '../../../data/MockBackend.js';

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
     * @param {User} curUser - Currently signed-in user
     * @returns {Promise<HTMLDivElement>}
     */
    async render(curUser) {
        // if user has not signed in, DiscoverView is an empty div
        if (!curUser) {
            this.#discoverViewElm = document.createElement('div');
            this.#discoverViewElm.classList.add('discoverView')
            return this.#discoverViewElm;
        }

        this.#curUser = curUser;
        this.#discoverViewElm.innerHTML = '';

        // get list of users to render on Discover
        const unseen = await this.#getUnseenUsers();

        // index in unseen - keeps track of what profile to display
        this.#unseenIndex = 0;

        // profile to display
        const curProfile = unseen[this.#unseenIndex];

        // filter bar
        const filterBar = await this.#renderFilterBar();
        this.#discoverViewElm.appendChild(filterBar);

        // Overarching div (in order to style filter bar) - didn't work
        // const profileSection = document.createElement("div");

        // left side of page: pic, name; bio as well if user has housing
        const bioSection = this.#addBioSection();
        this.#discoverViewElm.appendChild(bioSection);
        // profileSection.appendChild(bioSection);

        // right side of page: info about housing or bio (depending on housing situation)
        const hasHousing = curProfile ? curProfile.hasHousing : false; // necessary if unseen is empty
        const infoSection = hasHousing
            ? this.#addInfoSectionWithHousing()
            : this.#addInfoSectionWithoutHousing();
        this.#discoverViewElm.appendChild(infoSection);
        // profileSection.appendChild(infoSection);

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
        // profileSection.appendChild(buttons);
        // this.#discoverViewElm.appendChild(profileSection);

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
            
        return allUsers.filter(fitsRequirements);
    }

    /**
     * Creates a bar at the top of the Discover page. The discover feed changes
     * depending on which options the user selects
     * @returns {Promise<HTMLDivElement>} 
     */
    async #renderFilterBar() { // TODO: Gauri
        const elm = document.createElement('div');
        // elm.style.marginBottom = "100px";

        // TODO: Render the filter bar - should have checkboxes associated with the character property in the User data structure,
        // and just a few properties in the Preferences data structure (otherwise it's too much work). Only add the Preferences
        // properties if !this.#curUser.hasHousing
        
        // Dictionary for filtering users 
        const filterOptions = {
            "gender": {
                "female": false,
                "male": false,
                "nonbinary": false
            },
            "clean": {
                "messy": false,
                "clean": false,
                "very clean": false
            },
            "sleep": {
                "morning riser": false,
                "afternoon riser": false,
                "evening riser": false
            },
            "noise": {
                "low noise": false,
                "medium noise": false,
                "loud noise": false
            },
            "guests": {
                "no to less guests": false,
                "some guests": false,
                "any number of guests": false
            },
            "education level": {
                "undergrad": false,
                "postgrad": false,
                "other": false
            }
        };

        // Dictionary to filter users (based on housing preferences)
        const preferenceOptions = {
            "room type": {
                "private": false,
                "shared": false
            },
            "building type": {
                "dorm": false,
                "apartment": false,
                "house": false
            },
            // "lease length": {
            //     "semester": false,
            //     "month": false,
            //     "half year": false,
            //     "full year": false
            // } // commented out for formatting
        }

        // Overarching filter
        const filter = document.createElement("div");
        filter.classList.add("discover-filter");

        // Creates initial filter option
        for(let i = 0; i < Object.keys(filterOptions).length; ++i) {
            const filterKey = Object.keys(filterOptions)[i];
            const filterValues = filterOptions[filterKey];
            const filterMap = new Map(Object.entries(filterValues));
            const filterByOption = await new CheckboxGroup(filterKey, filterMap).render();
            filter.appendChild(filterByOption);
        }

        // Appends preference filter if user is looking for roommates
        if(!this.#curUser.hasHousing) {
            for(let i = 0; i < Object.keys(preferenceOptions).length; ++i) {
                const filterKey = Object.keys(preferenceOptions)[i];
                const filterValues = preferenceOptions[filterKey];
                const filterMap = new Map(Object.entries(filterValues));
                const filterByOption = await new CheckboxGroup(filterKey, filterMap).render();
                filter.appendChild(filterByOption);
            }
        }

        elm.appendChild(filter);

        const saveBtn = await new Button('Save changes').render();
        saveBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // TODO: Grab the values in elm (use elm.querySelector(#checkbox_id)). Checkboxes are automatically given id's, use
            // Developer tools inspect element to find it. Create a Map<string, boolean> object where keys are the property names
            // in User/Preferences and values are whether the box was checked. Ashley will deal with publishing the map and
            // refreshing the page. As an example:
            // const result = new Map([
            //     ['clean', true],
            //     ['sleep', true],
            //     ['noise', false],
            //     ['cities', true],
            //     etc.
            // ]);

            // initial map, currently contains all ids
            const filterMap = new Map([
                // items from user
                // items for gender
                ['femaleBox', elm.querySelector('#femaleBox').checked], // gender.identity === female
                ['maleBox', elm.querySelector('#maleBox').checked], // gender.identity === male
                ['nonbinaryBox', elm.querySelector('#nonbinaryBox').checked], // gender.identity === nonbinary

                // items for cleanliness
                ['messyBox', elm.querySelector('#messyBox').checked], // character.clean === 1
                ['cleanBox', elm.querySelector('#cleanBox').checked], // character.clean === 2
                ['veryCleanBox', elm.querySelector('#veryCleanBox').checked], // character.clean === 3

                // items for sleep
                ['morningRiserBox', elm.querySelector('#morningRiserBox').checked], // character.sleep === 1
                ['afternoonRiserBox', elm.querySelector('#afternoonRiserBox').checked], // character.sleep === 2
                ['eveningRiserBox', elm.querySelector('#eveningRiserBox').checked], // character.sleep === 3

                //items for noise
                ['lowNoiseBox', elm.querySelector('#lowNoiseBox').checked], // character.noise === 1
                ['mediumNoiseBox', elm.querySelector('#mediumNoiseBox').checked], // character.noise === 2
                ['loudNoiseBox', elm.querySelector('#loudNoiseBox').checked], // character.noise === 3

                //items for guests
                ['noToLessGuestsBox', elm.querySelector('#noToLessGuestsBox').checked], // character.guests === 1
                ['someGuestsBox', elm.querySelector('#someGuestsBox').checked], // character.guests === 2
                ['anyNumberOfGuesBox', elm.querySelector('#anyNumberOfGuesBox').checked], // character.guests === 3

                // items for education level
                ['undergradBox', elm.querySelector('#undergradBox').checked], // education.level === "undergrad"
                ['postgradBox', elm.querySelector('#postgradBox').checked], // education.level === "grad"
                ['otherBox', elm.querySelector('#otherBox').checked], // education.level === "other"

                // items for preferences
                // items for room type
                ['privateBox', elm.querySelector('#privateBox').checked], // roomType.private
                ['sharedBox', elm.querySelector('#sharedBox').checked], // roomType.shared

                // items for occupants
                ['dormBox', elm.querySelector('#dormBox').checked], // buildingType.dorm
                ['apartmentBox', elm.querySelector('#apartmentBox').checked], // buildingType.apt
                ['houseBox', elm.querySelector('#houseBox').checked], // buildingType.house

                // items for lease length
                ['semesterBox', elm.querySelector('#semesterBox').checked], // leaseLength.semester
                ['monthBox', elm.querySelector('#monthBox').checked], // leaseLength.month
                ['halfYearBox', elm.querySelector('#halfYearBox').checked], // leaseLength.halfYear
                ['fullYearBox', elm.querySelector('#fullYearBox').checked] // leaseLength.year
            ]);

        });

        elm.appendChild(saveBtn);

        return elm;
    };

    /**
     * Creates containers for the left side of the page, to be injected with
     * information at a later point in time. Holds the user's profile picture,
     * name, education, and a self-written bio.
     * @returns {HTMLDivElement}
     */
    #addBioSection() {
        const elm = document.createElement('div');
        elm.classList.add('discover-bio');
        elm.style.marginTop = "50px";
        
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
        elm.style.marginTop = "450px";

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
        elm.style.marginTop = "450px";

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