const models = require('../../db/models');

module.exports.getAll = (req, res) => {
  models.Message.fetchAll()
    .then(messages => {
      res.status(200).send(messages);
    })
    .catch(err => {
      // This code indicates an outside service (the database) did not respond in time
      res.status(503).send(err);
    });
};

module.exports.create = (req, res) => {

  console.log('Inside Messages Controller create() ', req.body);
  let newMessage= new models.Message(
   req.body
  );
  console.log('IS IT NEW? ', newMessage.isNew());
  newMessage
  .save(null, {method: 'insert'})
  .then(result => {
    console.log('Successfully created message: ', result);
    res.status(201).send(result);
  })
  .catch(err => {
    console.log('Error creating message in DB: ', err);
    res.status(500).send(err);
  });
};


//@TODO Dont' hard code the message id
module.exports.getOne = (req, res) => {
  console.log('Inside Messages Controller getOne() ');
  models.Message.where({ message_id: "abcde12345" }).fetch()
    .then(message => {
      if (!message) {
        throw message;
      }
      console.log('Inside Messages Controller with retrieved message: ');
      // res.status(200).send(message);
      res.render('index.ejs');
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.update = (req, res) => {
  models.Message.where({ id: req.params.id }).fetch()
    .then(message => {
      if (!message) {
        throw message;
      }
      return message.save(req.body, { method: 'update' });
    })
    .then(() => {
      res.sendStatus(201);
    })
    .error(err => {
      res.status(500).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};

module.exports.deleteOne = (req, res) => {
  models.Message.where({ id: req.params.id }).fetch()
    .then(message => {
      if (!message) {
        throw message;
      }
      return message.destroy();
    })
    .then(() => {
      res.sendStatus(200);
    })
    .error(err => {
      res.status(503).send(err);
    })
    .catch(() => {
      res.sendStatus(404);
    });
};
