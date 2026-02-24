import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [tipo, setTipo] = useState("despesa");

  const carregar = () => {
    axios
      .get("http://localhost:3001/transactions")
      .then((res) => setTransactions(res.data));
  };

  useEffect(() => {
    carregar();
  }, []);

  const adicionar = async () => {
    await axios.post("http://localhost:3001/transactions", {
      descricao,
      valor,
      tipo,
      categoria: "geral",
    });

    setDescricao("");
    setValor("");
    carregar();
  };

  const deletar = async (id) => {
    await axios.delete(`http://localhost:3001/transactions/${id}`);
    carregar();
  };

  const receitas = transactions
    .filter((t) => t.tipo === "receita")
    .reduce((a, b) => a + b.valor, 0);

  const despesas = transactions
    .filter((t) => t.tipo === "despesa")
    .reduce((a, b) => a + b.valor, 0);

  const saldo = receitas - despesas;

  return (
    <div className="container">
      <h1>Controle Financeiro</h1>

      <div className="cards">
        <div className="card">Saldo: R$ {saldo}</div>
        <div className="card">Receitas: R$ {receitas}</div>
        <div className="card">Despesas: R$ {despesas}</div>
      </div>

      <h2>Nova Transação</h2>

      <input
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <input
        placeholder="Valor"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="despesa">Despesa</option>
        <option value="receita">Receita</option>
      </select>

      <button onClick={adicionar}>Adicionar</button>

      <h2>Transações</h2>

      {transactions.map((t) => (
        <div key={t.id} className="item">
          {t.descricao} - R$ {t.valor}
          <button onClick={() => deletar(t.id)}>Excluir</button>
        </div>
      ))}
    </div>
  );
}
