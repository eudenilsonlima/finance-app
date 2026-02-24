const express = require("express");
const router = express.Router();
const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");

router.get("/", async (req, res) => {
  const result = await pool.query(
    "SELECT * FROM transactions ORDER BY created_at DESC",
  );
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { descricao, valor, tipo, categoria } = req.body;

  const id = uuidv4();

  await pool.query("INSERT INTO transactions VALUES ($1,$2,$3,$4,$5,NOW())", [
    id,
    descricao,
    valor,
    tipo,
    categoria,
  ]);

  res.json({ id });
});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM transactions WHERE id = $1", [req.params.id]);

  res.json({ ok: true });
});

module.exports = router;
