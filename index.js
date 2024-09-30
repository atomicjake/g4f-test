// server.js
const express = require('express');
const { someFunction } = require('./dist/index.js'); // Adjust the import according to your structure

const app = express();
const PORT = process.env.PORT || 3000;

// Define an endpoint with a GET request
app.get('/api/gpt', async (req, res) => {
    try {
        const input = req.query.input; // Get input from query parameters
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
