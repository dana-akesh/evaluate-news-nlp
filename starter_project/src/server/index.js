const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
var aylien = require("aylien_textapi");
dotenv.config();

const app = express();
app.use(express.static('dist'));
app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);
// a debug statement i used to make sure that the key is correct
console.log(`Your API key is ${process.env.API_KEY}`);
// GET function
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// the post function
app.post('/api', async function (req, res) {
    const text = req.body.url; // get the url

    const apiKey = process.env.API_KEY;// the key
    const apiUrl = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&txt=${encodeURIComponent(text)}&lang=en`;// the api

    try {
        const response = await fetch(apiUrl, { method: 'POST' });//  make the request to get the response
        const data = await response.json();// get the response and store it in data
        res.send(data);// f the response(data)
    } catch (error) {// if there was and error then the response states = 500( which indicates an Internal Server Error)  send an Error in processing the request
        console.error('Error:', error);
        res.status(500).send('Error in processing the request');
    }
});
// listen on port 8000
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});

var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});