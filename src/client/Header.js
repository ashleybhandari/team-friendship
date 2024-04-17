export class Header {
  constructor(logoSrc, title) {
    this.logoSrc = logoSrc;
    this.title = title;
  }

  render() {
    const header = document.createElement('header');
    header.classList.add('app-header');

    const logoImg = document.createElement('img');
    logoImg.setAttribute('src', this.logoSrc);
    logoImg.setAttribute('alt', `${this.title} Logo`);
    logoImg.classList.add('header-logo');

    const titleDiv = document.createElement('div');
    titleDiv.classList.add('header-title');
    titleDiv.textContent = this.title;

    header.appendChild(logoImg);
    header.appendChild(titleDiv);

    return header;
  }
}
