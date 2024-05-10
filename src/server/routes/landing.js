
import express from 'express';
const router = express.Router();

import {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  getMatches,
  removeMatch
} from '../data/DatabasePouchDB.js'; 

import { SignInView } from '../CreateAccount/SignInView.js';
import { CredentialsView } from '../CreateAccount/CredentialsView.js';
import { ProfileView } from '../CreateAccount/ProfileView.js';
import { HousingSituationView } from '../CreateAccount/HousingSituationView.js';
import { UserDetailsView } from '../CreateAccount/UserDetailsView.js';
import { Events } from '../../Events.js';
import { DiscoverView } from '../../client/scripts/views/SignedIn/DiscoverView.js';
import { MatchesView } from '../../client/scripts/views/SignedIn/MatchesView.js';
import { SettingsView } from '../../client/scripts/views/SignedIn/SettingsView.js';
import { AboutView } from '../../client/scripts/views/SignedOut/AboutView.js';
import { LandingView } from '../../client/scripts/views/SignedOut/LandingView.js';

const events = Events.events();

const signInView = new SignInView();
const credView = new CredentialsView();
const profileView = new ProfileView();
const situationView = new HousingSituationView();
const detailsView = new UserDetailsView();
const discoverView = new DiscoverView();
const matchesView = new MatchesView();
const settingsView = new SettingsView();
const aboutView = new AboutView();
const landingView = new LandingView();

// Initialized users (to be replaced with PouchDB)
const user_id = 0;
const match_id = 1;

router.get('/sign-in', async (req, res) => {
    try {
        const signInHtml = await signInView.render();
        res.send(signInHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/create-account/1', async (req, res) => {
    try {
        const credHtml = await credView.render();
        res.send(credHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/create-account/2', async (req, res) => {
    try {
        const profileHtml = await profileView.render();
        res.send(profileHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/create-account/3', async (req, res) => {
    try {
        const situationHtml = await situationView.render();
        res.send(situationHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/create-account/4', async (req, res) => {
    try {
        const detailsHtml = await detailsView.render();
        res.send(detailsHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Remaining files after CreateAccount views
// TODO: replace temp ids with database calls
router.get(`/${user_id}/discover`, async (req, res) => {
    try {
        const discoverHtml = await discoverView.render();
        res.send(discoverHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// General Matches (List)
router.get(`/${user_id}/matches`, async (req, res) => {
    try {
        const matchesHtml = await matchesView.render();
        res.send(matchesHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// // Matches and Specific User (Profile) - unsure if necessary
// router.get(`/${user_id}/matches/${match_id}`, async (req, res) => {
//     try {
//         const matchesHtml = await matchesView.render();
//         res.send(matchesHtml);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

router.get(`/${user_id}/settings`, async (req, res) => {
    try {
        const settingsHtml = await settingsView.render();
        res.send(settingsHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/about', async (req, res) => {
    try {
        const aboutHtml = await aboutView.render();
        res.send(aboutHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const landingHtml = await landingView.render();
        res.send(landingHtml);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

events.subscribe('navigateTo', (view) => {
    switch(view) {
        case 'sign-in':
            router.redirect('/sign-in');
            break;
        case 'create-1':
            router.redirect('/create-account/1');
            break;
        case 'create-2':
            router.redirect('/create-account/2');
            break;
        case 'create-3':
            router.redirect('/create-account/3');
            break;
        case 'create-4':
            router.redirect('/create-account/4');
            break;
        default:
            router.redirect('/404');
            break;
    }
});

export default router;

