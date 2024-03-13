// pseudo enum used to index of each member in 'bios' and
// document.getElementsByClassName('team-member')
const members = {
    Gauri:  0,
    Ashley: 1,
    Kshama: 2,
    Rachel: 3
};

// member pics and bios
const bios = [
    {
        pic:  'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/gauri.jpg',
        name: 'Gauri Arvind',
        role: 'Back-End Developer',
        bio:  'Gauri Arvind is a junior at the University of Massachusetts Amherst majoring in Operations and Information Management and Computer Science as a dual degree candidate. She has previously interned at Liberty Mutual, where she worked with her team as a software engineer to develop a user management system on a company-wide e-signature platform. The platform saved over 650 hours of developer time and was developed with technologies such as Python, HTML, CSS, JavaScript, Miro, Flask, and Git. With an interdisciplinary background, Gauri is experienced with essential skills related to software engineering, product development, data science, business analytics, leadership, and entrepreneurship. As a result of her background, she is also skilled with SQL, MongoDB, R, Tableau, and PowerBI. With her experiences and knowledge, Gauri aims to combine her interests to create social change with technology and entrepreneurship.'
    },
    {
        pic:  'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/ashley.jpg',
        name: 'Ashley Bhandari',
        role: 'Front-End Developer',
        bio:  'Ashley Bhandari is a junior at UMass Amherst studying Computer Science. UMass\'s academically rigorous program has given her extensive knowledge of the many facets of Computer Science. She spent a semester at Candor Technology as a Software Engineering Intern, where she used full stack development with Angular and C#/.NET to upgrade a heavily-used administrative web application. Ashley hopes to use her skills and love of coding to create more applications that will make people\'s lives easier.'
    },
    {
        pic:  'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/kshama.jpg',
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
               an extensive education background in Public Interest Technology, \
               Kshama wants to harness technology to create impactful products  \
               that will promote sustainability and create a better world for   \
               future generations.'
    },
    {
        pic:  'https://raw.githubusercontent.com/ashleybhandari/team-friendship/main/assets/rachel.png',
        name: 'Rachel Lahav',
        role: 'Data Lead',
        bio:  'Rachel Lahav is a Junior studying Computer Science with an interdisciplinary concentration in virtual design at the University of Massachusetts, Amherst. Rachel is currently working at the Berthiaume Center of Entrepreneurship at UMass, and is working to enhance data functionality and a more efficient data management system, as well as focusing on front end design for the website and creating social content. Throughout this experience, Rachel has become proficient in Javascript and HTML/CSS. Rachel also works part time at Xpertesy, a startup currently in beta testing, helping in testing various website features and applications. Rachel has participated in multiple start-ups, and through this has developed knowledge in Python and C++.'
    }
];

// used to append each member's info to the Team Members section
function displayMembers(container) {
    for (let i = 0; i < 4; ++i) {
        let member, img, profile, name, role;

        member = document.createElement('div');
        member.classList.add('team-member');
        
        img = document.createElement('img');
        img.src = bios[i].pic;
        img.alt = `Portrait of ${bios[i].name}`;
        
        profile = document.createElement('div');
        profile.classList.add('profile');
        
        name = document.createElement('div');
        name.classList.add('name');
        name.textContent = bios[i].name;
        
        role = document.createElement('div');
        role.classList.add('role');
        role.textContent = bios[i].role;

        member.appendChild(img);
        member.appendChild(profile);
        profile.appendChild(name);
        profile.appendChild(role);
        container.appendChild(member);
    }
}

Object.freeze(members);
Object.freeze(bios);

export { members, bios, displayMembers };