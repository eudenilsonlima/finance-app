const {
  getAllTransacoes,
  createTransacao,
} = require("../models/transacaoModel");

const listar = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const transacoes = await getAllTransacoes(user_id);
    res.json(transacoes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const adicionar = async (req, res) => {
  try {
    const { descricao, valor, user_id } = req.body;
    const transacao = await createTransacao(descricao, valor, user_id);
    res.json(transacao);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { listar, adicionar };
