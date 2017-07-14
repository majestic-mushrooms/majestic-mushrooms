const db = require('../');

const Folder = db.Model.extend({
  tableName: 'folders'
});

module.exports = db.model('Folder', Folder);