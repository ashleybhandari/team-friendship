import { User } from "../../../../data/data_structures/User.js";

// Created by Gauri Arvind
// TODO: connect with database and store all 3

export class DisplayManageUsersHelper {
    /**
     * Adds a matched user to the current user's matches
     * @param {User} currUser 
     * @param {User} matchedUser 
     */
    matchUsers(currUser, matchedUser) {
        currUser.matches.push(matchedUser.id);
    }

    /**
     * Adds a rejected user to the current user's rejection list
     * @param {User} currUser 
     * @param {User} rejectUser 
     */
    rejectUsers(currUser, rejectUser) {
        currUser.rejected.push(rejectUser.id);
    }

    /**
     * Adds a liked user to the current user's liked list
     * @param {User} currUser 
     * @param {User} likedUser 
     */
    likedUsers(currUser, likedUser) {
        currUser.liked.push(likedUser.id);
    }
}