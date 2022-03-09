var express = require('express');
var router = express.Router();
const axios = require('axios');
var request = require('request');
const APIKEY = "6a079999-6cdd-4b2c-89b6-121809353354"; //process.env.REACT_APP_HUBSPOT_APIKEY;

router.get('/', (req, res) => {
  res.send('server works')
})

/* GET home page. */
router.post('/createContact', async (req, res, next) => {
  const {
    company,
    email,
    firstname,
    lastname,
    phone,
    website
  } = req.body;
  const newContact = {
    "properties": {
      company,
      email,
      firstname,
      lastname,
      phone,
      website
      // "company": "Biglytics",
      // "email": "bcooper14@biglytics.net",
      // "firstname": "Bryan",
      // "lastname": "Cooper",
      // "phone": "(877) 929-0687",
      // "website": "biglytics.net"
    }
  }
  var options = {
    'method': 'POST',
    'url': `https://api.hubapi.com/crm/v3/objects/contacts?hapikey=${APIKEY}`,
    'headers': {
      'content-type': 'application/json'
    },
    body: JSON.stringify(newContact)
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(response.body);
    res.json(response.body);
  });
})

// GET Contacts
router.get('/getContacts', async (req, res, next) => {
  let data = null;
  try {
    const response = await axios.get(`https://api.hubapi.com/crm/v3/objects/contacts?limit=10&archived=false&hapikey=${APIKEY}`);
    data = response.data;
  } catch (error) {
    console.error(error);
  }
  res.json(data);
});

module.exports = router;
