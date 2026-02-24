import { useState, useEffect } from "react";
import api from "../services/api";
import Grafico from "../components/Grafico";
import "./Dashboard.css"; // Vamos criar este arquivo abaixo

export default function Dashboard() {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    api
      .get("/transacoes")
      .then((res) => setTransacoes(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Lógica para os 3 Cards
  const receitas = transacoes
    .filter((t) => t.tipo === "receita")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const despesas = transacoes
    .filter((t) => t.tipo === "despesa")
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const saldoAtual = receitas - despesas;

  return (
    <div className="container">
      <header className="header">
        <h1>Financeiro</h1>
        <div className="user-profile">Olá, Carlos!</div>
      </header>

      {/* Seção de Cards - IGUAL AO SEU DESIGN */}
      <div className="summary">
        <div className="card balance">
          <p>Saldo Atual</p>
          <h3>
            R${" "}
            {saldoAtual.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </h3>
        </div>
        <div className="card expenses">
          <p>Despesas do Mês</p>
          <h3 className="red">
            R$ {despesas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </h3>
        </div>
        <div className="card income">
          <p>Receitas do Mês</p>
          <h3 className="green">
            R$ {receitas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </h3>
        </div>
      </div>

      {/* Gráfico */}
      <div className="chart-section">
        <h3>Evolução do Saldo</h3>
        <Grafico transacoes={transacoes} />
      </div>

      {/* Tabela de Transações */}
      <div className="transactions">
        <h3>Transações Recentes</h3>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Categoria</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map((t) => (
              <tr key={t._id}>
                <td>{t.descricao}</td>
                <td>{t.categoria || "Geral"}</td>
                <td className={t.tipo === "despesa" ? "red" : "green"}>
                  {t.tipo === "despesa" ? "-" : "+"} R${" "}
                  {Number(t.valor).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
