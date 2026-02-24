import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Este passo é obrigatório no Chart.js v4+ para registrar as escalas
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Grafico({ transacoes }) {
  // Prepara os dados para o gráfico
  const data = {
    labels:
      transacoes.length > 0
        ? transacoes.map((t) => t.descricao)
        : ["Nenhuma transação"],
    datasets: [
      {
        label: "Valor (R$)",
        data: transacoes.length > 0 ? transacoes.map((t) => t.valor) : [0],
        backgroundColor: transacoes.map((t) =>
          t.tipo === "receita"
            ? "rgba(46, 204, 113, 0.6)"
            : "rgba(231, 76, 60, 0.6)",
        ),
        borderColor: transacoes.map((t) =>
          t.tipo === "receita"
            ? "rgba(46, 204, 113, 1)"
            : "rgba(231, 76, 60, 1)",
        ),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Fluxo de Caixa" },
    },
  };

  return (
    <div style={{ height: "300px", marginBottom: "20px" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
