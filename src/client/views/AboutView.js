import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';

export class AboutView {
    async render() {
        const aboutView = document.createElement('div');
        aboutView.id = 'aboutView';
        
        return aboutView;
    }
}
