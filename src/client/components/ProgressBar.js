export class ProgressBar {
    constructor (step) {
        this.step = step;
    }
    
    async render() {
        const elm = document.createElement('div');
        elm.classList.add('progress-bar');

        elm.innerHTML = `
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        `;

        Array
            .from(elm.getElementsByTagName('div'))
            .forEach((div, i) => {
                if (i <= this.step - 1) {
                    div.classList.add('completed');
                }
            });

        return elm;
    }
}