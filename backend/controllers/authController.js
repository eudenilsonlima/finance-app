const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../models/userModel");

const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const hashed = await bcrypt.hash(senha, 10);
    const existing = await findUserByEmail(email);
    if (existing)
      return res.status(400).json({ message: "Email já cadastrado" });

    const user = await createUser(nome, email, hashed);
    res.json({ message: "Usuário cadastrado", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(400).json({ message: "Email não encontrado" });

    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(400).json({ message: "Senha incorreta" });

    res.json({ message: "Login realizado", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login };
