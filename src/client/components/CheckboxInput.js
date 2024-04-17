export class CheckboxInput {
    constructor(name, checked = false) {
        this.name = name;
        this.checked = checked;
    }
  
    async render() {
        const container = document.createElement('label');
        container.className = 'custom-checkbox';
        container.setAttribute('for', this.name);

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = this.name;
        input.checked = this.checked;

        const checkmark = document.createElement('span');
        checkmark.className = 'checkmark';

        const text = document.createTextNode(` ${this.name}`);

        container.appendChild(input);
        container.appendChild(checkmark);
        container.appendChild(text);

        return container;
    }
}