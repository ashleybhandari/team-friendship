import { User } from '../../../data/data_structures/User.js';
import { DisplayManageUsersHelper as DisplayUser } from './displayManageUsersHelper.js';

// Created by Gauri Arvind

export class DisplayRoommatesHelper {
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
     * Creates the left container of the user housing page based on user displayed, specifically as a roommate.
     * @param {User} currUser - the user who owns the account
     * @param {User} user - the user to be displayed
     */
    async #createLeftContainer(currUser, user) {
        const leftContainer = document.createElement("div");
        leftContainer.classList.add("display-left-container display-split");

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
        displayCenterProfile.appendChild(rejectUser);
        displayCenterProfile.appendChild(acceptUser);
        leftContainer.appendChild(displayCenterProfile);

        return leftContainer;
    }

    /**
     * Creates right container of user roommate information
     * @param {User} user - the user to be displayed
     */
    async #createRightContainer(user) {
        const rightContainer = document.createElement("div");
        rightContainer.classList.add("right-container-roommate", "display-split");

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

        // Displays the user's description of themselves
        const userDescription = document.createElement("div");
        userDescription.classList.add("user-description", "be-vietnam");
        userDescription.innerText = user.description;
        userDescription.id = "user-description-housing";

        displayCenterProfile.appendChild(aboutUser);
        displayCenterProfile.appendChild(userDescription);
        rightContainer.appendChild(displayCenterProfile);

        return rightContainer;
    }

     /**
     * Renders page of a single user looking for a roommate
     * @param {User} currUser - the user who owns the account
     * @param {User} user - the user to be displayed
     */
    async render(currUser, user) {
        const dWOHVElem = document.createElement("div");
        dWOHVElem.classList.add("display-with-housing-view", "display-user-block"); 

        // The left container of the page, which includes user info
        const leftContainer = await this.#createLeftContainer(currUser, user);

        // The right container of the page, which includes housing information
        const rightContainer = await this.#createRightContainer(user);

        dWOHVElem.appendChild(leftContainer);
        dWOHVElem.appendChild(rightContainer);

        return dWOHVElem;
    }
}