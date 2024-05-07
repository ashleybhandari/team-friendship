import express from 'express';
const router = express.Router();

/**
 * Defines the routes for the Landing Page.
 */

router.get('/', (req, res) => {
    res.send('Welcome to the Landing Page!');
});

export default router;
