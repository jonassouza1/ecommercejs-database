const database = require("../../infra/database.js");

async function getAllProducts(req, res) {
  const { category_name } = req.query;
  try {
    let queryText = `
      SELECT 
        products.*, 
        categories.name as category_name,
        sizes.name as size_name  -- Seleciona o nome do tamanho
      FROM products
      LEFT JOIN categories ON products.category_id = categories.id
      LEFT JOIN sizes ON products.size_id = sizes.id  -- Junta a tabela de tamanhos para obter o nome do tamanho
    `;

    const queryParams = [];

    if (category_name) {
      queryText += ` WHERE LOWER(categories.name) = LOWER($1)`;
      queryParams.push(category_name);
    }

    const productsResult = await database.query({
      text: queryText,
      values: queryParams,
    });

    res.status(200).json({
      products: productsResult.rows,
    });
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
}

module.exports = { getAllProducts };
