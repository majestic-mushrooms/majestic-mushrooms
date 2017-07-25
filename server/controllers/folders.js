const models = require('../../db/models');
const axios = require('axios');
const Promise = require('bluebird');

module.exports.getAll = (req, res) => {
  const getCount = (folder) => {
    axios.get(`https://api.nylas.com/messages?in=${folder.id}&unread=true&view=count`, {
      headers: { Authorization: authString }
    })
    .then(response => {
      folder.count = response.data.count;
      // console.log('this is a folder', folder);
    }); 
  };
  const authString = 'Bearer ' + req.session.nylasToken;
  // models.Folder.fetchAll()
  //   .then(folder => {
  //     console.log(folder);
  //     res.status(200).send(folder);
  //   })
  //   .catch(err => {
  //     // This code indicates an outside service (the database) did not respond in time
  //     res.status(503).send(err);
  //   });
  let arr = [];
  let colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
    
  axios.get('https://api.nylas.com/labels', {
    headers: { Authorization: authString }
  }).then(response => {
    for (var i = 0; i < response.data.length; i++) {
      response.data[i].color = colors[Math.floor(Math.random() * 12)];
      arr.push(response.data[i]);
    }
  })
  .then(() =>{
    return Promise.each(arr, (folder, i) => {
      setTimeout(
        function() { getCount(folder); }
      , i * 30);
    })
    .then(() =>{
      setTimeout((function() { res.send(arr); }), 2000);
    }).catch(err => {
      res.send(err);
    });
   // arr.forEach((folder, i) => {
      
    // });
  });

};

module.exports.filter = (req, res) => {
  const authString = 'Bearer ' + req.session.nylasToken;
  axios.get(`https://api.nylas.com/messages?in=${req.params.id}`, {
    headers: { Authorization: authString }
  }).then(response => {
    res.status(200).send(response.data);
  }).catch(err => {
    res.send(err);
  });
};
