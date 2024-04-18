// This page will have all functions related with displaying housing,
// given their similar functionality. This will be integrated with the 
// DisplayWithHousingView.js and DisplayWithoutHousingView.js files. 

export class DisplayHousing {
    // Constructor: This contains an object with all user info for their housing information.
    // name: the user's name (string)
    // age: the user's age (int)
    // schooling: the user's major and college (string)
    // userDescription: a bio of the user (string)
    // userCharacteristics: characteristics of the user (string array)
    // accomodation: the user's accomodation (string)
    // rentIncludes: a list of what the rent price includes (string array)
    // amenities: a list of the amenities within the housing (string array)
    // notes: additional notes about the housing (string)
    // images: a list of images of the user's housing (string array)
    constructor(name, age, schooling, userDescription, userCharacteristics, accomodation, rentIncludes, amenities, notes, images) {
        this.name = name;
        this.age = age;
        this.schooling = schooling;
        this.userDescription = userDescription;
        this.userCharacteristics = userCharacteristics;
        this.accomodation = accomodation;
        this.rentIncludes = rentIncludes;
        this.amenities = amenities;
        this.notes = notes;
        this.images = images;
    }

    // Function 1: Toggles between housing and no housing based on user profile
    // Input: none (is an event listener, default will be with housing)
    // Output: none
    toggleHousing() {
        const toggle = document.getElementById("toggle-switch");
        if(toggle.checked) {
            // do something - but what about the other way?
        }
    }

    // Function 2: Takes an array of housing information and creates buttons out of it
    // Inputs: String array, type of styling (either for searcher or user characteristics)
    // Output: none

    // TODO: so apparently the other side has different formats, so different helper functions
    // will need to be made. I want to finish this and the mock data by tmrw.

    // Function 3: Creates the left side of user information and adds to div
    // Inputs: user object
    // Outputs: none

    // Function 4: Creates the right side of user information and adds to div

}