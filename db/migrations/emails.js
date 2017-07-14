
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('accounts', function(table) {
      table.unique('account_id').primary();
      table.string('name', 100).nullable();
      table.string('email', 100).nullable();
      table.string('provider', 20).notNullable();
      table.string('org_unit', 20).notNullable();
      table.string('sync_state', 20).notNullable();
    }),
    knex.schema.createTableIfNotExists('folders', function(table) {
      table.unique('folder_id').primary();
      table.string('account_id', 100).references('account_id').inTable('accounts');
      table.string('name', 50).nullable();
      table.string('display_name', 100).nullable();
    }),
    knex.schema.createTableIfNotExists('messages', function(table) {
      table.unique('message_id').primary();
      table.string('account_id', 100).references('account_id').inTable('accounts');
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
    knex.schema.dropTable('accounts'),
    knex.schema.dropTable('folders'),
    knex.schema.dropTable('messages'),
    knex.schema.dropTable('sortedMessages')
  ]);
};

