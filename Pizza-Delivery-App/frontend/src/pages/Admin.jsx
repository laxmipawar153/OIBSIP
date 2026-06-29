import { useEffect, useState } from "react";
import api from "../services/api";
import DashboardCard from "../components/admin/DashboardCard";
import OrdersTable from "../components/admin/OrdersTable";
import InventoryTable from "../components/admin/InventoryTable";
import RevenueChart from "../components/charts/RevenueChart";
import OrdersStatusChart from "../components/charts/OrdersStatusChart";
import InventoryChart from "../components/charts/InventoryChart";

export default function Admin() {
  const [data, setData] = useState(null);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
  fetchDashboard();
  fetchInventory();
}, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchInventory = async () => {

  try {

    const res = await api.get("/inventory");

    setInventory(res.data);

  } catch (error) {

    console.log(error);

  }

};

  const updateOrderStatus = async (id, status) => {

  try {

    await api.put(`/orders/${id}`, {
      orderStatus: status,
    });

    fetchDashboard();

  } catch (error) {

    console.log(error);

  }

};

const updateStock = async (id, stock) => {

  try {

    await api.put(`/inventory/${id}`, {
      stock,
    });

    fetchInventory();

    fetchDashboard();

  } catch (error) {

    console.log(error);

  }

};

  if (!data) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        🍕 PizzaHub Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <DashboardCard
          title="Total Orders"
          value={data.totalOrders}
          icon="📦"
          color="border-blue-500"
        />

        <DashboardCard
          title="Revenue"
          value={`₹${data.totalRevenue}`}
          icon="💰"
          color="border-green-500"
        />

        <DashboardCard
          title="Pizzas"
          value={data.totalPizzas}
          icon="🍕"
          color="border-orange-500"
        />

        <DashboardCard
          title="Low Stock"
          value={data.lowStockItems}
          icon="⚠️"
          color="border-red-500"
        />

      </div>

      <RevenueChart
  revenue={data.totalRevenue}
/>

<OrdersStatusChart
  data={data.orderStatusData}
/>

<InventoryChart
  data={data.inventoryCategoryData}
/>
      <OrdersTable
  orders={data.recentOrders}
  updateOrderStatus={updateOrderStatus}
/>

<InventoryTable
  inventory={inventory}
  updateStock={updateStock}
/>
    </div>
  );
}