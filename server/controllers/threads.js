const models = require('../../db/models');
const axios = require('axios');

module.exports.getAll = (req, res) => {
  // models.Message.fetchAll()
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

  // TODO: get the NYLAS CALL work
  console.log('inside getAll of threads');
  const authString = 'Bearer ' + req.session.nylasToken;
  // axios.get(`https://api.nylas.com/messages?thread_id=${req.params.id}`, {
  axios.get(`https://api.nylas.com/messages?thread_id=12sav690mijdpe6qok1c9ujhy`, {
    headers: { Authorization: authString }
  }).then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log("Retreiving threads from Nylas: ", err);
  });
};
