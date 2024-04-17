export class ProgressBar {
    /**
     * UI component: Progress bar that shows the user's progress during account
     * creation. Steps are (1) credentials, (2) profile setup, (3) "what is
     * your housing situation?, and (4) detailing the situation.
     * @param {number} step Which step the user is currently on (1-4)
     */
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