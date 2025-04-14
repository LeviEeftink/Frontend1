import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function CircleDiagram({ coins }) {
  const top5 = [...coins]
    .sort((a, b) => Number(b.CIRCULATING_MKT_CAP_USD) - Number(a.CIRCULATING_MKT_CAP_USD))
    .slice(0, 5);

  const colors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];

  const data = {
    labels: top5.map((coin) => `${coin.NAME} (${coin.SYMBOL})`),
    datasets: [
      {
        label: "Market Cap (USD)",
        data: top5.map((coin) => Number(coin.CIRCULATING_MKT_CAP_USD)),
        backgroundColor: colors,
        borderColor: "#1c1c1c",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#f9fafb", // Tailwind's text-white
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const value = context.raw;
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-zinc-900 p-6 rounded-2xl shadow-lg  mx-auto mt-10">
      <h2 className="text-xl font-bold text-white mb-6 text-center">
        Top 5 Coins
      </h2>
      <div className="flex justify-center items-center h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
}
