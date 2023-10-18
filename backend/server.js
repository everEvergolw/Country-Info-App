const express = require('express');
const cors = require('cors');


const app = express();
app.use(cors());

let fetch;

import('node-fetch').then(module => {
    fetch = module.default;
   
});

app.post('/home_list', async (req, res) => {
  const countryName = req.query.country;
  if (!countryName) {
    return res.send({ status: 40000, message: "Country name is required" });
  }
  
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
    const data = await response.json();
    if (data && data.length > 0) {
      return res.send({ data: data[0], status: 20000, message: "Successful" });
    } else {
      return res.send({ status: 40400, message: "No information available for the given country name." });
    }
  } catch(err) {
    return res.send({ status: 50000, message: "Error fetching country data from API" });
  }
});





const port = process.env.port || 8000;
app.listen(port, () => {
  console.log("Server Started");
});
