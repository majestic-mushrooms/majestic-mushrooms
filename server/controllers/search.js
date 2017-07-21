const axios = require('axios');

module.exports.getAll = (req, res) => {
  const authString = 'Bearer ' + req.session.nylasToken;
  axios.get(`https://api.nylas.com/messages/search?q=${Object.keys(req.res.req.body)[0]}`, {
    headers: { Authorization: authString }
  })
  .then(response => {
    res.status(201).send(response.data);
  }).catch(err => { 
    res.status(500);
    console.log('Error retrieving search results from Nylas ', err); 
  });
};
