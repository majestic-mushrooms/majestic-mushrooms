const models = require('../../db/models');
const axios = require('axios');


module.exports.getThread = (req, res) => {
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

  //NYLAS CALL
  const authString = 'Bearer ' + req.session.nylasToken;
  axios.get('https://api.nylas.com/messages?thread_id'=req.params.thread_id, {
    headers: { Authorization: authString }
  }).then(response => {
    res.send(response.data);
  });
};