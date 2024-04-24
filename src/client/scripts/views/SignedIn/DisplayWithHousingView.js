import { User } from "../../data/data_structures/User.js";
import { getUser, getMatches } from '../../data/Backend.js';
import { users } from '../../data/MockData.js';

// Created by Gauri Arvind

// view: 'discover'
export class DisplayWithHousingView {
    /**
     * Takes an array of housing information and creates buttons to display it
     * @param {string[]} parts - array of housing information
     * @returns {Object} - div element containing button variable
     */
    async createViewButtons(parts) {
        if(parts === undefined || parts.length === 0) {
            console.log("Missing array of housing parts");
        }
        else {
            const viewButtonElement = document.createElement("div");
            for(let i = 0; i < parts.length; ++i) {
                const textInput = document.createElement("input");
                textInput.classList.add("display-personal-button", "be-vietnam");
                textInput.value = parts[i];
                textInput.type = "button";

                viewButtonElement.appendChild(textInput);
            }
            return viewButtonElement;
        }
    }

    /**
     * Creates a short array of values based on user housing information
     * @param {string[]} parts - array of housing information
     * @returns {Object} - div element containing items formatted in HTML
     */
    async createViewItems(parts) {
        if(parts === undefined || parts === []) {
            console.log("Missing array of parts");
        }
        else {
            const viewListElement = document.createElement("div");
            viewListElement.classList.add("view-list-element", "be-vietnam")
                for(let i = 0; i < parts.length; ++i) {
                    // If this renders a bit strange take out the dot in if statement
                    const textDiv = document.createElement("div");
                    textDiv.classList.add("view-inner-text");
                    textDiv.innerText = parts[i];
                    viewListElement.appendChild(textDiv);

                    if(i != parts.length - 1) {
                        const dotSpan = document.createElement("span");
                        dotSpan.classList.add("housing-dot");
                        viewListElement.appendChild(dotSpan);
                    } 
                }
                return viewListElement;
        }
    }

    /**
     * Curates images of user's housing
     * @param {string[]} images - URLs of images related to housing
     * @returns {Object} - contains array of user's images
     */
    async createImageCarousel(images) {
        if(images != undefined || images.length !== 0) {
            const imageCarousel = document.createElement("div");
            imageCarousel.classList.add("user-house-image-carousel");
            for(let i = 0; i < images.length; ++i) {
                const image = document.createElement("img");
                image.src = images[i];
                image.classList.add("housing-images");
                imageCarousel.appendChild(image);
            }
            return imageCarousel;
        }
        else {
            console.log("Error with image carousel input. Either there are no images or the carousel was made incorrectly.");
        }
    }

    /**
     * Creates the left container of the user housing page based on user displayed.
     * @param {User} currUser - the user who owns the account
     * @param {User} user - the user to be displayed
     */
    async #createLeftContainer(currUser, user) {
        const leftContainer = document.createElement("div");
        leftContainer.classList.add("display-split", "left-container");

         // Creates a div to center remaining left container elements
         const displayCenterProfile = document.createElement("div");
         // There may be an issue causing elements to appear weird - display-center works locally
         displayCenterProfile.classList.add("display-center");

        // Creates the item to flag a user
        const flagUser = document.createElement("input");
        flagUser.classList.add("flag-user");
        flagUser.type = "image";
        flagUser.value = "Flag";
        flagUser.src = "assets/Google Fonts - Flag.png";
        flagUser.addEventListener("click", () => {
            // DisplayUser.matchUsers(currUser, user); TODO: fix import issue
            console.log("flag")
        });

        // Displays the user's profile image
        const userProfileImg = document.createElement("img");
        userProfileImg.classList.add("user-profile-image");
        userProfileImg.src = user.pic;

        // Displays the user's name
        const userName = document.createElement("div");
        userName.classList.add("user-name", "battambang");
        userName.innerText = user.name + " " + user.age;

        // Displays the user's schooling
        const userSchool = document.createElement("div");
        userSchool.classList.add("user-school", "be-vietnam");

        const userSchoolMajor = document.createElement("div");
        userSchoolMajor.classList.add("user-school-info");
        userSchoolMajor.innerText = user.schooling.major;

