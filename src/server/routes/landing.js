import express from 'express';
const router = express.Router();
import { LandingView } from './LandingView.js';

/**
 * Defines the routes for the Landing Page.
 */

router.get('/', (req, res) => {
    res.send('Welcome to the Landing Page!');
});

export { LandingView, router };
