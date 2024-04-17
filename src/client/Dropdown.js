export class Dropdown {
    constructor(width=360, height=34.45, type="dropdown", dropdownElements=[]) {
        this.width = width;
        this.height = height;
        this.type = type;
        this.dropdownElements = dropdownElements;
    }

    // A very basic version of the dropdown, more to come 
    async render() {
        const dropdown = document.createElement("div");
        dropdown.className("dropdown");

        const dropdownButton = document.createElement("button");
        dropdownButton.className("dropdown-button");
        dropdownButton.innerText = "Dropdown input";
        dropdown.appendChild(dropdownButton);

        const dropdownChoices = document.createElement("div");
        dropdownChoices.className("dropdown-choices");
        
        if(dropdownElements !== []) {
            for(let i = 0; i < this.dropdownElements; ++i) {
                const dropdownElement = document.createElement("div");
                dropdownElement.className("dropdown-element");
                dropdownElement.innerText = dropdownElements[i];
                dropdownChoices.appendChild(dropdownElement);
            }
        }

        dropdown.appendChild(dropdownChoices);

        return dropdown;
    }
}