exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("categories", {
    id: "id",
    name: { type: "varchar(255)", notNull: true },
  });

  pgm.sql(`
    INSERT INTO categories (name) VALUES 
    ('Camisa'),
    ('Calça'),
    ('Casaco'),
    ('Bermuda'),
    ('Roupa Íntima'),
    ('Calçado');
  `);
};

exports.down = (pgm) => {
  pgm.dropTable("categories");
};
