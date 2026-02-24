import React, { useState, useEffect } from "react";
import axios from "axios"; // ESSA LINHA RESOLVE O ERRO "axios is not defined"
import Dashboard from "./pages/Dashboard";

function App() {
  const [despesas, setDespesas] = useState([]);
  const [receitas, setReceitas] = useState([]);

  // Use a URL direta do Render aqui para garantir que funcione na Vercel
  const API_URL = "https://denilson-finance-app.onrender.com";

  useEffect(() => {
    // Busca Despesas
    axios
      .get(`${API_URL}/api/despesas`)
      .then((res) => setDespesas(res.data))
      .catch((err) => console.error("Erro despesas:", err));

    // Busca Receitas
    axios
      .get(`${API_URL}/api/receitas`)
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
