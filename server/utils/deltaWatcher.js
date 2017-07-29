const models = require('../../db/models');
const createMessages = require('./messagesConstructor').createMessages;
const CLIENT_ID = process.env.NYLAS_CLIENT_ID || require('../../config/nylasToken.js').CLIENT_ID;
const CLIENT_SECRET = process.env.NYLAS_CLIENT_SECRET || require('../../config/nylasToken.js').CLIENT_SECRET;
const ee = require('../socket.js');

module.exports = function(req) {
  const Nylas = require('nylas').config({
    appId: CLIENT_ID,
    appSecret: CLIENT_SECRET 
  });
  const params = { includeTypes: ['message'] };
  const nylas = Nylas.with(req.session.nylasToken);

  nylas.deltas.latestCursor(function(error, cursor) {

    //start stream and add event handlers AFTER retrieving latest cursor
    var stream = nylas.deltas.startStream(cursor, params);

    //store latest cursor
    new models.Account({ account_id: req.session.accountId }).save({ cursor: cursor });
    req.session.cursorId = cursor;

    console.log('Nylas stream started from cursor: ', cursor);

    stream.on('delta', function(delta) {
      console.log(`Received delta - cursor: ${delta.cursor}, id: ${delta.id}, and event: ${delta.event}.`);

      //update account delta
      new models.Account({ account_id: req.session.accountId }).save({ cursor: delta.cursor });
      req.session.cursorId = delta.cursor;

      //if message, update message db
      if (delta.object === 'message') {
        let saveObj = {};
        if (delta.event === 'delete') {
          //@TODO fix - seems to error out when event is delete (on messagesContructor -> email.id is not defined)
          console.log('=========DELETE delta received:', delta);
        } else {
          //not ideal - additional db check
          //why: some deltas are missed depending on refresh timing, so modify events might come in existing but not stored msgs
          //CLIENT NOTE: currently not displaying a missed delta until refresh, due to potential for unexpected insertions
          /* REVERTED bc db check doesn't necessarily come back before the next delta -> could try to do two inserts
          let saveObj = {};
          models.Message.where({ message_id: delta.id }).fetch()
            .then( existing => {
              if (existing === null) { { saveObj = {method: 'insert'}; } }
              return models.Message.forge(createMessages([delta.attributes])[0]).save(null, saveObj);
            })
          */

          //without db check:
          let saveObj = {};
          if (delta.event === 'create') { { saveObj = {method: 'insert'}; } }
          models.Message.forge(createMessages([delta.attributes])[0]).save(null, saveObj)
          .then( saved => { 
            console.log('Message created/updated: SUBJECT', saved.get('subject'), 'at ID', saved.get('message_id')); 
            //emit delta event to socket.io
            ee.emit('delta', { event: delta.event, attributes: saved });
          })
          .catch( err => { 
            //try inserting it if it's an error of the message not existing
            console.log('FIRST TRY ERRORED. Trying again.')
            return models.Message.forge(createMessages([delta.attributes])[0]).save(null, {method: 'insert'})
            .then( saved => {
              console.log('SECOND TRY SUCCESS. Emitting delta.');
              ee.emit('delta', { event: delta.event, attributes: saved });
            });
          })
          .catch( err => { console.log('ERROR: Message not successfully created/update:', err); });
        }
      }

    }).on('error', function(err) {
      // Handle errors here, such as by restarting the stream at the last cursor.
      console.error('Delta streaming error:', err);
      stream = nylas.deltas.startStream(req.session.cursorId, params);

    });

    // Closing the stream explicitly, if needed
    // stopButton.addEventListener('click', function() {
    //   stream.close();
    // });
  });
};
