// server.js
const express = require('express');
const { someFunction } = require('./dist/index.js'); // Adjust the import according to your structure

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Log when a request is received
app.use((req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url} at ${new Date().toISOString()}`);
    next(); // Continue to the next middleware/route handler
});

// POST endpoint for /api/gpt
app.post('/api/gpt', async (req, res) => {
    try {
        const input = req.body.input; // Get input from the request body
        const result = await someFunction(input); // Call your function with the input
        console.log(`Processed POST input: ${input}, Result: ${result}`);
        res.json({ result }); // Send the result back as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// GET endpoint for /api/gpt
app.get('/api/gpt', async (req, res) => {
    try {
        const input = req.query.input; // Get input from the query parameters
        const result = await someFunction(input); // Call your function with the input
        console.log(`Processed GET input: ${input}, Result: ${result}`);
        res.json({ result }); // Send the result back as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server and log when it's live
app.listen(PORT, () => {
    console.log(`🚀 Server is live on http://localhost:${PORT}`);
});
