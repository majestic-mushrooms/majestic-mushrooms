const axios = require('axios');
const models = require('../../db/models');
const bookshelf = require('../../db');
const {createMessages, createDatabaseMessageObject} = require('../utils/messagesConstructor');

const colors = [
  'red', 'orange', 'yellow', 'olive', 'green', 'teal',
  'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]; 

module.exports.getAll = (req, res) => {
  const authString = 'Bearer ' + req.session.nylasToken;
  const query = Object.keys(req.res.req.body)[0];
  console.log('??QUERY', query);
  models.Message.query('orderBy', 'date_received', 'desc', 'where', 'account_id', '=', req.session.accountId).fetchAll()
  .then(messages => {
    // render matches from db
    var dbModels = messages.models;
    filteredBySearch = dbModels.filter(model => {
      return model.attributes.subject.includes(query);
    });
    if (filteredBySearch.length > 0) {
      return filteredBySearch;
    }
    console.log('xxxxxxxx filteredBySearch', filteredBySearch);

    // nylas call

    axios.get(`https://api.nylas.com/messages/search?q=${query}`, {
      headers: { Authorization: authString }
    }).then(response => {
      console.log('nylas response LEN', response.data.length);
      // save to db

      const Messages = bookshelf.Collection.extend({
        model: models.Message
      });
      var messages = Messages.forge(createMessages(response.data));
      console.log('------messages saved to db', messages);
      return messages.invokeThen('save', null, { method: 'insert' });

      // new models.Message(createMessages(response.data))
      // .save(null, {method: 'insert'})
      // .then(result => { console.log('Successfully saved searched msgs in DB', result); })
      // .catch(err => { res.status(500).send(err); });
      // return filteredBySearch;
    }).catch(err => {
      console.log('Error retrieving search results from Nylas ', err);
    });
  }).catch(err => { 
    console.log('Error retrieving search results for query ', err);
    res.status(500).send('failed to get search msgs');
  }).then(messages => {
    console.log('-------msgs retrieved', messages);
    res.status(201).send(messages);
  });
};

module.exports.getNylasResults = (req, res) => {
  console.log('((((( in cointroller GET NYLAS RESULTS');
  const query = req.query.query;
  console.log('{{{{the query', query);
  models.Message.query('orderBy', 'date_received', 'desc', 'where', 'account_id', '=', req.session.accountId).fetchAll()
  .then(messages => {
    var dbModels = messages.models;
    filteredBySearch = dbModels.filter(model => {
      return model.attributes.subject.includes(query);
    });
    res.status(201).send(filteredBySearch); // in client need to check if empty arr -> log No messages matched your search!
  }).catch(err => { 
    res.status(500);
    console.log('Error getting search matches from db', err); 
  });
};


//   axios.get(`https://api.nylas.com/messages/search?q=${Object.keys(req.res.req.body)[0]}`, {
//     headers: { Authorization: authString }
//   })
//   .then(response => {
//     for (let i = 0; i < response.data.length; i++) {
//       response.data[i].color = colors[Math.floor(Math.random() * 12)];
//     }
//     res.status(201).send(response.data);
//   }).catch(err => { 
//     res.status(500);
//     console.log('Error retrieving search results from Nylas ', err); 
//   });
// };
