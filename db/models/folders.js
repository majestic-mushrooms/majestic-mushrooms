const db = require('../');

const Folder = db.Model.extend({
  tableName: 'folders',
  idAttribute: 'folder_id'
});

module.exports = db.model('Folder', Folder);