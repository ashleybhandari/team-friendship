export class CreateCredentialsView {
    async render() {
        const createCredView = document.createElement('div');
        createCredView.id = 'credentialsView';

        return createCredView;
    }
}