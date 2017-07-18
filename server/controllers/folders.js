const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Folder.fetchAll()
    .then(folder => {
      console.log(folder);
      res.status(200).send(folder);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};
