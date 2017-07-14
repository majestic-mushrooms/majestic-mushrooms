const db = require('../');

const Message = db.Model.extend({
  tableName: 'messages',
  idAttribute: 'message_id'
});

module.exports = db.model('Message', Message);