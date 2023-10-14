const express = require('express');
const cors = require('cors');
const fs = require('fs');

// 并添加以下代码
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
});

const app = express();

app.use(cors());

// Remove redundant middleware for CORS since you're already using the cors package
// Also, removed the wildcard middleware as it wasn't doing anything specific
app.post('/home_list', (req, res) => {
  
  const countryName = req.query.country;

  if (!countryName) {
    return res.send({
      status: 40000,
      message: "Country name is required"
    });
  }



  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        res.send({
          data: data[0],
          status: 20000,
          message: "Successful"
        });
      } else {
        res.send({
          status: 40400,
          message: "No information available for the given country name."
        });
      }
    })
    .catch(err => { 
      res.send({
        status: 50000,
        message: "Error fetching country data from API"
      });
    });
});



const port = process.env.port || 8000;
app.listen(port, err => {
  if (!err) console.log("Server Startr");
});