        const userSchoolLevel = document.createElement("div");
        userSchoolLevel.classList.add("user-school-info");
        userSchoolLevel.innerText = user.schooling.level;

        const userSchoolUni = document.createElement("div");
        userSchoolUni.classList.add("user-school-info");
        userSchoolUni.innerText = user.schooling.school;

        userSchool.appendChild(userSchoolMajor);
        userSchool.appendChild(userSchoolLevel);
        userSchool.appendChild(userSchoolUni);

        // Displays the user's description of themselves
        const userDescription = document.createElement("div");
        userDescription.classList.add("user-description", "be-vietnam");
        userDescription.innerText = user.description;
        userDescription.id = "user-description-housing";

        // A button for rejecting the user
        const rejectUser = document.createElement("input");
        rejectUser.className("reject-user");
        rejectUser.type = "image";
        rejectUser.value = "Reject";
        rejectUser.src = "assets/Google Fonts - Close.png";
        rejectUser.addEventListener("click", () => {
            // DisplayUser.rejectUsers(currUser, user); TODO: fix import issue
            console.log("reject");
        });

        // A button for accepting the user
        const acceptUser = document.createElement("input");
        rejectUser.className("accept-user");
        acceptUser.type = "image";
        acceptUser.value = "Accept";
        acceptUser.src = "assets/Google Fonts - Favorite.png";
        acceptUser.addEventListener("click", () => {
            // DisplayUser.acceptUsers(currUser, user); TODO: fix import issue
            console.log("accept");
        });

        displayCenterProfile.appendChild(flagUser);
        displayCenterProfile.appendChild(userProfileImg);
        displayCenterProfile.appendChild(userName);
        displayCenterProfile.appendChild(userSchool);
        displayCenterProfile.appendChild(userDescription);
        displayCenterProfile.appendChild(rejectUser);
        displayCenterProfile.appendChild(acceptUser);
        leftContainer.appendChild(displayCenterProfile);

