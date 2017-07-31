const axios = require('axios');
const models = require('../../db/models');
const bookshelf = require('../../db');
const {createMessages, createDatabaseMessageObject} = require('../utils/messagesConstructor');


module.exports.getAll = (req, res) => {
  const authString = 'Bearer ' + req.session.nylasToken;
  const query = Object.keys(req.res.req.body)[0];
  models.Message.query('orderBy', 'date_received', 'desc', 'where', 'account_id', '=', req.session.accountId).fetchAll()
  .then(messages => {
    var dbModels = messages.models;
    filteredBySearch = dbModels.filter(model => {
      return model.attributes.subject.includes(query);
    });
    if (filteredBySearch.length > 0) {
      return filteredBySearch;
    }
  }).catch(err => { 
    res.status(500).send(err);
  }).then(messages => {
    res.status(201).send(messages);
  });
};


module.exports.getNylasResults = (req, res) => {
  console.log('Getting extra search results from Nylas');
  const authString = 'Bearer ' + req.session.nylasToken;
  const query = req.query.query;
  axios.get(`https://api.nylas.com/messages/search?q=${query}`, {
    headers: { Authorization: authString }
  }).then(response => {
    const Messages = bookshelf.Collection.extend({
      model: models.Message
    });
    var messages = Messages.forge(createMessages(response.data));
    messages.invokeThen('save', null, { method: 'insert' });
    res.status(200).send(createMessages(response.data)); 
  }).catch(err => { 
    console.log('Error getting search matches from db', err); 
    res.status(500);
  });
};