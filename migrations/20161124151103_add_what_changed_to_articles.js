exports.up = function(knex) {
    return knex.schema.table("articles", function(table) {
        table.string("what_changed");
    });
};

exports.down = function(knex) {
    return knex.schema.table("articles", function(table) {
        table.dropColumn("what_changed");
    });
};
