const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
require("dotenv").config({ path: ".env.development" });
const {
  getProductName,
} = require("./model/database-manipulation-functions/getProductName.js");
const {
  getAllProducts,
} = require("./model/database-manipulation-functions/getAllProducts.js");
const { dataBaseStatus } = require("./model/database-status/dataBaseStatus.js");
const {
  registerProduct,
} = require("./model/database-manipulation-functions/registerProduct.js");
const {
  updateProductData,
} = require("./model/database-manipulation-functions/updateProductData.js");
const {
  deleteProduct,
} = require("./model/database-manipulation-functions/deleteProduct.js");
const {
  runnerMigrations,
} = require("./model/migrations-runner-endpoint/migrations.js");
const authMiddleware = require("./model/token/acessToken.js");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(authMiddleware);

app.delete("/products", async (req, res) => {
  await deleteProduct(req, res);
});

app.put("/products/:name", async (req, res) => {
  await updateProductData(req, res);
});

app.post("/products", async (req, res) => {
  await registerProduct(req, res);
});
app.get("/products", async (req, res) => {
  await getAllProducts(req, res);
});

app.get("/products/:name", async (req, res) => {
  await getProductName(req, res);
});

app.get("/status", async (req, res) => {
  await dataBaseStatus(req, res);
});
app.get("/migrations", async (req, res) => {
  await runnerMigrations(req, res);
});
app.post("/migrations", async (req, res) => {
  await runnerMigrations(req, res);
});
app.use((err, req, res, next) => {
  console.error(err.stack); // Log do erro no servidor
  res.status(500).json({ message: "Ocorreu um erro no servidor!" });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`O servidor está sendo executado na porta ${PORT}`);
});
