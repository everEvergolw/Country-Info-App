const path = require('path');
const express = require('express');
const cors = require('cors');

// Initialize App

// Load the node-fetch module
const fetch = require('node-fetch');


const app = express();

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});






// Constants
const DEFAULT_PORT = 4001;
const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/name/';

app.use(express.urlencoded({ extended: true }));



// Middlewares
app.use(cors());
app.use(express.json()); // if you plan to receive JSON payloads in POST requests


// Utility function to fetch country data
async function fetchCountryData(countryName) {
    try {
        const response = await fetch(`${COUNTRIES_API_URL}${countryName}?fullText=true`);
        const data = await response.json();

        if (data && data.length > 0) {
            return { data: data[0], status: 20000, message: "Successful" };
        } else {
            return { status: 40400, message: "No information available for the given country name." };
        }
    } catch (err) {
        return { status: 50000, message: "Error fetching country data from API" };
    }
}

// Routes
app.post('/home_list', async (req, res) => {
    const countryName = req.query.country;

    if (!countryName) {
        return res.status(400).send({ status: 40000, message: "Country name is required" });
    }

    const result = await fetchCountryData(countryName);
    res.send(result);
});






// Server Start
const PORT = process.env.PORT || DEFAULT_PORT; // Note: PORT should be in uppercase
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

// At the end of your server.js
module.exports = app;
