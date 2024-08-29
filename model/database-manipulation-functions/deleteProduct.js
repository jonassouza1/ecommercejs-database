const database = require("../../infra/database.js");

async function deleteProduct(req, res) {
  const { name } = req.body;
  try {
    const result = await database.query({
      text: "DELETE FROM products WHERE name = $1;",
      values: [name],
    });

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    res.status(200).json({
      message: "Produto deletado com sucesso.",
    });
  } catch (err) {
    console.error("Erro ao deletar produto:", err);
    res.status(500).json({ message: "Erro ao deletar produto." });
  }
}
module.exports = { deleteProduct };
