import express from 'express';
const app = express();
const PORT = 3000;

// Middleware for parsing JSON - only necessary if you're handling JSON data in POST/PUT requests
// app.use(express.json());
app.use(express.urlencoded({ extended: true })); // This is useful only if you're handling URL-encoded data in POST/PUT requests

// Import routes
import landingRoute from './routes/landing.js';

// Use modular route for the landing page
app.use('/landing', landingRoute);

// Redirect root URL to the landing page
app.get('/', (req, res) => {
    res.redirect('/landing');
});

// 404 Not Found Middleware (after all routes)
// It handles any requests that don't match the defined routes
app.use((req, res) => {
    res.status(404).send("Sorry, can't find that!");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
