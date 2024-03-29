import { displayMembers, BIOS } from './members.js';


/* * * * * * * * * *  * * Team Members * * * * * * * * *  * * */

// open member popup
function openPopup(event, member) {
    event.preventDefault();
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display   = 'block';
    document.getElementById('popup-name').innerText = BIOS[member].name;
    document.getElementById('popup-role').innerText = BIOS[member].role;
    document.getElementById('popup-bio').innerText  = BIOS[member].bio;
}

// close member popup
function closePopup(event) {
    event.preventDefault();
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display   = 'none';
}

// add member pics/roles to Team Members section
displayMembers(document.getElementById('team-container'));

// open member popup when you click on a team member
Array
    .from(document.getElementsByClassName('team-member'))
    .forEach((member) => member.addEventListener(
        'click',
        (e) => openPopup(e, member.getAttribute('data-member-index'))
    )
);

// close member popup when you click the close button or outside of popup
['overlay', 'popup-close'].forEach((id) => 
    document
        .getElementById(id)
        .addEventListener('click', (e) => closePopup(e))
);


/* * * * * * * * * *  * * * Scrolling * * * * * * * * * *  * * */

const navbar = document.getElementsByTagName('nav')[0],
      backToTop = document.getElementById('to-top'),
      top = navbar.offsetTop;

// when you scroll, make navbar sticky and show 'to top' button
window.onscroll = () => {
    const scrolled = window.scrollY >= top;
    scrolled
        ? navbar.classList.add('sticky')
        : navbar.classList.remove('sticky');
    backToTop.style.display = scrolled ? 'flex' : 'none';
};

// scroll when you click on a link in the navbar
document
    .querySelectorAll('nav a')
    .forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const id = anchor.getAttribute('href').slice(1);
            document
                .getElementById(id)
                .scrollIntoView();
            window.location.hash = id;
        });
    });

// scroll to top when you click the 'to top' button
backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    history.pushState("", document.title, window.location.pathname
        + window.location.search);
});



