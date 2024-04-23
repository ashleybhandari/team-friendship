import { Button } from '../../components/Button.js';
import { Events } from '../../Events.js';

// view: about
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
            <section id="contact" style="text-align: center;">
                <h2>Contact Us</h2>
                <div id="email-button-container"></div>
            </section>

            <section id="mission" style="text-align: center;">
                <h2>Our Mission</h2>
                <p>In 2023, UMass announced that it would no longer be able to guarantee on-campus housing for all undergraduates who requested it. The room selection process ended early, leaving 900 students without housing for the fall. These students rushed to the UMass Off Campus Housing website, Facebook Marketplace, Instagram, Discord, and more to blindly message usernames in hopes of coming upon compatible housing and roommates.</p>
                <p>KeyMate was born to ease this effort by centralizing the search process and presenting students with important data upfront. Akin to a dating app, each user creates a profile in which they describe their traits, habits, and preferences surrounding roommates and housing. KeyMate uses this information to tailor each user's feed. This way, users can tell whether they like each other at a glance; if two users are compatible and interested in each other, they can then safely message within the web application before exchanging contact information.</p>
                <p>Our team hopes that this candid and holistic approach to finding potential roommates and housing will help mitigate the housing crisis and relieve students' stress. The scope of the project is currently limited to UMass Amherst, but should it find success, we hope to expand it to other schools.</p>
            </section>

            <section id="team" style="text-align: center;">
                <h2>The Team</h2>
                <div class="team-member">
                    <div class="member-info">
                    <img src="https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/members_rachel.png" alt="Rachel">                        <p>Rachel Lahav - Data Lead</p>
                    </div>
                    <div class="member-bio">
                        <p>Rachel Lahav is a junior studying computer science with an interdisciplinary concentration in virtual design at the University of Massachusetts Amherst. Rachel is currently working at the Berthiaume Center of Entrepreneurship at UMass and is working to enhance data functionality and a more efficient data management system, as well as focusing on front-end design for the website and creating social content. Rachel has participated in multiple startups, including her current part-time work at Xpertesy (currently in beta testing) where she tests various website features and applications.</p>
                    </div>
                </div>
                <div class="team-member">
                    <div class="member-info">
                        <img src="https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/members_Ashley.png" alt="Ashley">
                        <p>Ashley Bhandari - Front-end Developer</p>
                    </div>
                    <div class="member-bio">
                        <p>Ashley Bhandari is a junior at UMass Amherst studying computer science.. She spent a semester at Candor Technology as a Software Engineering Intern, where she learned about full stack development and demonstrated her adaptability and great capacity for self-guidance in an environment with limited support. Ashley is a quick learner, proficient in functional and object-oriented programming, frameworks, database management, and standard industry technologies. She specializes in web development but aims to expand her capabilities to other fields of study, as well as use her skills and love of coding to find new ways of making people's lives easier and happier.</p>
                    </div>
                </div>
                <div class="team-member">
                    <div class="member-info">
                        <img src="https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/members_kshama.jpg" alt="Kshama">
                        <p>Kshama Kolur - Documentation Lead</p>
                    </div>
                    <div class="member-bio">
                        <p>Kshama Kolur is a junior at the University of Massachusetts Amherst who is majoring in computer science. She has many impressive school projects under her belt which have molded her into an excellent programmer with great problem-solving abilities. Kshama recently completed her first Software Developer Internship at AWS, where she worked on improving developer productivity by automating performance tests, enhancing reliability and cost-effectiveness, and optimizing resource utilization. Kshama wants to harness technology to create impactful products that will promote sustainability and create a better world for future generations.</p>
                    </div>
                </div>
                <div class="team-member">
                    <div class="member-info">
                        <img src="https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/members_gauri.png" alt="Gauri">
                        <p>Gauri Arvind - Back-end Developer</p>
                    </div>
                    <div class="member-bio">
                        <p>Gauri Arvind is a junior at the University of Massachusetts Amherst, majoring in operations and information management and computer science as a dual degree candidate. She has previously interned at Liberty Mutual, where she worked with her team as a software engineer to develop a user management system on a company-wide e-signature platform. With an interdisciplinary background, Gauri is experienced with essential skills related to software engineering, product development, data science, business analytics, leadership, and entrepreneurship. With her experiences and knowledge, Gauri aims to combine her interests to create social change with technology and entrepreneurship.</p>
                    </div>
                </div>
                <div class="team-member">
                    <div class="member-info">
                        <img src="Isha pic.png" alt="Isha">
                        <p>Isha Bang - All rounder</p>
                    </div>
                    <div class="member-bio">
                        <p>Isha Bang is a sophomore computer science major</p>
                    </div>
                </div>
            </section>
        `;
        aboutViewElm.appendChild(content);

        // Create the email button
        const emailButton = new Button('keymateteam@gmail.com');
        const emailButtonElement = await emailButton.render();
        emailButtonElement.classList.add('email-button');
        emailButtonElement.style.width = '200px';
        emailButtonElement.addEventListener('click', () => {
            window.location.href = `mailto:${emailButtonElement.textContent}`;
        });

        // Add the email button to the container
        const emailButtonContainer = content.querySelector('#email-button-container');
        emailButtonContainer.appendChild(emailButtonElement);

        return aboutViewElm;
    }
}

