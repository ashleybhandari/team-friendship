// Created by Gauri Arvind

// view: 'discover'
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
        const userDescription = document.createElement("div");
        userDescription.id = "user-description";
        const rejectUser = document.createElement("button");
        rejectUser.id = "reject-user";
        const acceptUser = document.createElement("button");
        acceptUser.id = "accept-user";

        leftContainer.appendChild(flagUser);
        leftContainer.appendChild(userProfileImg);
        leftContainer.appendChild(userName);
        leftContainer.appendChild(userSchool);
        leftContainer.appendChild(userDescription);
        leftContainer.appendChild(rejectUser);
        leftContainer.appendChild(acceptUser);

        return leftContainer
    }

    // Creates right container of user housing information
    #createRightContainer() {
        const rightContainer = document.createElement("right-container");

        const aboutUser = document.createElement("div");
        aboutUser.id = "user-about";

        const userAccommodation = document.createElement("div");
        userAccommodation.id = "user-accommodation";
        userAccommodation.innerText = "About me:";
        const userAccommodationLeft = document.createElement("div");
        userAccommodationLeft.id = "user-accommodation-left";
        const userAccommodationRight = document.createElement("div");
        userAccommdationRight.id = "user-accommodation-right";

        const userHouseRent = document.createElement("div");
        userHouseRent.id = "user-house-rent";

        const userHouseAmenities = document.createElement("div");
        userHouseAmenities.id = "user-house-amenities";
        userHouseAmenities.innerText = "Amenities:";

        const userHouseNotes = document.createElement("div");
        userHouseNotes.id = "user-house-notes";
        userHouseNotes.innerText = "Notes:";

        const userHouseImages = document.createElement("div");
        userHouseImages.id = "user-house-images";
        userHouseImages.innerText = "Images:";

        rightContainer.appendChild(aboutUser);

        userAccommodation.appendChild(userAccommodationLeft);
        userAccommodation.appendChild(userAccommodationRight);
        rightContainer.appendChild(userAccommodation);

        rightContainer.appendChild(userHouseRent);
        rightContainer.appendChild(userHouseAmenities);
        rightContainer.appendChild(userHouseNotes);
        rightContainer.appendChild(userHouseImages);

        return rightContainer;
    }

    async render() {
        const dWHVElem = document.createElement("div");
        dWHVElem.id = 'display-with-housing-view';

    // commenting out because errors stop page from rendering
    //     const dWHVContainerElem = document.createElement("div");
    //     dWHVContainerElem.id = 'display-with-housing-container';

    //     // This container has 3 sections: an upper portion, left portion,
    //     // and a right portion. 

    //    // The upper portion, which is focused on a toggle
    //    const upperContainer = this.#createUpperPortion();

    //    // The left container of the page, which includes user info
    //    const leftContainer = this.#createLeftContainer();

    //    // The right container of the page, which includes housing information
    //    const rightContainer = this.#createRightContainer();

    //    dWHVContainerElem.appendChild(upperContainer);
    //    dWHVContainerElem.appendChild(leftContainer);
    //    dWHVContainerElem.appendChild(rightContainer);

    //     dWHVElem.appendChild(dWHVContainerElem);

        return dWHVElem;
    }
}
