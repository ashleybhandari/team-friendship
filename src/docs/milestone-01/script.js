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

// add member info to Team Members section in DOM
displayMembers(document.getElementById('team-container'));

const gauri   = document.getElementsByClassName('team-member')[members.Gauri],
      ashley  = document.getElementsByClassName('team-member')[members.Ashley],
      kshama  = document.getElementsByClassName('team-member')[members.Kshama],
      rachel  = document.getElementsByClassName('team-member')[members.Rachel],
      overlay = document.getElementById('overlay'),
      popupClose = document.getElementById('popup-close');

// open member bio popup when you click on that member
gauri.addEventListener('click',  () => openPopup(members.Gauri));
ashley.addEventListener('click', () => openPopup(members.Ashley));
kshama.addEventListener('click', () => openPopup(members.Kshama));
rachel.addEventListener('click', () => openPopup(members.Rachel));

// close member bio popup when you click the close button or anywhere outside the popup
overlay.addEventListener('click',  () => closePopup());
popupClose.addEventListener('click',  () => closePopup());