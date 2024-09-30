// Import required modules
const express = require('express');
const g4f = require('./dist/index.js'); // Adjust this import if your index.js exports differently
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Define a simple API endpoint for chat
app.post('/api/chat', async (req, res) => {
    try {
        const userInput = req.body.input; // Expecting input from the request body
        if (!userInput) {
            return res.status(400).json({ error: 'Input is required' });
        }

        // Call your GPT-4 functionality from the g4f module
        const response = await g4f.chatCompletion(userInput); // Change this to the actual function from your index.js
        res.json(response); // Return the response from GPT-4
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Define a GET endpoint to check server status
app.get('/api/status', (req, res) => {
    console.log('Server is live and running!'); // Log server status to console
    res.json({ status: 'Server is live!', timestamp: new Date().toISOString() }); // Respond with status message and timestamp
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
