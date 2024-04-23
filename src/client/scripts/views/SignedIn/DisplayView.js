import { User } from "./User.js";
import { DisplayHelper } from "../../helpers/Display/displayHelper.js";

// Created by Gauri Arvind

export class DisplayView {
    /**
     * Renders a page of users to display
     * @param {User} user - the current user
     */
    async render(user) {
        const displayView = document.createElement('div');
        displayView.id = "displayView";
        
        const view = DisplayHelper.displayUsers(user, DisplayHelper.findUsersToDisplay(user));
        displayView.appendChild(view);
        
        return displayView;
    }
}