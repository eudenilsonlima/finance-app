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

// Registro obrigatório dos componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function Grafico({ transacoes }) {
  // Garante que o gráfico não quebre se não houver transações
  const data = {
    labels:
      transacoes.length > 0
        ? transacoes.map((t) => t.descricao)
        : ["Sem dados"],
    datasets: [
      {
        label: "Valor (R$)",
        data: transacoes.length > 0 ? transacoes.map((t) => t.valor) : [0],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Resumo de Transações",
      },
    },
  };

  return <Bar data={data} options={options} />;
}
