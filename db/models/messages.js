const db = require('../');

const Message = db.Model.extend({
  tableName: 'messages'
});

module.exports = db.model('Message', Message);