import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function OrdersStatusChart({ data }) {

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        data: data.map(item => item.count),
        backgroundColor: [
          "#22c55e",
          "#3b82f6",
          "#f97316",
          "#ef4444",
          "#eab308",
        ],
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Orders by Status
      </h2>

      <div className="max-w-sm mx-auto">
        <Pie data={chartData} />
      </div>

    </div>
  );
}