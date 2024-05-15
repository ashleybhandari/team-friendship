import express from 'express';
import bodyParser from 'body-parser'; // For parsing JSON data in POST/PUT requests
import router from './routes/landing.js';

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// General middleware
app.use(bodyParser.json()); // Use bodyParser to parse JSON-formatted request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data with querystring library

// Root route using the landing router
app.use('/', router); // Use the landing router for the root route

// 404 Not Found Middleware for requests that don't match any routes
app.use((req, res) => {
    res.status(404).send("Sorry, can't find that!");
});

// Error handling middleware to catch any server errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    // Handle specific error types more gracefully
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        return res.status(400).send({ error: 'Bad request. Please check your JSON syntax.' });
    }
    // Default error response if specific types are not matched
    res.status(500).send({ error: 'Something broke on our side. Please try again later.' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
