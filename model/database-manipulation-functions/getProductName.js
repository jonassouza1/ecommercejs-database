const database = require("../../infra/database.js");

async function getProductName(req, res) {
  const { name } = req.params;
  try {
    // Buscar produtos pelo nome (case-insensitive)
    const productsResult = await database.query({
      text: "SELECT * FROM products WHERE LOWER(name) = LOWER($1);",
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
