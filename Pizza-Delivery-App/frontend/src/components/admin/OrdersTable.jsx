export default function OrdersTable({
  orders,
  updateOrderStatus,
}) {

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Recent Orders
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Payment</th>
              <th className="text-left py-3">Status</th>

            </tr>

          </thead>

          <tbody>

            {orders.map((order) => (

              <tr
                key={order._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">

                  {order.user?.name || "Unknown"}

                </td>

                <td>

                  ₹{order.totalAmount}

                </td>

                <td>

                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm ${
                      order.paymentStatus === "Paid"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  >

                    {order.paymentStatus}

                  </span>

                </td>

                <td>

                  <select
  value={order.orderStatus}
  onChange={(e) =>
    updateOrderStatus(order._id, e.target.value)
  }
  className="border rounded-lg px-3 py-2"
>

  <option>Order Received</option>

  <option>Preparing</option>

  <option>Out for Delivery</option>

  <option>Delivered</option>

  <option>Cancelled</option>

</select>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}