const axios = require('axios');
const bookshelf = require('../../db');
const models = require('../../db/models');
const {createMessages, createDatabaseMessageObject, createSortedMessages} = require('../utils/messagesConstructor');

module.exports.getAll = (req, res) => {
  models.Message.query( qb => {
    qb.orderBy('date_received', 'desc');
    qb.where('account_id', '=', req.session.accountId);
  }).fetchAll()
  .then(messages => {
    let retrievedMessages = null;

    //if no messages stored for new user, retrieve via nylas call
    if (messages.length === 0) {
      console.log(`No messages stored for account ${req.session.accountId}. Retrieving!`);
      const authString = 'Bearer ' + req.session.nylasToken;
      return axios.get('https://api.nylas.com/messages?limit=100', {
        headers: { Authorization: authString }
      })
      //retrieved messages, saving to db
      .then(response => {
        //parse data for sharedTable here
        retrievedMessages = response.data;
        const Messages = bookshelf.Collection.extend({
          model: models.Message
        });
        messages = Messages.forge(createMessages(retrievedMessages));
        return messages.invokeThen('save', null, { method: 'insert' });
      })
      .then( (messages) => {
        const SortedMessages = bookshelf.Collection.extend({
          model: models.SortedMessage
        });
        let sortedMessages = SortedMessages.forge(createSortedMessages(retrievedMessages));
        sortedMessages.invokeThen('save', null, { method: 'insert' });
        return messages;
      })
      .catch(err => {
        console.log(err);
        throw Error;
      });
      
    //if messages already exist
    } else { return messages; }
  }).catch(err => {
    console.log(`Error retrieving messages for account ${req.session.accountId}!`);
    res.status(404).send('Message retrieval failed.');
  }).then(messages => {
    console.log(`Messages successfully retrieved for account ${req.session.accountId}. Rerouting!`);
    res.status(200).send(messages);// render to the page
  });
};

module.exports.create = (req, res) => {
  console.log('Inside Messages Controller create(): ', req.body);
  const authString = 'Bearer ' + req.session.nylasToken;
  axios({
    method: 'post',
    url: 'https://api.nylas.com/send',
    headers: { Authorization: authString },
    data: req.body,
    json: true,
    responseType: 'json'
  })
  .then( message => {
    console.log('Successfully sent message to Nylas: ', message.data);
    res.status(201).send(message.data);

    new models.Message(createDatabaseMessageObject(message.data))
    .save(null, {method: 'insert'})
    .then(result => { console.log('Successfully created message in DATABASE: ', result); })
    .catch(err => { res.status(500).send(err); });
  })
  .catch( err => {
    console.log('Error posting message to Nylas: ', err);
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

  // when using Nylus call
  // const authString = 'Bearer ' + req.session.nylasToken;
  // axios.get(`https://api.nylas.com/messages/${req.params.id}`, {
  //   headers: { Authorization: authString }
  // }).then(response => {
  //   res.send(response.data);
  // })
  // .catch(err => {
  //   console.log("Retreiving one mail from Nylas: error");
  // });
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
    console.log('Message updated!');
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
