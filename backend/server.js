const express = require('express');
const cors = require('cors');

// Initialize App
const app = express();

// Constants
const DEFAULT_PORT = 8000;
const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/name/';



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
const port = process.env.PORT || DEFAULT_PORT; // Note: PORT should be in uppercase
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

// Load the node-fetch module
(async () => {
    const module = await import('node-fetch');
    fetch = module.default;
})();
