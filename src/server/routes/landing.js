import express from 'express';
const router = express.Router();

import { LandingView } from '../views/landing/landingView.js';

/**
 * Defines the routes for the Landing Page.
 */

router.get('/', async (req, res) => {
    try {
        // Create an instance of the LandingView class
        const landingView = new LandingView();
        // Render the landing page view
        const landingPageHTML = await landingView.render();
        // Send the rendered HTML to the client
        res.send(landingPageHTML);
    } catch (error) {
        // Handle any errors that occur during rendering
        console.error("Error rendering landing page:", error);
        res.status(500).send("Internal Server Error");
    }
});
export default router;
