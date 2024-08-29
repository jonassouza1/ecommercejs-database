exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("sizes", {
    id: "id",
    name: { type: "varchar(50)", notNull: true },
  });

  pgm.sql(`
    INSERT INTO sizes (name) VALUES 
    ('P'),
    ('M'),
    ('G'),
    ('GG'),
    ('XGG');
  `);
};

exports.down = (pgm) => {
  pgm.dropTable("sizes");
};
