const models = require('../../db/models');
const axios = require('axios');

module.exports.getAll = (req, res) => {
  // models.Folder.fetchAll()
  //   .then(folder => {
  //     console.log(folder);
  //     res.status(200).send(folder);
  //   })
  //   .catch(err => {
  //     // This code indicates an outside service (the database) did not respond in time
  //     res.status(503).send(err);
  //   });
  const authString = 'Bearer ' + req.session.nylasToken;
  let arr = [];
  let colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];
    
  axios.get('https://api.nylas.com/labels', {
    headers: { Authorization: authString }
  }).then(response => {
    console.log('res', response.data);
    for (var i = 0; i < response.data.length; i++) {
      response.data[i].color = colors[Math.floor(Math.random() * 12)];
      arr.push(response.data[i]);
    }
    // axios.get(`https://api.nylas.com/messages?in=${arr[i].display_name}&unread=true&view=count`, {
    //   headers: { Authorization: authString }
    // }).then(response => {
    //   console.log(response.data);
    //   // arr[i].count = response.data.count;
    // });
  }).then(() =>{
    res.status(200).send(arr);
  }).catch(err => {
      // This code indicates an outside service (the database) did not respond in time
    res.send(err);
  });

};
