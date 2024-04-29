import { findUsersToDisplay, displayUsers } from "../../helpers/Display/displayHelper.js";
import { getCurrentUser } from '../../../data/MockBackend.js';

// Created by Gauri Arvind
// doesn't work - not in use

export class DisplayView {
    #displayView = null;

    /**
     * Renders a page of users to display
     */
    async render() {
        this.#displayView = document.createElement('div');
        displayView.id = "display-view";

        console.log("Created div");
        
        const currUser = await getCurrentUser(); // current mock user who is looking for housing
        console.log("Got user " + currUser);
        const currUserMatches =  findUsersToDisplay(currUser);
        console.log("Matches found");
        const view = displayUsers(currUser, currUserMatches);
        console.log("View made")
        displayView.appendChild(view);
        
        return this.#displayView;
    }
}