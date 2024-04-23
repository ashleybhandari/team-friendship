import { User } from "./User.js";
import { DisplayHousingHelper } from "./displayHousingHelper.js";
import { DisplayRoommatesHelper } from "./displayRoommatesHelper.js";
// import { db } from "./src/client/data/DatabasePouchDB.js"; - will finalize once pushed in

// Created by Gauri Arvind

export class DisplayHelper {
    /**
     * Creates the automatically filtered page of users based on the logged in user's preferences
     * @param {User} user - the User object associated with the current user
     * @returns {User[]} - the array of User objects to be displayed
     */
    findUsersToDisplay(user) {
        let potentialMatches = [];
        let displayMatches = [];
        if(user.hasHousing) {
            // TODO: get all users with housing in database - if possible
            // potentialMatches = db.getAllHousings();
            potentialMatches = [];
        }
        else {
            // TODO: get all preferred users in database
            // potentialMatches = db.getAllPreferences();
            potentialMatches = [];
        }

        for(let i = 0; i < potentialMatches.length; ++i) {
            // Currently, this functionality only considers if a user's character matches and 
            // the user is not on the rejected list
            if(JSON.stringify(potentialMatches[i].character) === JSON.stringify(user.character) && !user.rejected.includes(potentialMatches[i].id)) {
                displayMatches.push(potentialMatches[i]);
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
    displayUsers(user, displayMatches) {
        for(let i = 0; i < displayMatches.length; ++i) {
            if(user.hasHousing) {
                return DisplayHousingHelper.render(user, displayMatches[i], displayMatches[i].housing);
            }
            else {
                return DisplayRoommatesHelper.render(user, displayMatches[i]);
            }
        }
    }
}