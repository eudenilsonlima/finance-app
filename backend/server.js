const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* TESTE API */
app.get("/", (req, res) => {
  res.send("API do App Financeiro funcionando 🚀");
});

/* CRIAR USUÁRIO */
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, password],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar usuário");
  }
});

/* CRIAR CONTA */
app.post("/accounts", async (req, res) => {
  try {
    const { user_id, name, bank, balance } = req.body;

    const result = await pool.query(
      "INSERT INTO accounts (user_id, name, bank, balance) VALUES ($1,$2,$3,$4) RETURNING *",
      [user_id, name, bank, balance],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar conta");
  }
});

/* LISTAR CONTAS */
app.get("/accounts", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM accounts");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Erro ao buscar contas");
  }
});

/* CRIAR TRANSAÇÃO */
app.post("/transactions", async (req, res) => {
  try {
    const {
      user_id,
      account_id,
      category_id,
      type,
      description,
      amount,
      transaction_date,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO transactions 
      (user_id, account_id, category_id, type, description, amount, transaction_date) 
      VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [
        user_id,
        account_id,
        category_id,
        type,
        description,
        amount,
        transaction_date,
      ],
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar transação");
  }
});

/* LISTAR TRANSAÇÕES */
app.get("/transactions", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM transactions");
    res.json(result.rows);
  } catch (error) {
    res.status(500).send("Erro ao buscar transações");
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
