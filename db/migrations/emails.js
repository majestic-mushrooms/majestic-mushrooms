
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('accounts', function(table) {
      table.string('account_id', 100).primary();
      table.unique('account_id');
      table.string('name', 100).nullable();
      table.string('email', 100).nullable();
      table.string('provider', 20).notNullable();
      table.string('org_unit', 20).notNullable();
      table.string('sync_state', 20).notNullable();
    }),
    knex.schema.createTableIfNotExists('folders', function(table) {
      table.string('folder_id', 100).primary();
      table.unique('folder_id');
      table.string('account_id', 100).references('accounts.account_id');
      table.string('name', 50).nullable(); //could be enum
      table.string('display_name', 100).nullable();
    }),
    knex.schema.createTableIfNotExists('messages', function(table) {
      table.string('message_id', 100).primary();
      table.unique('message_id');
      table.string('account_id', 100).references('accounts.account_id');
      table.string('thread_id', 100).nullable(); //foreign key to threads if we import threads
      table.string('subject', 100).nullable();
      table.json('from').notNullable(); //arrays need to be JSON.stringified 
      table.json('to').notNullable();
      table.json('cc').nullable();
      table.json('bcc').nullable();
      table.json('reply_to').nullable();
      table.timestamp('date_received').notNullable().index().defaultTo(knex.fn.now()); //index for table
      table.boolean('unread').notNullable();
      table.boolean('starred').notNullable();
      table.string('snippet', 500).nullable();
      table.string('body', 5000).nullable();
      table.json('files').nullable();
      table.json('events').nullable();
      table.json('folders').nullable();
      table.json('labels').nullable();
    }),
    knex.schema.createTableIfNotExists('sortedMessages', function(table) {
      table.increments('id').unsigned().primary();
      table.string('message_id', 100);
      table.string('folder_id', 100);
      table.foreign('message_id').references('messages.message_id');
      table.foreign('folder_id').references('folders.folder_id');
    })
  ]);
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE accounts CASCADE'),
    knex.raw('DROP TABLE folders CASCADE'),
    knex.raw('DROP TABLE messages CASCADE'),
    knex.raw('DROP TABLE "sortedMessages" CASCADE')
  ]);
};