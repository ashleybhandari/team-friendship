export class App {
    constructor() {}

    async render(root) {
        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';
    }

    #navigateTo(view) {}
}