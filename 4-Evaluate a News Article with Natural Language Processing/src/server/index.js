const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); // Load environment variables

const app = express();

/* Middleware */
// Configure express to use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'dist' directory
app.use(express.static('dist'));

console.log(__dirname);

// Set up the root route
app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

// Start the server on port 8080
app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});

// Route to handle MeaningCloud API requests
app.post('/testing', async (req, res, next) => {
    const text = req.body.theText; // Get the text from the request body
    const apiKey = process.env.MEANINGCLOUD_API_KEY; // Ensure this is defined in your .env file

    const fetch = require('node-fetch'); // Import fetch for making API calls

    const url = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&txt=${encodeURIComponent(
        text
    )}`;

    try {
        const response = await fetch(url, { method: 'POST' });
        const data = await response.json();

        if (data && data.status && data.status.code === "0") {
            res.send(data); // Send the MeaningCloud response back to the client
        } else {
            console.error("Error from MeaningCloud API:", data);
            res.status(500).send({ error: "Failed to analyze sentiment." });
        }
    } catch (error) {
        console.error("Error making API request:", error);
        next(error);
    }
});

// Mock API for testing
app.get('/test', function (req, res) {
    const mockAPIResponse = require('./mockAPI.js');
    res.send(mockAPIResponse);
});
