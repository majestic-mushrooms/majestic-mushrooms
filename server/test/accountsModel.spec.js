const expect = require('chai').expect;
const Account = require('../../db/models/accounts.js');
const dbUtils = require('../../db/lib/utils.js');

describe('Account model tests', function () {
  // Deletes all tables, creates new tables, and seeds tables with test data
  beforeEach(function (done) {
    dbUtils.rollbackMigrate(done);
  });

  // Resets database back to original settings
  afterEach(function (done) {
    dbUtils.rollback(done);
  });

  it('Should be able to retrieve test data', function (done) {
    Account.forge().fetchAll()
      .then(function (results) {
        expect(results.length).to.equal(1);
        expect(results.models[0].id).to.equal('abcdefghijkl1234567890');
        done();
      })
      .catch(err => { done(err); });
  });

  it('Should be able to add a record', function (done) {
    // Insert a user with a username that's already in existence
    Account.forge({ 
      account_id: '99', 
      name: 'Jane Dane',
      email: 'janedane@gmail.com',
      provider: 'gmail',
      org_unit: 'label',
      sync_state: 'running'
    }).save()
      .then(function (result) {
        expect(results.length).to.equal(2);
        expect(results[1].models[0].id).to.equal('99');
      })
      .catch(function(err) { done(); });
  });
});

//   it('Should be able to update an already existing record', function (done) {
//     Profile.where({ id: 1 }).fetch()
//       .then(function (result) {
//         expect(result.get('id')).to.equal(1);
//       })
//       .then(function () {
//         return Profile.where({ id: 1 }).save({ first: 'James', last: 'Davenport' }, { method: 'update' });
//       })
//       .then(function () {
//         return Profile.where({ id: 1 }).fetch();
//       })
//       .then(function (result) {
//         expect(result.get('first')).to.equal('James');
//         expect(result.get('last')).to.equal('Davenport');
//         done();
//       })
//       .catch(function (err) {
//         // If this expect statement is reached, there's an error.
//         done(err);
//       });
//   });

//   it('Should be able to delete a record', function (done) {
//     // Inserts a user
//     Profile.where({ id: 1 }).destroy()
//       // verifies that the user has been inserted
//       .then(function () {
//         return Profile.where({ id: 1 }).fetch();
//       })
//       .then(function (result) {
//         expect(result).to.equal(null);
//         done();
//       })
//       .catch(function (err) {
//         // If this expect statement is reached, there's an error.
//         done(err);
//       });
//   });

// // });
