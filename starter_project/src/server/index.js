var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fetch = require('node-fetch'); // Fix: Import fetch for API calls

dotenv.config();

const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Require the Aylien npm package
var aylien = require("aylien_textapi");

// Check API Key
console.log(`Your API key is ${process.env.API_KEY}`);

app.get('/api', (req, res) => {
    res.json({message: "API is working! Use POST /api with a URL in the request body."});
});

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

/*app.post('/api', async function (req, res) {
    const text = req.body.url; // Get the URL
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&txt=${encodeURIComponent(text)}&lang=en`;

    try {
        //debugger;
        const response = await fetch(apiUrl, {method: 'POST'});
        console.log(response + "response");
        const data = await response.json();
        console.log(data + "data");
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error in processing the request');
    }
});*/

app.post('/api', async function (req, res) {
    const text = req.body.url; // Get the URL
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&txt=${encodeURIComponent(text)}&lang=en`;

    try {
        const response = await fetch(apiUrl, { method: 'POST' });

        // Check if the response was successful
        if (!response.ok) {
            console.error(`Error fetching data: ${response.status}`);
            return res.status(response.status).send({ error: "Failed to fetch from MeaningCloud API" });
        }

        const data = await response.json();
        console.log('API response:', data);
        res.send(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error in processing the request');
    }
});

// Listen on port 8000
app.listen(8001, function () {
    console.log('Server running on http://localhost:8001');
});

