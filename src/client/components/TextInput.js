import { createElementId } from '../createElementId.js';

export class TextInput {
    /**
     * UI component: Standard text input
     * @param {string} name - Label for the input element
     * @param {string} [type="text"] - Input type (text/password)
     * @param {number} [width=275] - Input width
     */
    constructor(name, type = 'text', width = 275) {
        this.name = name;
        this.type = type;
        this.width = `${width}px`;
    }
    
    async render() {
        const id = createElementId(this.name, 'Input');

        const elm = document.createElement('div');
        elm.classList.add('text-input');

        // input label
        const label = document.createElement('label');
        label.htmlFor = id;
        label.innerText = this.name;

        // input
        const input = document.createElement('input');
        input.classList.add('be-vietnam');
        input.id = id;
        input.name = id;
        input.type = this.type;
        input.style.width = this.width;

        elm.appendChild(label);
        elm.appendChild(input);

        // if input type is password, adds a "show" button that toggles
        // showing/hiding the inputted text.
        if (this.type === 'password') {
            const container = document.createElement('div');
            const show = document.createElement('span');
            show.id = 'showPassword'
            show.innerText = 'show';

            show.addEventListener('click', (e) => {
                e.preventDefault();
                this.#toggleShowPassword(input.id, show.id);
            });

            container.appendChild(input);
            container.appendChild(show);
            elm.appendChild(container);
        }

        return elm;
    }

    /**
     * Toggles showing/hiding input text (for "password" inputs).
     * @param {string} inputId 
     * @param {string} showId 
     */
    #toggleShowPassword(inputId, showId) {
        const input = document.getElementById(inputId);
        const show = document.getElementById(showId);
        const showPassword = show.innerText === 'show';

        show.innerText = showPassword ? 'hide' : 'show';
        input.type = showPassword ? 'text' : 'password';
    }
}