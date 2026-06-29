import { useEffect, useState } from "react";
import api from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await api.get("/orders/my-orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="max-w-6xl mx-auto py-8 sm:py-10 px-4 sm:px-6">

      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (

        <div className="text-center py-20">

          <div className="text-7xl">🍕</div>

          <h2 className="text-3xl font-bold mt-5">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Your delicious pizzas will appear here.
          </p>

        </div>

      ) : (

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-5 sm:p-6"
            >

              {/* Header */}

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">

                <div>

                  <h2 className="text-xl font-bold">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                </div>

                <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full inline-block h-fit">
                  {order.orderStatus}
                </span>

              </div>

              {/* Pizza Items */}

              <div className="mt-5 space-y-3">

                {order.items.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >

                    <div>

                      <h3 className="font-semibold">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <span className="font-semibold">
                      ₹{item.price * item.quantity}
                    </span>

                  </div>

                ))}

              </div>

              {/* Footer */}

              <div className="mt-5 flex flex-col sm:flex-row sm:justify-between gap-3">

                <p>
                  <strong>Payment:</strong> {order.paymentStatus}
                </p>

                <p className="text-xl font-bold text-orange-600">
                  Total: ₹{order.totalAmount}
                </p>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}