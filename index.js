const express = require('express');
const { generateResponse } = require('./dist/index.js');  // Import the function from your g4f package

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

/**
 * Example API endpoint using g4f functionality
 * @route POST /api/use-g4f
 * @body {string} input - User input to process with g4f
 * @returns {json} - Returns the processed result from g4f
 */
app.post('/api/use-g4f', async (req, res) => {
  const { input } = req.body;

  if (!input) {
    return res.status(400).json({ error: "Please provide input" });
  }

  try {
    const result = await generateResponse(input); // Call the function from your g4f package
    return res.json({ result });
  } catch (error) {
    return res.status(500).json({ error: error.message || "An error occurred while processing" });
  }
});

/**
 * Test endpoint to check if server is alive
 * @route GET /
 * @returns {json} - Returns a message confirming the server is running
 */
app.get('/', (req, res) => {
  res.json({ message: 'Server is alive' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
