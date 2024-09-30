// server.js
const express = require('express');
const { someFunction } = require('./dist/index.js'); // Adjust the import according to your structure

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Define an endpoint
app.post('/api/gpt', async (req, res) => {
    try {
        const input = req.body.input; // Get input from the request body
        const result = await someFunction(input); // Call your function with the input
        res.json({ result }); // Send the result back as JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
