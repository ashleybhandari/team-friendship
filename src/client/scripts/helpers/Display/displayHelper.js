import { User } from "../../../data/data_structures/User.js";
import { DisplayHousingHelper } from "./displayHousingHelper.js";
import { DisplayRoommatesHelper } from "./displayRoommatesHelper.js";
// import { db } from "./src/client/data/DatabasePouchDB.js";
import { getUser, getMatches } from '../../../data/Backend.js';

// Created by Gauri Arvind

// export class DisplayHelper {
    /**
     * Creates the automatically filtered page of users based on the logged in user's preferences
     * @param {User} user - the User object associated with the current user
     * @returns {User[]} - the array of User objects to be displayed
     */
    async function findUsersToDisplay(user) {
        let potentialMatches = await getMatches();
        let displayMatches = [];

        // Code for rendering mock data matches
        for(let i = 0; i < potentialMatches.length; ++i) {
            const currUser = await getUser(potentialMatches[i].id);
            if(user.hasHousing === currUser.hasHousing) {
                if(user.character.sleep === currUser.character.sleep) {
                    displayMatches.push(currUser);
                }
            }
        }

        return displayMatches;  
    }

    /**
     * Creates the container to display all users the current user is matched with
     * @param {User} user - the current user
     * @param {User[]} displayMatches - an array of potential users the current user matches with by preference
     * @returns {Object} - the container with potential users to display to the current user 
     */
    async function displayUsers(user, displayMatches) {
        const displayAllUsers = document.createElement("div");
        for(let i = 0; i < displayMatches.length; ++i) {
            if(user.hasHousing) {
                const newUser = await DisplayHousingHelper.render(user, displayMatches[i], displayMatches[i].housing);
                displayAllUsers.appendChild(newUser);
            }
            else {
                const newUser = await DisplayRoommatesHelper.render(user, displayMatches[i]);
                displayAllUsers.appendChild(newUser);
            }
        }
        return displayAllUsers;
    }

    export {
        findUsersToDisplay,
        displayUsers
    }
// }