import { members, bios, displayMembers } from './members.js';

// open member bio popup
const openPopup = (member) => {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('popup').style.display = 'block';
    document.getElementById('popup-name').innerText = bios[member].name;
    document.getElementById('popup-role').innerText = bios[member].role;
    document.getElementById('popup-bio').innerText = bios[member].bio;
}

// close member bio popup
const closePopup = () => {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('popup').style.display = 'none';
}

// add elements to Team Members section
displayMembers(document.getElementById('team-container'));

const rachel  = document.getElementsByClassName('team-member')[members.Rachel],
      gauri   = document.getElementsByClassName('team-member')[members.Gauri],
      kshama  = document.getElementsByClassName('team-member')[members.Kshama],
      ashley  = document.getElementsByClassName('team-member')[members.Ashley],
      overlay = document.getElementById('overlay'),
      popupClose = document.getElementById('popup-close');

// event listeners to open member bio popup
rachel.addEventListener('click', () => openPopup(members.Rachel));
gauri.addEventListener('click',  () => openPopup(members.Gauri));
kshama.addEventListener('click', () => openPopup(members.Kshama));
ashley.addEventListener('click', () => openPopup(members.Ashley));

// event listeners to close member bio popup
overlay.addEventListener('click',  () => closePopup());
popupClose.addEventListener('click',  () => closePopup());