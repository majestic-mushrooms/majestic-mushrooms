const axios = require('axios');

const bookshelf = require('../../db');
const models = require('../../db/models');
const messagesConstructor = require('../utils/messagesConstructor');

module.exports.getAll = (req, res) => {
  models.Message.query('orderBy', 'date_received', 'where', 'account_id', '=', req.session.accountId).fetchAll()
  .then(messages => {
    if (messages.length === 0) { //no messages stored
      console.log(`No messages stored for account ${req.session.accountId}. Retrieving!`);
      const authString = 'Bearer ' + req.session.nylasToken;
      return axios.get('https://api.nylas.com/messages?limit=100', {
        headers: { Authorization: authString }
      }).then(response => {
        const Messages = bookshelf.Collection.extend({
          model: models.Message
        });
        messages = Messages.forge(messagesConstructor(response.data));
        return messages.invokeThen('save', null, { method: 'insert' });
      })
      .catch(err => {
        console.log(err);
        throw Error;
      });
    } else { return messages }
  
  }).catch(err => {
    console.log(`Error retrieving messages for account ${req.session.accountId}!`);
    res.status(404).send('Message retrieval failed.');
  
  }).then(messages => {
    console.log(`Messages successfully retrieved for account ${req.session.accountId}. Rerouting!`)
    res.status(200).send(messages.slice(80));// render to the page
  })
};

//@TODO Dont' hard code the message id
module.exports.create = (req, res) => {

  console.log('Inside Messages Controller create() ');
  let newMessage = new models.Message(
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
  models.Message.where({ message_id: req.params.id }).fetch()
  .then(message => {
    if (!message) {
      throw message;
    }
      res.status(200).send(message);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
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
    return new models.Message({ message_id: req.params.id }).save(actionObj);
  }).catch(err => { 
    console.log(`Error updating email ${req.params.id}.`);
    res.status(400).send();
  }).then(message => {
    console.log('Message updated!')
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
