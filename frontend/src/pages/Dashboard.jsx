import { useState, useEffect } from "react";
import { api } from "../services/api";
import Grafico from "../components/Grafico";

export default function Dashboard() {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    api
      .get("/transacoes")
      .then((res) => setTransacoes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const total = transacoes.reduce((acc, t) => acc + Number(t.valor), 0);

  return (
    <div>
      <h1>Dashboard Financeiro</h1>
      <p>Saldo atual: R$ {total}</p>
      <Grafico transacoes={transacoes} />
    </div>
  );
}
