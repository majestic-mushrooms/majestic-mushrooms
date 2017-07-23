const models = require('../../db/models');
const axios = require('axios');

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 

module.exports.getAll = (req, res) => {
  // // when using DB
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

  // when using Nylas call
  console.log('inside getAll of threads');
  const authString = 'Bearer ' + req.session.nylasToken;
  axios.get(`https://api.nylas.com/messages?thread_id=`+req.params.id, {
    headers: { Authorization: authString }
  }).then(response => {
    for (let i = 0; i < response.data.length; i++) {
      response.data[i].color = colors[Math.floor(Math.random() * 12)];
    }
    console.log("Retrieving threads from Nylas success. req.params is: ", req.params.id);
    res.send(response.data);
  })
  .catch(err => {
    console.log("Retreiving threads from Nylas: ", err);
  });
};
