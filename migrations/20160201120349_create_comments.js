exports.up = function(knex, Promise) {
  return knex.schema.createTable('comments', function(table){
    table.increments();
    table.timestamps();
    table.integer('bin_id');
    table.integer('user_id');
    table.text('comment');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('comments');
};
