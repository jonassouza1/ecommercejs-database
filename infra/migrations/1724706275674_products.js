exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("products", {
    id: "id",
    name: { type: "varchar(255)", notNull: true },
    image_url: { type: "varchar(555)" },
    description: { type: "text" },
    quantity: { type: "integer", notNull: true },
    price: { type: "decimal(10, 2)", notNull: true },
    category_id: { type: "integer" },
    size_id: { type: "integer" }, // Nova coluna para a chave estrangeira de sizes
  });

  pgm.addConstraint("products", "fk_products_category", {
    foreignKeys: {
      columns: "category_id",
      references: "categories(id)",
      onDelete: "SET NULL",
    },
  });

  pgm.addConstraint("products", "fk_products_size", {
    // Nova chave estrangeira para a tabela sizes
    foreignKeys: {
      columns: "size_id",
      references: "sizes(id)",
      onDelete: "SET NULL",
    },
  });

  pgm.sql(`
    INSERT INTO products (name, image_url, description, quantity, price, category_id, size_id) VALUES 
    ('Camisa Polo', './public/camisa_polo.jpg', 'Camisa Polo de Algodão', 1, 79.90, (SELECT id FROM categories WHERE name = 'Camisa'), (SELECT id FROM sizes WHERE name = 'M')),
    ('Calça Jeans', './public/calca_jeans.jpg', 'Calça Jeans Azul', 4, 129.90, (SELECT id FROM categories WHERE name = 'Calça'), (SELECT id FROM sizes WHERE name = 'G')),
    ('Casaco de Lã', './public/casaco_la.jpg', 'Casaco de Lã Quente', 20, 199.90, (SELECT id FROM categories WHERE name = 'Casaco'), (SELECT id FROM sizes WHERE name = 'GG')),
    ('Bermuda Jeans', './public/bermuda_jeans.jpg', 'Bermuda Curta de Jeans', 2, 169.90, (SELECT id FROM categories WHERE name = 'Bermuda'), (SELECT id FROM sizes WHERE name = 'P')),
      ('Camisa Fit', './public/camisa_fit.jpg', 'Camisa Fit de Poliester', 4, 59.90, (SELECT id FROM categories WHERE name = 'Camisa'), (SELECT id FROM sizes WHERE name = 'G')),
    ('Calça Moletom', './public/calca_moletom.jpg', 'Calça Moletom Verde', 3, 140.99, (SELECT id FROM categories WHERE name = 'Calça'), (SELECT id FROM sizes WHERE name = 'GG')),
    ('Casaco de Couro', './public/casaco_couro.jpg', 'Casaco de Couro Preto', 2, 399.99, (SELECT id FROM categories WHERE name = 'Casaco'), (SELECT id FROM sizes WHERE name = 'G')),
    ('Bermuda Fit', './public/bermuda_fit.jpg', 'Bermuda de Correr', 5, 69.90, (SELECT id FROM categories WHERE name = 'Bermuda'), (SELECT id FROM sizes WHERE name = 'P')),
    ('Camisa Social', './public/camisa_social.jpg', 'Camisa Social de Algodão', 1, 109.90, (SELECT id FROM categories WHERE name = 'Camisa'), (SELECT id FROM sizes WHERE name = 'G')),
    ('Calça Legging', './public/calca_legging.jpg', 'Calça legging Rosa', 8, 179.90, (SELECT id FROM categories WHERE name = 'Calça'), (SELECT id FROM sizes WHERE name = 'M')),
    ('Casaco Fit', './public/casaco_fit.jpg', 'Casaco Fit Leve', 20, 139.95, (SELECT id FROM categories WHERE name = 'Casaco'), (SELECT id FROM sizes WHERE name = 'M')),
    ('Calção Surf', './public/calcao_surf.jpg', 'Calção Curto de Surf', 2, 89.40, (SELECT id FROM categories WHERE name = 'Bermuda'), (SELECT id FROM sizes WHERE name = 'M')),
      ('Camisa Surf', './public/camisa_surf.jpg', 'Camisa Surf de Algodão', 6, 99.80, (SELECT id FROM categories WHERE name = 'Camisa'), (SELECT id FROM sizes WHERE name = 'GG')),
    ('Calça Fit', './public/calca_fit.jpg', 'Calça Fit Cinza', 1, 150.00, (SELECT id FROM categories WHERE name = 'Calça'), (SELECT id FROM sizes WHERE name = 'XGG')),
    ('Casaco Peludo', './public/casaco_peludo.jpg', 'Casaco de Pelo Quente', 3, 599.99, (SELECT id FROM categories WHERE name = 'Casaco'), (SELECT id FROM sizes WHERE name = 'P')),
    ('Bermuda Moletom', './public/bermuda_moletom.jpg', 'Bermuda de Moletom Preta', 2, 38.90, (SELECT id FROM categories WHERE name = 'Bermuda'), (SELECT id FROM sizes WHERE name = 'XGG'));
  `);
};

exports.down = (pgm) => {
  pgm.dropConstraint("products", "fk_products_size"); // Remover a chave estrangeira para sizes
  pgm.dropTable("products");
};
