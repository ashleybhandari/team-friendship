import { User } from "../../../data/data_structures/User.js";
import { getUserById, getMatches, getCurrentUser } from '../../../data/MockBackend.js';

// Created by Gauri Arvind
// not in use

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
                if(i === 0) {
                    textInput.value = "Cleanliness: " + parts[i];
                }
                else if(i === 1) {
                    textInput.value = "Sleeping Habits: " + parts[i];
                }
                else if(i === 2) {
                    textInput.value = "Noisiness When Studying: " + parts[i];
                }
                else if (i === 3) {
                    textInput.value = "Hosting Guests: " + parts[i];
                }
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
         displayCenterProfile.classList.add("display-center");

        // Creates the item to flag a user
        const flagUser = document.createElement("input");
        flagUser.classList.add("flag-user");
        flagUser.type = "image";
        flagUser.value = "Flag";
        flagUser.src = "https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/Google Fonts - Flag.png";
        flagUser.addEventListener("click", () => {
            currUser.rejected.push(user.id);

        });

        // Displays the user's profile image
        const userProfileImg = document.createElement("img");
        userProfileImg.classList.add("user-profile-image");
        userProfileImg.src = user.avatar;

        // Displays the user's name
        const userName = document.createElement("div");
        userName.classList.add("user-name", "battambang");
        if(user.name.fname !== undefined) {
            userName.innerText += user.name.fname + " ";
        }
        if (user.name.lname !== undefined) {
            userName.innerText += user.name.fname + " ";
        }
        if (user.age !== undefined) {
            userName.innerText += "- " + user.age;
        }


        // Displays the user's schooling
        const userSchool = document.createElement("div");
        userSchool.classList.add("user-school", "be-vietnam");

        const userSchoolMajor = document.createElement("div");
        userSchoolMajor.classList.add("user-school-info");
        userSchoolMajor.innerText = user.education.major;

        const userSchoolLevel = document.createElement("div");
        userSchoolLevel.classList.add("user-school-info");
        userSchoolLevel.innerText = user.education.level;

        userSchool.appendChild(userSchoolMajor);
        userSchool.appendChild(userSchoolLevel);

        // Displays the user's description of themselves
        if(user.description !== null) {
            const userDescription = document.createElement("div");
            userDescription.classList.add("user-description", "be-vietnam");
            userDescription.innerText = user.description;
            userDescription.id = "user-description-housing";
            displayCenterProfile.appendChild(userDescription);
        }
    

        // A button for rejecting the user
        const rejectUser = document.createElement("input");
        rejectUser.classList.add("reject-user");
        rejectUser.type = "image";
        rejectUser.value = "Reject";
        rejectUser.src = "https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/Google Fonts - Close.png";
        rejectUser.addEventListener("click", () => {
            currUser.rejected.push(user.id);
        });

        // A button for accepting the user
        const acceptUser = document.createElement("input");
        acceptUser.classList.add("accept-user");
        acceptUser.type = "image";
        acceptUser.value = "Accept";
        acceptUser.src = "https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/Google Fonts - Favorite.png";
        acceptUser.addEventListener("click", () => {
            currUser.matches.push(user.id);
        });

        displayCenterProfile.appendChild(flagUser);
        displayCenterProfile.appendChild(userProfileImg);
        displayCenterProfile.appendChild(userName);
        displayCenterProfile.appendChild(userSchool);
        if(user.description !== null) {
            displayCenterProfile.appendChild(userDescription);
        }
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
        aboutUser.appendChild(aboutUserLabel);
        aboutUser.appendChild(await this.createViewButtons(Object.values(user.character)));
        displayCenterProfile.appendChild(aboutUser);

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

        displayCenterProfile.appendChild(userAccommodation);
        displayCenterProfile.appendChild(userAccommodationLeft);
        displayCenterProfile.appendChild(userAccommodationRight);

        // Displays information about renting
        if(housing.utilities !== null || housing.utilities !== undefined) {
            const userHouseRent = document.createElement("div");
            userHouseRent.classList.add("user-house-rent", "be-vietnam-700");
            userHouseRent.innerText = "Rent includes:";
            userHouseRent.appendChild(await this.createViewItems(Object.values(housing.utilities)));
            displayCenterProfile.appendChild(userHouseRent);
        }

        // Displays information on amenities offered in housing
        const userHouseAmenities = document.createElement("div");
        userHouseAmenities.classList.add("user-house-amenities", "be-vietnam-700");
        userHouseAmenities.innerText = "Amenities:";
        userHouseAmenities.appendChild(await this.createViewItems(Object.values(housing.amenities)));
        displayCenterProfile.appendChild(userHouseAmenities);

        // Displays notes about housing
        const userHouseNotes = document.createElement("div");
        userHouseNotes.classList.add("user-house-notes", "be-vietnam-700");
        userHouseNotes.innerText = "Notes:";

        const userNotesDescription = document.createElement("div");
        userHouseNotes.classList.add("user-notes-description", "be-vietnam");
        userNotesDescription.innerText = housing.notes;
        userHouseNotes.appendChild(userNotesDescription);
        displayCenterProfile.appendChild(userHouseNotes);

        // Displays images of user's housing 
        const userHouseImages = document.createElement("div");
        userHouseImages.classList.add("user-house-images", "be-vietnam-700");
        userHouseImages.innerText = "Images:";
        userHouseImages.appendChild(await this.createImageCarousel(housing.pics));
        displayCenterProfile.appendChild(userHouseImages);

       
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

        const currUser = await getCurrentUser();
        let potentialMatches = await getMatches();
        let displayMatches = potentialMatches.filter(e => !currUser.matches.includes(e) && !currUser.rejected.includes(e) && e.hasHousing);

        if(displayMatches.length === 0) {
            dWHVElem.innerText = "There are no new users to display. More will come soon!";
            return dWHVElem;
        }
        else {
                for(let i = 0; i < displayMatches.length; ++i) {
                    const dWHContainer = document.createElement("div");
                    dWHContainer.classList.add("display-user-block");
                    // The left container of the page, which includes user info
                    const userSearched = await getUserById(displayMatches[i])
                    const leftContainer = await this.#createLeftContainer(currUser, userSearched);

                    // The right container of the page, which includes housing information
                    const rightContainer = await this.#createRightContainer(userSearched, userSearched.housing);
                    
                    dWHContainer.appendChild(leftContainer);
                    dWHContainer.appendChild(rightContainer);
                    dWHVElem.appendChild(dWHContainer);
                }

            return dWHVElem;
        }
    }
}
