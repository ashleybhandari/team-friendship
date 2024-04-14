export class RadioButton {
    constructor(type="radio") {
        this.type = type;
    }
    
    async render() {
        const radio = document.createElement("input");
        radio.className("radio-button");
        radio.type = this.type;
        return radio;
    }
}