const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const authRoutes = require("./routes/auth");
const transRoutes = require("./routes/transacoes");

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get("/", (req, res) => res.send("Backend do Finance-App funcionando!"));
app.use("/api/auth", authRoutes);
app.use("/api/transacoes", transRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
