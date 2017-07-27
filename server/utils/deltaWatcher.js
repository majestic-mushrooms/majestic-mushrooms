const models = require('../../db/models');
const messagesConstructor = require('../utils/messagesConstructor');

module.exports = function(req, cursor, CLIENT_ID, CLIENT_SECRET) {
  const Nylas = require('nylas').config({
    appId: CLIENT_ID,
    appSecret: CLIENT_SECRET 
  });
  const params = { includeTypes: ['message'] };
  const nylas = Nylas.with(req.session.nylasToken);

  nylas.deltas.latestCursor(function(error, cursor) {

    // Start the stream and add event handlers.
    var stream = nylas.deltas.startStream(cursor, params);
    console.log('Nylas stream started from cursor: ', cursor);

    stream.on('delta', function(delta) {
      console.log(`Received delta - cursor: ${delta.cursor}, id: ${delta.id}, and event: ${delta.event}.`);

      //update account delta
      new models.Account({ account_id: req.session.accountId }).save({ cursor: delta.cursor });
      req.session.cursorId = delta.cursor;

      //if message, update message db
      if (delta.object === 'message') {
        let saveObj = {};
        if (delta.event === 'create') { saveObj = {method: 'insert'}; }
        models.Message.forge(messagesConstructor([delta.attributes])[0]).save(null, saveObj)
        .then( saved => { console.log('Message created/updated: SUBJECT', saved.get('subject'), 'at ID', saved.get('message_id')); } )
        .catch( err => { console.log('ERROR: Message not successfully created/update.'); } );
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
