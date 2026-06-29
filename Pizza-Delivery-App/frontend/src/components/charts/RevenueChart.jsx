import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function RevenueChart({ revenue }) {
  const data = {
    labels: ["Revenue"],
    datasets: [
      {
        label: "Total Revenue",
        data: [revenue],
        backgroundColor: "#f97316",
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-5">
        Revenue Overview
      </h2>

      <Bar data={data} />
    </div>
  );
}