const models = require('../../db/models');
const axios = require('axios');


module.exports.getOne = (req, res) => {
  console.log('Inside account.js Controller getOne() ');

  // when using Nylus call
  const authString = 'Bearer ' + req.session.nylasToken;
  axios.get(`https://api.nylas.com/account`, {
    headers: { Authorization: authString }
  }).then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log("Error retrieving account info from Email API: ", err);
  });

};


