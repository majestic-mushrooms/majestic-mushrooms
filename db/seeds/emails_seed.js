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
    .catch(err => {
      console.error('ERROR: failed to create account', err);
      throw err;
    })
    .then(account => {
      console.log('saving message for', account.get('account_id') + '!')
      return models.Message.forge({
        message_id: 'abcde12345',
        account_id: account.get('account_id'),
        thread_id: 'placeholder',
        subject: 'this is a test',
        color: 'red',
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
    .catch(err => {
      console.error('ERROR: failed to save message');
      throw err;
    })
    .then(account => {
      console.log('saving message for', account.get('account_id') + '!')
      return models.Message.forge({
        message_id: 'abcde12346',
        account_id: account.get('account_id'),
        thread_id: 'placeholder',
        subject: 'this is a test',
        color: 'yellow',        
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
    .catch(err => {
      console.error('ERROR: failed to save message', err);
      throw err;
    })
    .then(account => {
      console.log('saving message for', account.get('account_id') + '!')
      return models.Message.forge({
        message_id: 'abcde12347',
        account_id: 'abcdefghijkl1234567890',
        thread_id: 'placeholder',
        subject: 'this is a test2',
        color: 'red',
        from: '["test1@gmail.com"]',
        to: '["janedoe@gmail.com"]',
        cc: '["kirkrohani@gmail.com"]',
        reply_to: '["test1@gmail.com", "kirkrohani@gmail.com"]',
        date_received: new Date(32396),
        unread: true,
        starred: false,
        snippet: 'This is still a test1 blah blah trail off',
        body: 'This is still a test1 blah blah trail off end of body.',
        labels: '["labelid1", "labelid2"]'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to save message');
      throw err;
    })
    .then(account => {
      console.log('saving message for', account.get('account_id') + '!')
      return models.Message.forge({
        message_id: 'abcde12348',
        account_id: 'abcdefghijkl1234567890',
        thread_id: 'placeholder',
        subject: 'this is a test3',
        color: 'blue',
        from: '["test1@gmail.com"]',
        to: '["janedoe@gmail.com"]',
        cc: '["kirkrohani@gmail.com"]',
        reply_to: '["test1@gmail.com", "kirkrohani@gmail.com"]',
        date_received: new Date(32394),
        unread: true,
        starred: false,
        snippet: 'This is still a test1 blah blah trail off',
        body: 'This is still a test1 blah blah trail off end of body.',
        labels: '["labelid1", "labelid2"]'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to save message');
      throw err;
    })
    .then(account => {
      console.log('saving message for', account.get('account_id') + '!')
      return models.Message.forge({
        message_id: 'abcde12349',
        account_id: 'abcdefghijkl1234567890',
        thread_id: 'placeholder1',
        subject: 'this is a test4',
        color: 'green',
        from: '["test1@gmail.com"]',
        to: '["janedoe@gmail.com"]',
        cc: '["kirkrohani@gmail.com"]',
        reply_to: '["test@gmail.com", "kirkrohani@gmail.com"]',
        date_received: new Date(32395),
        unread: true,
        starred: false,
        snippet: 'This is still a test1 blah blah trail off',
        body: 'This is still a test2 blah blah trail off end of body.',
        labels: '["labelid1", "labelid2"]'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to save message');
      throw err;
    })
    .then(account => {
      console.log('saving message for', account.get('account_id') + '!')
      return models.Message.forge({
        message_id: 'abcde12350',
        account_id: 'abcdefghijkl1234567890',
        thread_id: 'placeholder1',
        subject: 'this is a test5',
        color: 'blue',        
        from: '["test@gmail.com"]',
        to: '["janedoe@gmail.com"]',
        cc: '["kirkrohani@gmail.com"]',
        reply_to: '["test1@gmail.com", "kirkrohani@gmail.com"]',
        date_received: new Date(32394),
        unread: true,
        starred: false,
        snippet: 'This is still a test2 blah blah trail off',
        body: 'This is still a test2 blah blah trail off end of body.',
        labels: '["labelid1", "labelid2"]'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to save message');
      throw err;
    })
    .then(account => {
      console.log('saving message for', account.get('account_id') + '!')
      return models.Message.forge({
        message_id: 'abcde12351',
        account_id: 'abcdefghijkl1234567890',
        thread_id: 'placeholder1',
        subject: 'this is a test6',
        color: 'purple',        
        from: '["test@gmail.com"]',
        to: '["janedoe@gmail.com"]',
        cc: '["kirkrohani@gmail.com"]',
        reply_to: '["test@gmail.com", "kirkrohani@gmail.com"]',
        date_received: new Date(32394),
        unread: true,
        starred: false,
        snippet: 'This is still a test2 blah blah trail off',
        body: 'This is still a test2 blah blah trail off end of body.',
        labels: '["labelid1", "labelid2"]'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to create message', err);
    })
    .then(message => {
      console.log('saving folder for', message.get('account_id') + '!')
      return models.Folder.forge({
        folder_id: 'abcd1234',
        account_id: message.get('account_id'),
        // name: 'inbox',
        color: 'blue',
        count: 30,
        display_name: 'inbox'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to save folder');
      throw err;
    })
    .then(message => {
      console.log('saving folder for', message.get('account_id') + '!')
      return models.Folder.forge({
        folder_id: 'abcd1236',
        account_id: 'abcdefghijkl1234567890',
        // name: 'sent',
        color: 'red',
        count: 99,
        display_name: 'sent'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to save folder');
      throw err;
    })
    .then(message => {
      console.log('saving folder for', message.get('account_id') + '!')
      return models.Folder.forge({
        folder_id: 'abcd1237',
        account_id: 'abcdefghijkl1234567890',
        // name: 'null',
        color: 'purple',
        count: 10,
        display_name: 'mymail'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to save folder');
      throw err;
    })
    .then(message => {
      console.log('saving folder for', message.get('account_id') + '!')
      return models.Folder.forge({
        folder_id: 'abcd1235',
        account_id: 'abcdefghijkl1234567890',
        // name: 'null',
        color: 'green',
        count: 22,
        display_name: 'mymail2'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to save folder');
      throw err;
    })
    .then(message => {
      console.log('saving folder for', message.get('account_id') + '!')
      return models.Folder.forge({
        folder_id: 'abcd1238',
        account_id: 'abcdefghijkl1234567890',
        // name: 'trash',
        color: 'orange',
        count: 4,
        display_name: 'trashbin'
      }).save(null, saveObj);
    })
    .catch(err => {
      console.error('ERROR: failed to create folder!', err);
    })
    .then(folder => {
      console.log('saving sortedMessage');
      return models.SortedMessage.where({ folder_id: folder.get('folder_id') }).fetch();
    }).then(sortedMessage => {
      if (sortedMessage === null) {
        console.log('saving message and folder in join table!');
        return models.SortedMessage.forge({
          message_id: 'abcde12345',
          folder_id: 'abcd1234'
        }).save(null, saveObj);
      }
      return;
    })
    .catch(err => {
      console.log('ERROR: failed to save to join table', err);
    })
    // .then(contact => {
    //   console.log('--contact', contact);
    //   console.log('saving contact for', contact.get('account_id') + '!')
    //   return models.Contact.forge({
    //     account_id: contact.get('account_id'),
    //     contact_id: 'contactid001',
    //     email: 'abd@abd.com',
    //     name: 'Abrahm Bad Dog',
    //     phone_numbers: '[{mobile: "1-000-000-0000"}]'
    //   }).save(null, saveObj);
    // })
    // .catch(err => {
    //   console.error('ERROR: failed to create contact!', err);
    // })
    .catch(err => {
      console.log('WARNING: potential save issues encountered.', err);
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

