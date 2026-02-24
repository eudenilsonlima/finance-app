const pool = require("../db");

const getAllTransacoes = async (user_id) => {
  const result = await pool.query(
    "SELECT * FROM transacoes WHERE user_id=$1 ORDER BY data DESC",
    [user_id],
  );
  return result.rows;
};

const createTransacao = async (descricao, valor, user_id) => {
  const result = await pool.query(
    "INSERT INTO transacoes (descricao, valor, user_id) VALUES ($1, $2, $3) RETURNING *",
    [descricao, valor, user_id],
  );
  return result.rows[0];
};

module.exports = { getAllTransacoes, createTransacao };
