import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

// Created by Gauri Arvind
// Note: may not need header and footer

export class DisplayWithHousingView {
    // A toggle for viewing users with or without housing. This might
    // become a component to reduce code in file.
    #createUpperPortion() {
        // Creates the housing toggle
        const housingToggle = document.createElement("div");

        const housingToggleLabel = document.createElement("label");
        housingToggleLabel.className("switch");

        const housingToggleSwitch = document.createElement("input");
        housingToggleSwitch.type = "checkbox";
        housingToggleSwitch.value = "false";
        
        const housingToggleSlider = document.createElement("div");
        housingToggleSlider.className("slider-round");
        const withHousing = document.createElement("span");
        withHousing.innerText = "Housing";
        const withoutHousing = document.createElement("span");
        withHousing.innerText = "Roommates";

        housingToggleSlider.appendChild(withHousing);
        housingToggleSlider.appendChild(withoutHousing);

        housingToggleLabel.appendChild(housingToggleSwitch);
        housingToggleLabel.appendChild(housingToggleSlider);

        housingToggle.appendChild(housingToggleLabel);


        // Creates the filter
        const resultsFilter = createElement("div");
        resultsFilter.id("results-filter");

        // Appends filter and toggle in upper portion
        const upper = createElement("div");
        upper.appendChild(housingToggle);
        upper.appendChild(resultsFilter);

        return upper;
    }   

    // Creates left container of user profile information
    #createLeftContainer() {
        const leftContainer = document.createElement("left-container");

        const flagUser = document.createElement("div");
        flagUser.id = "flag-user";
        const userProfileImg = document.createElement("img");
        userProfileImg.id = "user-profile-image";
        const userName = document.createElement("div");
        userName.id = "user-name";
        const userSchool = document.createElement("div");
        userSchool.id = "user-school";
        const rejectUser = document.createElement("button");
        rejectUser.id = "reject-user";
        const acceptUser = document.createElement("button");
        acceptUser.id = "accept-user";

        leftContainer.appendChild(flagUser);
        leftContainer.appendChild(userProfileImg);
        leftContainer.appendChild(userName);
        leftContainer.appendChild(userSchool);
        leftContainer.appendChild(rejectUser);
        leftContainer.appendChild(acceptUser);

        return leftContainer
    }

    // Creates right container of user housing information
    #createRightContainer() {
        const rightContainer = document.createElement("right-container");

        const aboutUser = document.createElement("div");
        aboutUser.id = "user-about";

        const userDescription = document.createElement("div");
        userDescription.id = "user-description";


        rightContainer.appendChild(aboutUser);
        rightContainer.appendChild(userDescription);

        return rightContainer;
    }

    async render() {
        const dWOHVElem = document.createElement("div");
        dWOHVElem.id = 'display-with-housing-view';

        const headerElm = new Header();

        const dWOHVContainerElem = document.createElement("div");
        dWOHVContainerElem.id = 'display-with-housing-container';

        // This container has 3 sections: an upper portion, left portion,
        // and a right portion. 

        // The upper portion, which is focused on a toggle
        const upperContainer = this.#createUpperPortion();

        // The left container of the page, which includes user info
        const leftContainer = this.#createLeftContainer();

        // The right container of the page, which includes housing information
        const rightContainer = this.#createRightContainer();

        const footerElm = new Footer();

        dWOHVContainerElem.appendChild(upperContainer);
        dWOHVContainerElem.appendChild(leftContainer);
        dWOHVContainerElem.appendChild(rightContainer);

        dWOHVElem.appendChild(await headerElm);
        dWOHVElem.appendChild(dWOHVContainerElem);
        dWOHVElem.appendChild(await footerElm);

        return dWOHVElem;
    }
}