const db = require('../');

const SortedMessage = db.Model.extend({
  tableName: 'sortedMessages'
});

module.exports = db.model('SortedMessage', SortedMessage);