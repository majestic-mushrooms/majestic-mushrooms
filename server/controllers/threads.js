const models = require('../../db/models');
const axios = require('axios');

module.exports.getAll = (req, res) => {
  // models.Message.fetch()
  // .then(messages => {
  //   res.status(200).send('in getAll');// render to the page
  //   // res.render('index.ejs', {messages: messages}, function(err, html) {
  //   })
  // .error(err => {
  //   res.status(500).send(err);
  // })
  // .catch(() => {
  //   res.sendStatus(404);
  // });

  // console.log('========= in thread.js getAll ==============')

  // TODO: get the NYLAS CALL work
  const authString = 'Bearer ' + req.session.nylasToken;
  axios.get(`https://api.nylas.com/messages?thread_id=${req.params.id}`, {
    headers: { Authorization: authString }
  }).then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log("Retreiving threads from Nylas: ", err);
  });
};
