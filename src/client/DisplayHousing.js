// This page will have all functions related with displaying housing,
// given their similar functionality. This will be integrated with the 
// DisplayWithHousingView.js and DisplayWithoutHousingView.js files. 
import { User } from "./User.js";
import { DisplayWithHousingView  as displayWith} from "./DisplayWithHousingView.js";
import { DisplayWithoutHousingView as displayWithout} from "./DisplayWithoutHousingView.js";

// Created by Gauri Arvind

export class DisplayHousing {

    // Function 1: Toggles between housing and no housing based on user profile
    // Input: none (is an event listener, default will be with housing)
    // Output: none
    toggleHousing() {
        // Note: dunno whether we have a false or true, would need to check
        const toggle = document.getElementById("toggle-switch");
        if(toggle.checked) {
            displayWith.render();
        }  
        else {
            displayWithout.render();
        } 
    }

    // Function 2: Takes an array of housing information and creates buttons out of it
    // Inputs: String array, type of styling (either for searcher or user characteristics)
    // Output: none
    createViewButtons(parts, type) {
        if(type === "") {
            console.log("Missing type - please specify type of button");
        }
        else {
            if(type === "filter") {
                const viewButtonElement = document.createElement("div");
                for(let i = 0; i < parts.length; ++i) {
                    const part = document.createElement("button");
                    part.classList("display-filter-button");
                    viewButtonElement.appendChild(part);
                }
                return viewButtonElement;
            }
            else if(type === "personal") {
                const viewButtonElement = document.createElement("div");
                for(let i = 0; i < parts.length; ++i) {
                    const part = document.createElement("button");
                    part.classList("display-personal-button");
                    viewButtonElement.appendChild(part);
                }
                return viewButtonElement;
            }
            else {
                console.log("Invalid type of button.");
            }
        }
    }

    // TODO: so apparently the other side has different formats, so different helper functions
    // will need to be made. I want to finish this and the mock data by tmrw.

    // Function 3: Creates the left side of user information and adds to div
    // Inputs: user object, type (string)
    // Outputs: none
    displayUserLeft(user, type) {
        if(type === "") {
            console.log("Please input a type.");
        }
        else {
            if(type === "housing") {
                // TODO: How do I associate document with the right file?
                userProfileImage = displayWith.getElementById("user-profile-image");
                userProfileImage.src = user.pic; // TODO: unsure if src routes to photo

                userName = document.getElementById("user-name");
                userName.innerText = user.name + " " + user.age;

                userSchool = displayWith.getElementById("user-school");
                userSchool.innerText = user.schooling.major + "\n" + user.schooling.level + "\n" + user.schooling.school;

                userDescription = displayWith.getElementById("user-description");
                userDescription.innerText = user.description;
            }
            else if(type === "roommates") {
                userProfileImage = displayWith.getElementById("user-profile-image");
                userProfileImage.src = user.pic; // TODO: unsure if src routes to photo

                userName = document.getElementById("user-name");
                userName.innerText = user.name + " " + user.age;

                userSchool = displayWith.getElementById("user-school");
                userSchool.innerText = user.schooling.major + "\n" + user.schooling.level + "\n" + user.schooling.school;
            }
            else{
                console.log("Invalid type.");
            }
        }
    }

    // Function 4: Creates the right side of user information and adds to div
    // TODO: Function incomplete, accommodation has two m's
    dispayUserRight(user, type) {
        if(type === "") {
            console.log("Please input a type.");
        }
        else {
            if(type === "housing") {
                // TODO: How do I associate document with the right file?
                userAccommodation = displayWith.getElementById("user-profile-image");
                userProfileImage.src = user.pic; // TODO: unsure if src routes to photo

                userName = document.getElementById("user-name");
                userName.innerText = user.name + " " + user.age;

                userSchool = displayWith.getElementById("user-school");
                userSchool.innerText = user.schooling.major + "\n" + user.schooling.level + "\n" + user.schooling.school;

                userDescription = displayWith.getElementById("user-description");
                userDescription.innerText = user.description;
            }
            else if(type === "roommates") {
                userProfileImage = displayWith.getElementById("user-profile-image");
                userProfileImage.src = user.pic; // TODO: unsure if src routes to photo

                userName = document.getElementById("user-name");
                userName.innerText = user.name + " " + user.age;

                userSchool = displayWith.getElementById("user-school");
                userSchool.innerText = user.schooling.major + "\n" + user.schooling.level + "\n" + user.schooling.school;
            }
            else{
                console.log("Invalid type.");
            }
        }
    }
}