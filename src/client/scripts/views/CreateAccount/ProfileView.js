import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';

// view: create-2
export class ProfileView {
    async render() {
        const profileViewElm = document.createElement('div');
        profileViewElm.id = 'profileView';

        profileViewElm.appendChild(await new ProgressBar(2).render());
        
        // view content

        profileViewElm.appendChild(await new Navigation('create-1', 'create-3').render());

        return profileViewElm;
    }
}