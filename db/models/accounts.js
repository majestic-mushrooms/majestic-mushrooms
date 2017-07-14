const db = require('../');

const Account = db.Model.extend({
  tableName: 'accounts',
  idAttribute: 'account_id', //need to specify, default is "id" column
  messages: function() {
    return this.hasMany('Message');
  }
});

module.exports = db.model('Account', Account);