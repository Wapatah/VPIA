exports.up = function(knex) {
    return knex.schema.table("articles", function(table) {
        table
            .integer("topic_id", 10)
            .unsigned()
            .references("topics.id");
    });
};

exports.down = function(knex) {
    return knex.schema.table("articles", function(table) {
        table.dropColumn("topic_id");
    });
};
