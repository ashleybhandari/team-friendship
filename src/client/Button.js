export class Button {
    constructor(value, width = 150, type = 'button') {
        this.value = value;
        this.width = `${width}px`;
        this.type = type;
    }
    
    async render() {
        const elm = document.createElement('button');
        elm.classList.add('be-vietnam', 'button');

        elm.innerText = this.value;
        elm.style.width = this.width;
        elm.type = this.type;

        return elm;
    }
}