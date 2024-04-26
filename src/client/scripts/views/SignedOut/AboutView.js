// created by Rachel Lahav
import { BIOS } from '../../../../docs/milestone-01/members.js';

// view: about
export class AboutView {
    /**
     * About view. Contains contact information, our mission statement, and bios
     * of our team members.
     * @returns {Promise<HTMLDivElement>}
     */
    async render() {
        const aboutViewElm = document.createElement('div');
        aboutViewElm.id = 'aboutView';

        // contact info
        const contact = document.createElement('div');
        contact.classList.add('contact', 'section');
        contact.innerHTML = `
        <p>Contact Us</p>
        <a class="battambang" href="mailto:notReal@email.com">team@keymate.com</a>
        `

        // section: mission statement
        const mission = document.createElement('div');
        mission.classList.add('section');
        mission.innerHTML = `
        <h2 class="header battambang">Mission</h3>
        <p>
            KeyMate is a web application dedicated to helping students find roommates and housing.
            Akin to a dating app, each user creates a profile in which they describe their traits,
            habits, and preferences surrounding roommates and housing. KeyMate uses this
            information to tailor each user's feed. This way, users can tell whether they like each
            other at a glance; if two users are compatible and interested in each other, they can
            exchange contact information. Our team hopes that this candid and holistic approach to
            finding potential roommates and housing will help mitigate the housing crisis and
            relieve students' stress.
        </p>
        `;

        // section: team members
        const team = document.createElement('div');
        team.classList.add('section');
        team.innerHTML = `<h2 class="header battambang">The team</h2>`;

        // container for team members
        const teamContainer = document.createElement('div');
        teamContainer.id = 'teamContainer';
        team.appendChild(teamContainer);

        // adds members to container
        BIOS.forEach((e) => {
            // pic, name, and role
            const pic = document.createElement('div');
            pic.classList.add('pic-role');
            pic.innerHTML = `
            <img src="${e.pic}" alt="Portrait of ${e.name}">
            <h3 class="name battambang">${e.name}</h3>
            <p class="role">${e.role}</p>
            `;

            // bio
            const bio = document.createElement('div');
            bio.classList.add('bio');
            bio.innerHTML = `<p>${e.bio}</p>`

            teamContainer.appendChild(pic);
            teamContainer.appendChild(bio);
        });

        aboutViewElm.appendChild(contact);
        aboutViewElm.appendChild(mission);
        aboutViewElm.appendChild(team);

        return aboutViewElm;
    }
}