        return leftContainer;
    }

    /**
     * Creates the right container of the user housing page based on user displayed.
     * @param {User} user - the user to be displayed
     */
    async #createRightContainer(user, housing) {
        const rightContainer = document.createElement("div");
        rightContainer.classList.add("right-container", "display-split");

        // Creates a div to center remaining left container elements
        const displayCenterProfile = document.createElement("div");
        // There may be an issue causing elements to appear weird - display-center works locally
        displayCenterProfile.classList.add("display-center");

        // Displays characteristics of user
        const aboutUser = document.createElement("div");
        aboutUser.classList.add("user-about", "be-vietnam-700");
        const aboutUserLabel = document.createElement("label");
        aboutUserLabel.value = "About me:";

        const aboutUserButtons = document.createElement("div");
        aboutUserButtons.innerHTML = await this.createViewButtons(Object.values(user.characteristics));
        aboutUser.appendChild(aboutUserLabel);
        aboutUser.appendChild(aboutUserButtons);

        // Displays information about user's accommodation
        const userAccommodation = document.createElement("div");
        userAccommodation.classList.add("user-accommodation", "be-vietnam-700");
        userAccommodation.innerText = "My accommodation:";

        // Displays the left side of user's accommodation
        const userAccommodationLeft = document.createElement("div");
        userAccommodationLeft.classList.add("user-accommodation-left", "be-vietnam");
        userAccommodationLeft.innerText = housing.city + "\n " + housing.rent + "\n " + housing.leaseLength + "lease \n" + housing.timeframe + " \n";

        const userAccCity = document.createElement("div");
        userAccCity.classList.add("user-acc-left-child");
        userAccCity.innerText = housing.city;

        const userAccRent = document.createElement("div");
        userAccRent.classList.add("user-acc-left-child");
        userAccRent.innerText = housing.rent;

        const userAccLeaseLength = document.createElement("div");
        userAccLeaseLength.classList.add("user-acc-left-child");
        userAccLeaseLength.innerText = housing.leaseType + " lease";

        const userAccTime = document.createElement("div");
        userAccTime.classList.add("user-acc-left-child");
        userAccTime.innerText = housing.timeframe;

        userAccommodationLeft.appendChild(userAccCity);
        userAccommodationLeft.appendChild(userAccRent);
        userAccommodationLeft.appendChild(userAccLeaseLength);
        userAccommodationLeft.appendChild(userAccTime);

        // Displays the right side of user's accommodation
        const userAccommodationRight = document.createElement("div");
        userAccommodationRight.classList.add("user-accommodation-right", "be-vietnam");
        userAccommodationRight.innerText = housing.buildingType + " \n" + housing.gender;

        const userAccRoom = document.createElement("div");
        userAccRoom.classList.add("user-acc-right-child");
        userAccRoom.innerText = housing.roomType + " available for rent";

        const userAccBldg = document.createElement("div");
        userAccBldg.classList.add("user-acc-right-child");
        userAccBldg.innerText = housing.buildingType;

        const userAccGender = document.createElement("div");
        userAccGender.classList.add("user-acc-right-child");
        userAccGender.innerText = housing.gender;

        userAccommodationRight.appendChild(userAccRoom);
        userAccommodationRight.appendChild(userAccBldg);
        userAccommodationRight.appendChild(userAccGender);

        // Displays information about renting
        const userHouseRent = document.createElement("div");
        userHouseRent.classList.add("user-house-rent", "be-vietnam-700");
        userHouseRent.innerText = "Rent includes:";
        userHouseRent.appendChild(await this.createViewItems(Object.values(housing.utilities)));

        // Displays information on amenities offered in housing
        const userHouseAmenities = document.createElement("div");
        userHouseAmenities.classList.add("user-house-amenities", "be-vietnam-700");
        userHouseAmenities.innerText = "Amenities:";
        userHouseAmenities.appendChild(await this.createViewItems(Object.values(housing.amenities)));

        // Displays notes about housing
        const userHouseNotes = document.createElement("div");
        userHouseNotes.classList.add("user-house-notes", "be-vietnam-700");
        userHouseNotes.innerText = "Notes:";

        const userNotesDescription = document.createElement("div");
        userHouseNotes.classList.add("user-notes-description", "be-vietnam");
        userNotesDescription.innerText = housing.notes;
        userHouseNotes.appendChild(userNotesDescription);

        // Displays images of user's housing 
        const userHouseImages = document.createElement("div");
        userHouseImages.classList.add("user-house-images", "be-vietnam-700");
        userHouseImages.innerText = "Images:";
        userHouseImages.appendChild(await this.createImageCarousel(housing.pics));

        displayCenterProfile.appendChild(aboutUser);
        displayCenterProfile.appendChild(userAccommodation);
        displayCenterProfile.appendChild(userAccommodationLeft);
        displayCenterProfile.appendChild(userAccommodationRight);
        displayCenterProfile.appendChild(userAccommodation);
        displayCenterProfile.appendChild(userHouseRent);
        displayCenterProfile.appendChild(userHouseAmenities);
        displayCenterProfile.appendChild(userHouseNotes);
        displayCenterProfile.appendChild(userHouseImages);
        rightContainer.append(displayCenterProfile);

        return rightContainer;
    }

    /**
     * Creates housing view for a single user with housing
     */
    async render() {
        const dWHVElem = document.createElement("div");
        dWHVElem.classList.add("display-with-housing-view", "display-user-block");

        // dWHVElem.innerHTML = `
        // <div class="display-split left-container">
        //     <div class="display-center">
        //     <input src="./assets/Google Fonts - Flag.png" type="image" class="flag-user" value="Flag">
        //     <!-- <div class="display-center-profile"> -->
        //         <img src="/Users/gauri/Downloads/team-friendship-1/assets/Google Fonts - Flag.png" class="user-profile-image">
        //         <div class="user-name battambang">Jane, 22</div>
        //         <div class="user-school be-vietnam">
        //             <div class="user-school-info">major</div>
        //             <div class="user-school-info">level</div>
        //             <div class="user-school-info">university</div>
        //         </div>
        //         <input class="reject-user" type="image" value="Reject" src="/Users/gauri/Downloads/team-friendship-1/assets/Google Fonts - Close.png">
        //         <input class="accept-user" type="image" value="Accept" src="/Users/gauri/Downloads/team-friendship-1/assets/Google Fonts - Favorite.png">
        //     <!-- </div> -->
        //     </div>
        // </div>
        
        // <div class="display-split right-container-roommate">
        //     <div class="display-center">
        //         <div class="user-about-roommate be-vietnam-700">
        //             <label>About me:</label>
        //             <div class="be-vietnam">
        //                 <input class="display-personal-button" type="button" value="Clean">
        //                 <input class="display-personal-button" type="button" value="Early Riser">
        //                 <input class="display-personal-button be-vietnam" type="button" value="Looking for roommates">
        //             </div>
        //         </div>
        //         <div class="user-description be-vietnam" id="user-description-housing">a very long description of this user a very long description of this user a very long description of this user a very long description of this user a very long description of this user a very long description of this user a very long description of this user </div>
        //         <!-- <div class="user-accommodation be-vietnam-700">My accommodation:
        //         </div>
        //         <div class="user-accommodation-left be-vietnam">
        //             <div class="user-acc-left-child">City</div>
        //             <div class="user-acc-left-child">Rent</div>
        //             <div class="user-acc-left-child">Lease</div>
        //             <div class="user-acc-left-child">Length</div>
        //             <div class="user-acc-left-child">Timeframe</div>
        //         </div>
        //         <div class="user-accommodation-right be-vietnam">
        //             <div class="user-acc-right-child">Room</div>
        //             <div class="user-acc-right-child">Type</div>
        //             <div class="user-acc-right-child">Building</div>
        //             <div class="user-acc-right-child">Type</div>
        //             <div class="user-acc-right-child">Gender</div>
        //         </div>
        //         <div class="user-house-rent be-vietnam-700">Rent includes:
        //             <div class="view-list-element be-vietnam">
        //                 <div class="view-inner-text">hi</div>
        //                 <span class="housing-dot"></span>
        //                 <div class="view-inner-text">hi</div>
        //                 <span class="housing-dot"></span>
        //                 <div class="view-inner-text">hi</div>
        //             </div>
        //         </div>
        //         <div class="user-house-amenities be-vietnam-700">Amenities:
        //             <div class="view-list-element be-vietnam">
        //                 <div class="view-inner-text">hi</div>
        //                 <span class="housing-dot"></span>
        //                 <div class="view-inner-text">hi</div>
        //                 <span class="housing-dot"></span>
        //                 <div class="view-inner-text">hi</div>
        //             </div>
        //         </div>
        //         <div class="user-house-notes be-vietnam-700">Notes:
        //             <div class="user-notes-description be-vietnam">
        //                 banana
        //             </div>
        //         </div>
        //         <div class="user-house-images be-vietnam-700">Images:
        //             <div class="user-house-image-carousel">
        //                 <img class="housing-images" src="assets/Google Fonts - Favorite.png">
        //                 <img class="housing-images" src="assets/Google Fonts - Favorite.png">
        //             </div>
        //         </div> -->
        //     </div>
        // </div>
        // `;

        const currUser = users[5];
        let potentialMatches = await getMatches();
        let displayMatches = [];

        // Code for rendering mock data matches
        for(let i = 0; i < potentialMatches.length; ++i) {
            const user = await getUser(potentialMatches[i].id);
            if(user.hasHousing === currUser.hasHousing) {
                if(user.character.sleep === currUser.character.sleep) {
                    displayMatches.push(user);
                }
            }
        }

        for(let i = 0; i < displayMatches.length; ++i) {
            const dWHContainer = document.createElement("div");
            // The left container of the page, which includes user info
            const leftContainer = await this.#createLeftContainer(currUser, displayMatches[i]);

            // The right container of the page, which includes housing information
            const rightContainer = await this.#createRightContainer(displayMatches[i], displayMatches[i].housing);
            
            dWHContainer.appendChild(leftContainer);
            dWHContainer.appendChild(rightContainer);
            dWHVElem.appendChild(dWHContainer);
        }
        

    //    // The left container of the page, which includes user info
    //    const leftContainer = await this.#createLeftContainer(currUser, user);

    //    // The right container of the page, which includes housing information
    //    const rightContainer = await this.#createRightContainer(user, housing);

    //    dWHVElem.appendChild(leftContainer);
    //    dWHVElem.appendChild(rightContainer);

       return dWHVElem;
    }
}
