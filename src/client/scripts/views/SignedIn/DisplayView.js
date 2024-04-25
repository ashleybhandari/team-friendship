import { User } from "../../../data/data_structures/User.js";
import { findUsersToDisplay, displayUsers } from "../../helpers/Display/displayHelper.js";
import { users } from '../../../data/MockData.js';

// Created by Gauri Arvind
// not in use

export class DisplayView {
    #displayView = null;

    /**
     * Renders a page of users to display
     */
    async render() {
        this.#displayView = document.createElement('div');
        displayView.id = "display-view";

        console.log("Created div");
        
        const currUser = users[5]; // current mock user who is looking for housing
        console.log("Got user " + currUser);
        const currUserMatches =  findUsersToDisplay(currUser);
        console.log("Matches found");
        const view = displayUsers(currUser, currUserMatches);
        console.log("View made")
        displayView.appendChild(view);
        
        return this.#displayView;
    }
}