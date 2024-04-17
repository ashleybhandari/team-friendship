export class DropdownInput {
    constructor(name, elements, width = 306.2) {
        this.name = name;
        this.elements = elements;
        this.width = `${width}px`;
        this.height = '31.6px';
    }

    async render() {
        const elm = document.createElement('div');
        elm.classList.add('dropdown-input');

        const label = document.createElement('label');
        label.htmlFor = this.name;
        label.innerText = this.name;

        const input = document.createElement('select');
        input.classList.add('be-vietnam');
        input.id = this.name;
        input.name = this.name;
        input.style.height = this.height;
        input.style.width = this.width;

        this.elements.forEach((e) => {
            const option = document.createElement('option');
            option.value = e;
            option.innerText = e;
            input.appendChild(option);
        });

        elm.appendChild(label);
        elm.appendChild(input);

        return elm;
    }
}