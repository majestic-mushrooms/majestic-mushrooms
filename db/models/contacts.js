const db = require('../');

const Contact = db.Model.extend({
  tableName: 'contacts',
  idAttribute: 'contact_id'
});

module.exports = db.model('Contact', Contact);

