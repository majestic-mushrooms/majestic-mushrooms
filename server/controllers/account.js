const models = require('../../db/models');
const axios = require('axios');

const deltaWatcher = require('../utils/deltaWatcher');


module.exports.getOne = (req, res) => {
  console.log('Inside account.js Controller getOne() ');
   
  //start cursor 
  deltaWatcher(req);

  //send back account info
  res.send(JSON.stringify({
    id: req.session.accountId,
    email_address: req.session.accountEmail,
    nylasToken: req.session.nylasToken
  }));

};


