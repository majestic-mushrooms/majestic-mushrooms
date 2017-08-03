const models = require('../../db/models');
const axios = require('axios');
const Promise = require('bluebird');
const bookshelf = require('../../db');
const throttledQueue = require('throttled-queue');
const {createMessages} = require('../utils/messagesConstructor');

module.exports.getAll = (req, res) => {
  let arr = [];
  const delay = time => {
    return new Promise( resolve => { 
      setTimeout(resolve, time);
    });
  };

  models.Folder.query( qb => {
    qb.where('account_id', '=', req.session.accountId);
  }).fetchAll()
    .then(folders => {
      if (folders.length === 0) {
        const getCount = folder => {
          axios
            .get(`https://api.nylas.com/messages?in=${folder.folder_id}&unread=true&view=count`, {
              headers: { Authorization: authString }
            })
            .then(response => {
              folder.count = response.data.count;
            });
        };
        const authString = 'Bearer ' + req.session.nylasToken;
        let colors = [ 'red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
        ];

        axios.get('https://api.nylas.com/labels', {
            headers: { Authorization: authString }
          })
          .then(response => {
            for (var i = 0; i < response.data.length; i++) {
              response.data[i].color = colors[Math.floor(Math.random() * 12)];
              response.data[i].folder_id = response.data[i].id;
              delete response.data[i].id;
              delete response.data[i].object;
              delete response.data[i].name;
              arr.push(response.data[i]);
            }
          })
          .then(() => {
            let throttle = throttledQueue(1, 400);
            return Promise.each(arr, (folder, i) => {
              throttle(function() {
                getCount(folder);
              });
            }).then(() => {
              const Folders = bookshelf.Collection.extend({
                model: models.Folder
              });
              delay(arr.length * 450).then( () => {
                folders = Folders.forge(arr);
                return folders.invokeThen('save', null, { method: 'insert' });
              }).then((folders) => {
                console.log(`Folderss successfully retrieved for account ${req.session.accountId}. Rerouting!`);
                res.status(200).send(folders);// render to the page
              });
            });
          })
          .catch(err => {
            console.log(`Error retrieving folders for sadfasdfasdfsadf account ${req.session.accountId}!`);
            res.send(err);
          });
      } else {
        res.status(200).send(folders);// render to the page
      }
    }).catch(err => {
    console.log(`Error retrieving folders for account ${req.session.accountId}!`);
    res.status(404).send('Folder retrieval failed.');
  
  })
};

module.exports.filter = (req, res) => {
  // const authString = 'Bearer ' + req.session.nylasToken;
  // axios.get(`https://api.nylas.com/messages?in=${req.params.id}&limit=50`, {
  //   headers: { Authorization: authString }
  // }).then(response => {
  //   let filteredEmails = createMessages(response.data);
  //   res.status(200).send(filteredEmails);
  // }).catch(err => {
  //   res.send(err);
  // });

  models.Message.query(qb => {
    qb.innerJoin('sortedMessages', 'messages.message_id', 'sortedMessages.message_id');
    qb.where('sortedMessages.folder_id', '=', req.params.id);
  }).fetchAll()
  .then(messages => {
    res.status(200).send(messages);// render to the page
  })
  .catch(err => {
    console.log('Unable to retrieve sorted messages');
    console.log(err)
  })
};

module.exports.create = (req, res) => {
  console.log('Inside Folders Controller create()', req.body);
};