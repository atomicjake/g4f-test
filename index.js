// server.js
const express = require('express');
const { someFunction } = require('./dist/index.js'); // Import the function from your module

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Log when a request is received
app.use((req, res, next) => {
    console.log(`Received ${req.method} request on ${req.url} at ${new Date().toISOString()}`);
    next(); // Continue to the next middleware/route handler
});

// GET endpoint for /api/gpt
app.get('/api/gpt', async (req, res) => {
    try {
        const input = req.query.input; // Get input from the query parameters

        // Validate input
        if (!input || typeof input !== 'string' || input.trim() === '') {
            return res.status(400).json({ error: 'Invalid input: input is required and should be a non-empty string.' });
        }

        // Call your function with the input
        const result = await someFunction(input);
        
        // Log the processed input and result
        console.log(`Processed GET input: ${input}, Result: ${result}`);
        
        // Send the result back as JSON
        res.json({ result });
    } catch (error) {
        console.error(`GET error: ${error.message}`);
        res.status(500).json({ error: error.message }); // Send detailed error message
    }
});

// Start the server and log when it's live
app.listen(PORT, () => {
    console.log(`🚀 Server is live on http://localhost:${PORT}`);
});
