import React, { useState, useEffect } from "react";
// Importe a 'api' do seu arquivo api.js (ajuste o caminho se necessário)
import { api } from "./services/api";
import Dashboard from "./pages/Dashboard";

function App() {
  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);

  useEffect(() => {
    // Agora usamos api.get em vez de axios.get
    // Note que não precisamos repetir a URL toda, só o final da rota!
    api
      .get("/despesas")
      .then((res) => setDespesas(res.data))
      .catch((err) => console.error("Erro despesas:", err));

    api
      .get("/receitas")
      .then((res) => setReceitas(res.data))
      .catch((err) => console.error("Erro receitas:", err));
  }, []);

  return (
    <div className="App">
      <Dashboard despesas={despesas} receitas={receitas} />
    </div>
  );
}

export default App;
