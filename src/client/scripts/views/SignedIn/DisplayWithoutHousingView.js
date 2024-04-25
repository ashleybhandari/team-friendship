import { User } from "../../../data/data_structures/User.js";
import { getUser, getMatches } from '../../../data/Backend.js';
import { users } from '../../../data/MockData.js';
import { DisplayManageUsersHelper as DisplayUser } from '../../helpers/Display/displayManageUsersHelper.js';

// Created by Gauri Arvind
// not in use

export class DisplayWithoutHousingView {
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
     * Creates the left container of the user housing page based on user displayed, specifically as a roommate.
     * @param {User} currUser - the user who owns the account
     * @param {User} user - the user to be displayed
     */
    async #createLeftContainer(currUser, user) {
        const leftContainer = document.createElement("div");
        leftContainer.classList.add("display-left-container", "display-split");

        // Creates a div to center remaining left container elements
        const displayCenterProfile = document.createElement("div");
        // There may be an issue causing elements to appear weird - display-center works locally
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

        // acceptRejectDiv.appendChild(rejectUser);
        displayCenterProfile.appendChild(flagUser);
        displayCenterProfile.appendChild(userProfileImg);
        displayCenterProfile.appendChild(userName);
        displayCenterProfile.appendChild(userSchool);
        displayCenterProfile.appendChild(acceptUser);
        displayCenterProfile.appendChild(rejectUser);
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
       aboutUser.appendChild(aboutUserLabel);
       aboutUser.appendChild(await this.createViewButtons(Object.values(user.character)));
       displayCenterProfile.appendChild(aboutUser);

      // Displays the user's description of themselves
       if(user.description !== null) {
        const userDescription = document.createElement("div");
        userDescription.classList.add("user-description", "be-vietnam");
        userDescription.innerText = user.description;
        userDescription.id = "user-description-housing";
        displayCenterProfile.appendChild(userDescription);
       }

       rightContainer.appendChild(displayCenterProfile);

        return rightContainer;
    }

     /**
     * Renders page of a single user looking for a roommate
     */
    async render() {
        const dWOHVElem = document.createElement("div");
        dWOHVElem.classList.add("display-with-housing-view"); 

        const currUser = users[5];
        let potentialMatches = await getMatches();
        let displayMatches = potentialMatches.filter(e => !currUser.matches.includes(e) && !currUser.rejected.includes(e) && !e.hasHousing);

        if(displayMatches.length === 0) {
            dWOHVElem.innerText = "There are no new users to display. More will come soon!";
            return dWOHVElem;
        }
        else {
            for(let i = 2; i < 3; ++i) {
                const dWOHContainer = document.createElement("div");
                dWOHContainer.innerHTML = '';
    
                dWOHContainer.classList.add("display-user-block");
                // The left container of the page, which includes user info
                const leftContainer = await this.#createLeftContainer(currUser, await getUser(i));
    
                // The right container of the page, which includes housing information
                const rightContainer = await this.#createRightContainer(await getUser(i));
                
                dWOHContainer.appendChild(leftContainer);
                dWOHContainer.appendChild(rightContainer);
                dWOHVElem.appendChild(dWOHContainer);
            }
        }

        return dWOHVElem;
    }
}