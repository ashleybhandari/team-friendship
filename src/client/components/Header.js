/**
 * UI component: Logo + "KeyMate" centered at the top of the screen.
 */
export class Header {
    async render() {
        const header = document.createElement('header');
        header.classList.add('header');

        const logo = document.createElement('img');
        logo.src = 'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/logo.png';
        logo.alt = 'KeyMate logo';

        const title = document.createElement('h1');
        title.classList.add('battambang');
        title.innerText = 'KeyMate';

        header.appendChild(logo);
        header.appendChild(title);

        return header;
    }
}