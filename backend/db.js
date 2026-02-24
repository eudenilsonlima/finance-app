const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool
  .connect()
  .then(() => console.log("Banco conectado com sucesso"))
  .catch((err) => console.error("Erro ao conectar:", err));

module.exports = pool;
