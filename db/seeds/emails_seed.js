const models = require('../models');

exports.seed = function (knex, Promise) {

  let saveObj = {};
  return models.Account.where({ email: 'janedoe@gmail.com' }).fetch()
    .then(account => {
      if (account === null) { saveObj = {method: 'insert'}; }
    }).then(() => {
      console.log('saving account!');
      return models.Account.forge({
        account_id: 'abcdefghijkl1234567890',
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        provider: 'gmail',
        org_unit: 'label',
        sync_state: 'running'
      }).save(null, saveObj);
    })
    .error(err => {
      console.error('ERROR: failed to create account');
      throw err;
    })
    .then(account => {
      console.log('saving message for', account.get('account_id') + '!')
      return models.Message.forge({
        message_id: 'abcde12345',
        account_id: account.get('account_id'),
        thread_id: 'placeholder',
        subject: 'this is a test',
        from: '["test@gmail.com"]',
        to: '["janedoe@gmail.com"]',
        cc: '["kirkrohani@gmail.com"]',
        reply_to: '["test@gmail.com", "kirkrohani@gmail.com"]',
        date_received: new Date(32394),
        unread: true,
        starred: false,
        snippet: 'This is still a test blah blah trail off',
        body: 'This is still a test blah blah trail off end of body.',
        labels: '["labelid1", "labelid2"]'
      }).save(null, saveObj);
    })
    .error(err => {
      console.error('ERROR: failed to create message');
    })
    .then(message => {
      console.log('saving folder for', message.get('account_id') + '!')
      return models.Folder.forge({
        folder_id: 'abcd1234',
        account_id: message.get('account_id'),
        name: 'null',
        display_name: 'trashbin'
      }).save(null, saveObj);
    })
    .error(err => {
      console.error('ERROR: failed to create folder!');
    })
    .then(folder => {
      return models.sortedMessage.where({ folder_id: folder.get('folder_id') }).fetch();
    }).then(sortedMessage => {
      if (sortedMessage === null) {
        console.log('saving message and folder in join table!');
        return models.sortedMessage.forge({
          message_id: 'abcde12345',
          folder_id: 'abcd1234'
        }).save(null, saveObj);
      }
      return;
    })
    .error(err => {
      console.error('ERROR: failed to save to join table');
    })
    .catch(() => {
      console.log('WARNING: potential save issues encountered.');
    });

};

//USER_SEED.JS
// const models = require('../models');

// exports.seed = function (knex, Promise) {

//   return models.Profile.where({ email: 'admin@domain.com' }).fetch()
//     .then((profile) => {
//       if (profile) {
//         throw profile;
//       }
//       return models.Profile.forge({
//         first: 'System',
//         last: 'Admin',
//         display: 'Administrator',
//         email: 'admin@domain.com'
//       }).save();
//     })
//     .error(err => {
//       console.error('ERROR: failed to create profile');
//       throw err;
//     })
//     .then((profile) => {
//       return models.Auth.forge({
//         type: 'local',
//         password: 'admin123',
//         profile_id: profile.get('id')
//       }).save();
//     })
//     .error(err => {
//       console.error('ERROR: failed to create auth');
//     })
//     .catch(() => {
//       console.log('WARNING: default user already exists.');
//     });

// };

