const database = require("../../infra/database.js");

async function updateProductData(req, res) {
  const {
    name,
    new_name,
    image_url,
    description,
    quantity,
    price,
    category_name,
    size_name,
  } = req.body;

  try {
    // Buscar o produto pelo nome (case-insensitive)
    const productResult = await database.query({
      text: "SELECT * FROM products WHERE LOWER(name) = LOWER($1);",
      values: [name],
    });

    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    // Obter o ID da categoria com base no nome da categoria, se fornecido
    let categoryId = productResult.rows[0].category_id; // Categoria existente no produto

    if (category_name) {
      const categoryResult = await database.query({
        text: "SELECT id FROM categories WHERE LOWER(name) = LOWER($1);",
        values: [category_name],
      });

      if (categoryResult.rows.length > 0) {
        categoryId = categoryResult.rows[0].id;
      } else {
        return res.status(400).json({ message: "Categoria não encontrada." });
      }
    }

    // Obter o ID do tamanho com base no nome do tamanho, se fornecido
    let sizeId = productResult.rows[0].size_id; // Tamanho existente no produto

    if (size_name) {
      const sizeResult = await database.query({
        text: "SELECT id FROM sizes WHERE LOWER(name) = LOWER($1);",
        values: [size_name],
      });

      if (sizeResult.rows.length > 0) {
        sizeId = sizeResult.rows[0].id;
      } else {
        return res.status(400).json({ message: "Tamanho não encontrado." });
      }
    }

    // Atualizar os dados do produto
    const updateResult = await database.query({
      text: `
        UPDATE products
        SET
          name = $2,
          image_url = $3,
          description = $4,
          quantity = $5,
          price = $6,
          category_id = $7,
          size_id = $8
        WHERE LOWER(name) = LOWER($1)
        RETURNING *;
      `,
      values: [
        name,
        new_name || productResult.rows[0].name,
        image_url || productResult.rows[0].image_url,
        description || productResult.rows[0].description,
        quantity || productResult.rows[0].quantity,
        price || productResult.rows[0].price,
        categoryId,
        sizeId,
      ],
    });

    res.status(200).json({
      message: "Produto atualizado com sucesso.",
      product: updateResult.rows[0],
    });
  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ message: "Erro ao atualizar produto." });
  }
}

module.exports = { updateProductData };
