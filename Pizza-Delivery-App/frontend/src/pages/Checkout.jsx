import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import toast from "react-hot-toast";

export default function Checkout() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const { data } = await api.post("/payment/create-order", {
        amount: totalPrice,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "PizzaHub",
        description: "Pizza Order",
        order_id: data.id,

        handler: async function (response) {
          try {
            // Verify Payment
            await api.post("/payment/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            // Prepare Order Items
            const items = cart.map((item) => ({
              pizza: item._id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
            }));

            // Save Order
            await api.post("/orders", {
              items,
              totalAmount: totalPrice,
              paymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
            });

            clearCart();

            toast.success("🍕 Order Placed Successfully!");

            navigate("/orders");

          } catch (error) {
            console.log(error);
            toast.error("Order could not be saved.");
          }
        },

        theme: {
          color: "#ea580c",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();

    } catch (err) {
      console.log(err);
      toast.error("Payment Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-10 px-4 sm:px-6">

      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Checkout
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-bold mb-5">
          Order Summary
        </h2>

        {cart.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center py-2 gap-4"
          >
            <span className="break-words">
              {item.name} × {item.quantity}
            </span>

            <span>
              ₹{item.price * item.quantity}
            </span>
          </div>
        ))}

        <hr className="my-5" />

        <h2 className="text-xl sm:text-2xl font-bold">
          Total ₹{totalPrice}
        </h2>

        <p className="text-sm text-gray-500 mt-5 text-center">
          🔒 Secure payments powered by Razorpay
        </p>

        <button
          onClick={handlePayment}
          className="mt-4 w-full bg-orange-600 hover:bg-orange-700 transition text-white px-6 py-3 rounded-lg font-semibold"
        >
          Pay with Razorpay
        </button>

      </div>

    </div>
  );
}

