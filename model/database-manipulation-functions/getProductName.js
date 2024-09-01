const database = require("../../infra/database.js");

async function getProductName(req, res) {
  let { name } = req.params;
  if (!name) {
    return res.status(400).json({ message: "Nome do produto não fornecido." });
  }

  name = name.trim();

  try {
    const productsResult = await database.query({
      text: `
        SELECT p.*, s.name AS size_name, c.name AS category_name
        FROM products p
        LEFT JOIN sizes s ON p.size_id = s.id
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE LOWER(TRIM(p.name)) = LOWER($1);
      `,
      values: [name],
    });

    if (productsResult.rows.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.status(200).json({
      products: productsResult.rows,
    });
  } catch (err) {
    console.error("Erro ao buscar produto:", err);
    res.status(500).json({ message: "Erro ao buscar produto." });
  }
}

module.exports = { getProductName };
