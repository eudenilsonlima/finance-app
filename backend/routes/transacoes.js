const express = require("express");
const router = express.Router();
const { listar, adicionar } = require("../controllers/transacaoController");

router.get("/", listar); // ?user_id=1
router.post("/", adicionar);

module.exports = router;
