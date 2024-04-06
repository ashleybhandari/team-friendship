// used to add each member's pic/name/role to the Team Members section
function displayMembers(container) {
    BIOS.forEach((bio, i) => {
        let member, img, profile, name, role;

        member = document.createElement('div');
        member.classList.add('team-member');
        // member's index in BIOS and getElementsByClassName('team-member')
        member.setAttribute('data-member-index', i);
        
        img = document.createElement('img');
        img.src = bio.pic;
        img.alt = `Portrait of ${bio.name}`;
        
        profile = document.createElement('div');
        profile.classList.add('profile');
        
        name = document.createElement('div');
        name.classList.add('name');
        name.textContent = bio.name;
        
        role = document.createElement('div');
        role.textContent = bio.role;

        member.appendChild(img);
        member.appendChild(profile);
        profile.appendChild(name);
        profile.appendChild(role);
        container.appendChild(member);
    });
}

// member pics and bios
const BIOS = [
    {
        pic:  'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/members_gauri.jpg',
        name: 'Gauri Arvind',
        role: 'Back-End Developer',
        bio:  'Gauri Arvind is a junior at the University of Massachusetts      \
               Amherst, majoring in operations and information management and   \
               computer science as a dual degree candidate. She has previously  \
               interned at Liberty Mutual, where she worked with her team as a  \
               software engineer to develop a user management system on a       \
               company-wide e-signature platform. The platform saved over 650   \
               hours of developer time and was developed with technologies such \
               as Python, HTML, CSS, JavaScript, Miro, Flask, and Git. With an  \
               interdisciplinary background, Gauri is experienced with          \
               essential skills related to software engineering, product        \
               development, data science, business analytics, leadership, and   \
               entrepreneurship. As a result of her background, she is also     \
               skilled with SQL, MongoDB, R, Tableau, and PowerBI. With her     \
               experiences and knowledge, Gauri aims to combine her interests   \
               to create social change with technology and entrepreneurship.'
    },
    {
        pic:  'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/logo.png', // TODO
        name: 'Isha Bang',
        role: 'All-Rounder',
        bio:  'TBD' // TODO
    },
    {
        pic:  'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/members_ashley.jpg',
        name: 'Ashley Bhandari',
        role: 'Front-End Developer',
        bio:  'Ashley Bhandari is a junior at UMass Amherst studying computer  \
               science. UMass\'s academically rigorous program has given her   \
               extensive knowledge of the many facets of the discipline. She   \
               spent a semester at Candor Technology as a Software Engineering \
               Intern, where she learned about full stack development and      \
               demonstrated her adaptability and great capacity for            \
               self-guidance in an environment with limited support. Ashley is \
               a quick learner, proficient in functional and object-oriented   \
               programming, frameworks, database management, and standard      \
               industry technologies. She specializes in web development but   \
               aims to expand her capabilities to other fields of study, as    \
               well as use her skills and love of coding to find new ways of   \
               making people\'s lives easier and happier.'
    },
    {
        pic:  'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/members_kshama.jpg',
        name: 'Kshama Kolur',
        role: 'Documentation Lead',
        bio:  'Kshama Kolur is a junior at the University of Massachusetts      \
               Amherst who is majoring in computer science. So far, she has     \
               completed a rigorous CS curriculum that covers the foundations   \
               of software engineering and has mastered how to efficiently      \
               apply them to code. She has not only learned Python proactively  \
               on her own, but also has many impressive school projects under   \
               her belt that have utilized many different programming           \
               languages—such as Java, C, Javascript, and Typescript—which have \
               molded her into an excellent programmer with great               \
               problem-solving abilities. Kshama recently completed her first   \
               Software Developer Internship at AWS during Summer 2023, where   \
               she worked on improving developer productivity by automating     \
               performance tests, enhancing reliability and cost-effectiveness  \
               with her knowledge of CI/CD DevOps tools like Jenkins, and       \
               optimizing resource utilization using various AWS services. With \
               an extensive education background in public interest technology, \
               Kshama wants to harness technology to create impactful products  \
               that will promote sustainability and create a better world for   \
               future generations.'
    },
    {
        pic:  'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/members_rachel.png',
        name: 'Rachel Lahav',
        role: 'Data Lead',
        bio:  'Rachel Lahav is a junior studying computer science with an       \
               interdisciplinary concentration in virtual design at the         \
               University of Massachusetts Amherst. Rachel is currently working \
               at the Berthiaume Center of Entrepreneurship at UMass and is     \
               working to enhance data functionality and a more efficient data  \
               management system, as well as focusing on front-end design for   \
               the website and creating social content. Throughout this         \
               experience, Rachel has become proficient in Javascript and       \
               HTML/CSS. Rachel also works part time at Xpertesy, a startup     \
               currently in beta testing, where she tests various website       \
               features and applications. Rachel has participated in multiple   \
               startups, and through this, she has developed knowledge in       \
               Python and C++.'
    }
];

Object.freeze(BIOS);

export { displayMembers, BIOS };