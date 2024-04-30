import express from 'express';
import bodyParser from 'body-parser'; // For parsing JSON data in POST/PUT requests
import userRouter from './routes/users.js';
import matchRouter from './routes/matches.js';
import housingRouter from './routes/housing.js';

const app = express();
const PORT = 3000;

// General middleware
app.use(bodyParser.json()); // Use bodyParser to parse JSON-formatted request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data with querystring library

// Basic route directly in server.js
app.get('/', (req, res) => {
    res.send('Welcome to the API Server!');
});

// Modular routes for different aspects of the application
app.use('/api/users', userRouter);       // Handles all user-related API requests
app.use('/api/matches', matchRouter);    // Handles match-related interactions
app.use('/api/housing', housingRouter);  // Manages housing data operations

// 404 Not Found Middleware for requests that don't match any routes
app.use((req, res) => {
    res.status(404).send("Sorry, can't find that!");
});

// Error handling middleware to catch any server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});