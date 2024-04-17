export class RadioInput {
    constructor(name, elements) {
        this.name = name;
        this.elements = elements;
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('radio-input');

        this.elements.forEach((e) => {
            const group = document.createElement('div');

            const input = document.createElement('input');
            input.type = 'radio';
            input.name = this.name;
            input.id = e;
            input.value = e;

            const label = document.createElement('label');
            label.htmlFor = e;
            label.innerText = e;

            group.appendChild(input);
            group.appendChild(label);
            elm.appendChild(group);
        });

        return elm;
    }
}