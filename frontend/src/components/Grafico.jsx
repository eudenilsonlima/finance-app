import { Bar } from "react-chartjs-2";

export default function Grafico({ transacoes }) {
  const data = {
    labels: transacoes.map((t) => t.descricao),
    datasets: [
      {
        label: "Valor",
        data: transacoes.map((t) => t.valor),
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };
  return <Bar data={data} />;
}
