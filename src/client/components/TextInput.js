import { createElementId } from '../createElementId.js';

export class TextInput {
    constructor(name, type = 'text', width = 275) {
        this.name = name;
        this.type = type;
        this.width = `${width}px`;
    }
    
    async render() {
        const id = createElementId(this.name, 'Input');

        const elm = document.createElement('div');
        elm.classList.add('text-input');

        const label = document.createElement('label');
        label.htmlFor = id;
        label.innerText = this.name;

        const input = document.createElement('input');
        input.classList.add('be-vietnam');
        input.id = id;
        input.name = id;
        input.type = this.type;
        input.style.width = this.width;

        elm.appendChild(label);
        elm.appendChild(input);

        if (this.type === 'password') {
            const container = document.createElement('div');
            const show = document.createElement('span');
            show.id = 'showPassword'
            show.innerText = 'show';
            show.addEventListener('click', () =>
                this.#toggleShowPassword(input.id, show.id)
            );

            container.appendChild(input);
            container.appendChild(show);
            elm.appendChild(container);
        }

        return elm;
    }

    #toggleShowPassword(inputId, showId) {
        const input = document.getElementById(inputId);
        const show = document.getElementById(showId);
        const showPassword = show.innerText === 'show';

        show.innerText = showPassword ? 'hide' : 'show';
        input.type = showPassword ? 'text' : 'password';
    }
}