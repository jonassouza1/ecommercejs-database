const database = require("../../infra/database.js");

async function registerProduct(req, res) {
  const {
    name,
    image_url,
    description,
    quantity,
    price,
    category_name,
    size_name,
  } = req.body;

  // Validação básica
  if (
    !name ||
    !image_url ||
    !description ||
    !quantity ||
    !price ||
    !category_name ||
    !size_name
  ) {
    return res.status(400).json({ message: "Preencha todos os campos." });
  }

  try {
    // Busca pelo ID da categoria com base no nome
    const categoryResult = await database.query({
      text: `SELECT id FROM categories WHERE LOWER(name) = LOWER($1);`,
      values: [category_name],
    });

    if (categoryResult.rows.length === 0) {
      return res.status(404).json({ message: "Categoria não encontrada." });
    }

    const category_id = categoryResult.rows[0].id;

    // Busca pelo ID do tamanho com base no nome
    const sizeResult = await database.query({
      text: `SELECT id FROM sizes WHERE LOWER(name) = LOWER($1);`,
      values: [size_name],
    });

    if (sizeResult.rows.length === 0) {
      return res.status(404).json({ message: "Tamanho não encontrado." });
    }

    const size_id = sizeResult.rows[0].id;

    // Verifica se já existe um produto com o mesmo nome (case insensitive)
    const productExists = await database.query({
      text: `SELECT * FROM products WHERE LOWER(name) = LOWER($1);`,
      values: [name],
    });

    if (productExists.rows.length > 0) {
      return res.status(409).json({ message: "Produto já existe." });
    }

    // Inserção do novo produto
    const productResult = await database.query({
      text: `INSERT INTO products (name, image_url, description, quantity, price, category_id, size_id)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;`,
      values: [
        name,
        image_url,
        description,
        quantity,
        price,
        category_id,
        size_id,
      ],
    });

    const newProduct = productResult.rows[0];
    res.status(201).json({
      message: "Produto criado com sucesso.",
      product: newProduct,
    });
  } catch (err) {
    console.error("Erro ao criar produto:", err);
    res.status(500).json({ message: "Erro ao criar produto." });
  }
}

module.exports = { registerProduct };
