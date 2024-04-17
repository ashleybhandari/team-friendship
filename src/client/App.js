export class App {
    async render(root) {
        const rootElm = document.getElementById(root);
        rootElm.innerHTML = '';
    }

    #navigateTo(view) {}
}