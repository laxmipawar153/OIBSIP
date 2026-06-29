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

export default function InventoryChart({ data }) {

  const chartData = {
    labels: data.map(item => item._id),
    datasets: [
      {
        label: "Items",
        data: data.map(item => item.count),
        backgroundColor: "#10b981",
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Inventory by Category
      </h2>

      <Bar data={chartData} />

    </div>
  );
}