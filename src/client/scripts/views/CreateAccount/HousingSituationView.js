import { ProgressBar } from '../../components/ProgressBar.js';
import { Navigation } from '../../components/Navigation.js';

// href: create-3
export class HousingSituationView {
    async render() {
        const housingViewElm = document.createElement('div');
        housingViewElm.id = 'housingView';
        
        housingViewElm.appendChild(await new ProgressBar(3).render());
        
        // view content

        // TODO: if need housing, 'create-4-1', otherwise, 'create-4-2'
        housingViewElm.appendChild(await new Navigation('create-2', 'create-4-1').render());

        return housingViewElm;
    }
}