// view: 'about'
//Rachel

import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';

export class AboutView {
    #viewContainer = null;
    #events = null;

    constructor() {
        this.#events = Events.events();
    }

    async render() {
        const aboutViewElm = document.createElement('div');
        aboutViewElm.id = 'aboutView';

        const content = document.createElement('div');
        content.innerHTML = `
            <section id="contact">
                <h2>Contact Us</h2>
                <a href="#" id="email-link">keymateteam@gmail.com</a>
            </section>

            <section id="mission">
                <h2>Our Mission</h2>
                <p>In 2023, UMass announced that it would no longer be able to guarantee on-campus housing for all undergraduates who requested it. The room selection process ended early, leaving 900 students without housing for the fall. These students rushed to the UMass Off Campus Housing website, Facebook Marketplace, Instagram, Discord, and more to blindly message usernames in hopes of coming upon compatible housing and roommates.</p>
                <p>KeyMate was born to ease this effort by centralizing the search process and presenting students with important data upfront. Akin to a dating app, each user creates a profile in which they describe their traits, habits, and preferences surrounding roommates and housing. KeyMate uses this information to tailor each user's feed. This way, users can tell whether they like each other at a glance; if two users are compatible and interested in each other, they can then safely message within the web application before exchanging contact information.</p>
                <p>Our team hopes that this candid and holistic approach to finding potential roommates and housing will help mitigate the housing crisis and relieve students' stress. The scope of the project is currently limited to UMass Amherst, but should it find success, we hope to expand it to other schools.</p>
            </section>

            <section id="team">
                <h2>The Team</h2>
                <div class="Team-member">
                    <img src="Rachel pic.png" alt="Rachel">
                    <p>Rachel Lahav - Data Lead</p>
                </div>
                <div class="team-member">
                    <img src="Ashley pic.png" alt="Ashley">
                    <p>Ashley Bhandari - Front-end Developer</p>
                </div>
                <div class="Team-member">
                    <img src="Kshama pic.png" alt="Kshama">
                    <p>Kshama Kolur - Documentation Lead</p>
                </div>
                <div class="Team-member">
                    <img src="Gauri pic.png" alt="Gauri">
                    <p>Gauri Arvind - Bacn-end Developer</p>
                </div>
                <div class="Team-member">
                    <img src="Isha pic.png" alt="Isha">
                    <p>Isha Bang - All rounder</p>
                </div>
            
            </section>
        `;
        aboutViewElm.appendChild(content);

        // Add event listener for email link
        const emailLink = content.querySelector('#email-link');
        emailLink.addEventListener('click', () => {
            window.location.href = `mailto:${emailLink.textContent}`;
        });

        return aboutViewElm;
    }
}
