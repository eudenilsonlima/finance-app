const pool = require("../db");

const createUser = async (nome, email, senha) => {
  const result = await pool.query(
    "INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING *",
    [nome, email, senha],
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  return result.rows[0];
};

module.exports = { createUser, findUserByEmail };
