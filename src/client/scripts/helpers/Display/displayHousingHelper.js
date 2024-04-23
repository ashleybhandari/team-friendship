import { User } from '../../../data/data_structures/User.js';
import { Housing } from '../../../data/data_structures/Housing.js';
import { DisplayManageUsersHelper as DisplayUser } from './displayManageUsersHelper.js';

// Created by Gauri Arvind

export class DisplayHousingHelper {   
    /**
     * Takes an array of housing information and creates buttons to display it
     * @param {string[]} parts - array of housing information
     * @returns {Object} - div element containing button variable
     */
    createViewButtons(parts) {
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
    createViewItems(parts) {
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
    createImageCarousel(images) {
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
    #createLeftContainer(currUser, user) {
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
            DisplayUser.matchUsers(currUser, user);
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
            DisplayUser.rejectUsers(currUser, user);
        });

        // A button for accepting the user
        const acceptUser = document.createElement("input");
        rejectUser.className("accept-user");
        acceptUser.type = "image";
        acceptUser.value = "Accept";
        acceptUser.src = "assets/Google Fonts - Favorite.png";
        acceptUser.addEventListener("click", () => {
            DisplayUser.acceptUsers(currUser, user);
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
    #createRightContainer(user, housing) {
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
        aboutUserButtons.innerHTML = this.createViewButtons(Object.values(user.characteristics));
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
        userHouseRent.appendChild(this.createViewItems(Object.values(housing.utilities)));

        // Displays information on amenities offered in housing
        const userHouseAmenities = document.createElement("div");
        userHouseAmenities.classList.add("user-house-amenities", "be-vietnam-700");
        userHouseAmenities.innerText = "Amenities:";
        userHouseAmenities.appendChild(createViewItems(Object.values(housing.amenities)));

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
        userHouseImages.appendChild(this.createImageCarousel(housing.pics));

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
     * @param {User} currUser - the user who owns the account
     * @param {User} user - the user to be displayed
     * @param {Housing} housing - the user's housing information
     * @returns {Object} - returns a div containing the constructed page of user housing information
     */
    async render(currUser, user, housing) {
        const dWHVElem = document.createElement("div");
        dWHVElem.classList.add("display-with-housing-view", "display-user-block");

       // The left container of the page, which includes user info
       const leftContainer = this.#createLeftContainer(currUser, user);

       // The right container of the page, which includes housing information
       const rightContainer = this.#createRightContainer(user, housing);

       dWHVElem.appendChild(leftContainer);
       dWHVElem.appendChild(rightContainer);

       return dWHVElem;
    }
}