const db = require('../');

const Account = db.Model.extend({
  tableName: 'accounts',
  messages: function() {
    return this.hasMany('Message');
  }
});

module.exports = db.model('Account', Account);