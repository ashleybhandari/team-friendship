
import express from 'express';
const router = express.Router();

import { SignInView } from '../../client/scripts/views/CreateAccount/SignInView.js';
import { CredentialsView } from '../../client/scripts/views/CreateAccount/CredentialsView.js';
import { ProfileView } from '../../client/scripts/views/CreateAccount/ProfileView.js';
import { HousingSituationView } from '../../client/scripts/views/CreateAccount/HousingSituationView.js';
import { UserDetailsView } from '../../client/scripts/views/CreateAccount/UserDetailsView.js';
import { DiscoverView } from '../../client/scripts/views/SignedIn/DiscoverView.js';
import { MatchesView } from '../../client/scripts/views/SignedIn/MatchesView.js';
import { SettingsView } from '../../client/scripts/views/SignedIn/SettingsView.js';
import { AboutView } from '../../client/scripts/views/SignedOut/AboutView.js';
import { LandingView } from '../../client/scripts/views/SignedOut/LandingView.js';
import { Events } from '../../client/scripts/Events.js';

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
const user_id = 'user_0';
const match_id = 'user_1';

router.get('/sign-in', async (req, res) => {
    try {
        const signInHtml = await signInView.render();
        res.send(signInHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering sign-in view' });
    }
});

router.get('/create-account/1', async (req, res) => {
    try {
        const credHtml = await credView.render();
        res.send(credHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering credentials view' });
    }
});

router.get('/create-account/2', async (req, res) => {
    try {
        const profileHtml = await profileView.render();
        res.send(profileHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering the profile view' });
    }
});

router.get('/create-account/3', async (req, res) => {
    try {
        const situationHtml = await situationView.render();
        res.send(situationHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering the housing situation view' });
    }
});

router.get('/create-account/4', async (req, res) => {
    try {
        const detailsHtml = await detailsView.render();
        res.send(detailsHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering the user details view' });
    }
});

// Remaining files after CreateAccount views
// TODO: replace temp ids with database calls
router.get(`/${user_id}/discover`, async (req, res) => {
    try {
        const discoverHtml = await discoverView.render();
        res.send(discoverHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering the discover view' });
    }
});

// General Matches (List)
router.get(`/${user_id}/matches`, async (req, res) => {
    try {
        const matchesHtml = await matchesView.render();
        res.send(matchesHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering the matches list view' });
    }
});

// Matches and Specific User (Profile) - unsure if necessary
router.get(`/${user_id}/matches/${match_id}`, async (req, res) => {
    try {
        const matchesHtml = await matchesView.render();
        res.send(matchesHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering specific user match view' });
    }
});

router.get(`/${user_id}/settings`, async (req, res) => {
    try {
        const settingsHtml = await settingsView.render();
        res.send(settingsHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering the settings view' });
    }
});

router.get('/about', async (req, res) => {
    try {
        const aboutHtml = await aboutView.render();
        res.send(aboutHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering the about view' });
    }
});

router.get('/', async (req, res) => {
    try {
        const landingHtml = await landingView.render();
        res.send(landingHtml);
    } catch (error) {
        res.status(500).json({ error: 'Error rendering the landing page' });
    }
});

events.subscribe('navigateTo', (view, res) => {
    try {
        switch(view) {
            case 'sign-in':
                res.redirect('/sign-in');
                break;
            case 'create-1':
                res.redirect('/create-account/1');
                break;
            case 'create-2':
                res.redirect('/create-account/2');
                break;
            case 'create-3':
                res.redirect('/create-account/3');
                break;
            case 'create-4':
                res.redirect('/create-account/4');
                break;
            case 'discover':
                res.redirect(`/${user_id}/discover`);
                break;
            case 'matches':
                res.redirect(`/${user_id}/matches`);
                break;
            case 'settings':
                res.redirect(`/${user_id}/settings`);
                break;
            case 'about':
                res.redirect('/about');
                break;
            case 'landing':
                res.redirect('/');
                break;
            default:
                throw new Error('Invalid navigation view requested.');
        }
    } catch (error) {
        console.error('Navigation error:', error);
        res.status(404).json({ error: 'Requested page not found.' });
    }
});

// Handling 404 - Not Found for undefined routes
router.use((req, res) => {
    res.status(404).json({ error: 'Page not found. Check the URL and try again.' });
});

// Centralized error handling for 500 - Server Error
router.use((err, req, res, next) => {
    console.error('Server error:', err.stack);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
});

export default router;