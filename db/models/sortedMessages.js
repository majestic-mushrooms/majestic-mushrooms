const db = require('../');

const sortedMessage = db.Model.extend({
  tableName: 'sortedMessages'
});

module.exports = db.model('sortedMessage', sortedMessage);