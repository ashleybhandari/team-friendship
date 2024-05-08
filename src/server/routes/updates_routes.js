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

const events = Events.events();

const signInView = new SignInView();
const credView = new CredentialsView();
const profileView = new ProfileView();
const situationView = new HousingSituationView();
const detailsView = new UserDetailsView();

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
