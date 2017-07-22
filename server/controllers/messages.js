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

  //NYLAS CALL
  const authString = 'Bearer ' + req.session.nylasToken;
  axios.get('https://api.nylas.com/messages?limit=5', {
    headers: { Authorization: authString }
  }).then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log("Retreiving messages from Nylas: ", err);
  });
};

//@TODO Dont' hard code the message id
module.exports.create = (req, res) => {

  console.log('Inside Messages Controller create() ');
  let newMessage= new models.Message(
   req.body
  );
  console.log('IS IT NEW? ', newMessage.isNew());
  newMessage
  .save(null, {method: 'insert'})
  .then(result => {
    console.log('Successfully created message: ');
    res.status(201).send(result);
  })
  .catch(err => {
    console.log('Error creating message in DB: ', err);
    res.status(500).send(err);
  });
};

module.exports.getOne = (req, res) => {
  // models.Message.where({ message_id: "abcde12345" }).fetch()
  // .then(message => {
  //   if (!message) {
  //     throw message;
  //   }
  //     res.status(200).send(message);
  //   })
  //   .error(err => {
  //     res.status(500).send(err);
  //   })
  //   .catch(() => {
  //     res.sendStatus(404);
  //   });

  //TODO: get the NYLAS CALL work
  const authString = 'Bearer ' + req.session.nylasToken;
  // axios.get(`https://api.nylas.com/messages?id=${req.params.id}`, {
  axios.get(`https://api.nylas.com/messages/${req.params.id}`, {
    headers: { Authorization: authString }
  }).then(response => {
    res.send(response.data);
  })
  .catch(err => {
    console.log("Retreiving one mail from Nylas: error");
  });

};

module.exports.update = (req, res) => {
  // models.Message.where({ id: req.params.id }).fetch()
  //   .then(message => {
  //     if (!message) {
  //       throw message;
  //     }
  //     return message.save(req.body, { method: 'update' });
  //   })
  //   .then(() => {
  //     res.sendStatus(201);
  //   })
  //   .error(err => {
  //     res.status(500).send(err);
  //   })
  //   .catch(() => {
  //     res.sendStatus(404);
  //   });

  //NYLAS CALL
  const authString = 'Bearer ' + req.session.nylasToken;
  let actionObj = {}; //set depending on type, e.g. trash vs. read email
  if (req.params.type === 'trash') {
    actionObj = { 'label_ids': 1 }; //@TODO: wait for folder routes, to pass in folder id
  } else if (req.params.type === 'read') {
    actionObj = { 'unread': false };
  }

  axios.put('https://api.nylas.com/messages/' + req.params.id, actionObj, {
    headers: { Authorization: authString }
  }).then(response => {
    res.status(200).send(); 
  });
};

module.exports.deleteOne = (req, res) => {
  models.Message.where({ id: req.params.id }).fetch()
    .then(message => {
      if (!message) {
        throw message;
      }
      return message.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
