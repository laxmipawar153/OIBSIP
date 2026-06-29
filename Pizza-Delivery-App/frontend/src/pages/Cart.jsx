import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">

        <div className="text-center max-w-lg">

          <div className="text-8xl mb-6">
            🛒
          </div>

          <h1 className="text-4xl font-bold">
            Your Cart is Empty
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Looks like you haven't added any delicious pizzas yet.
          </p>

          <Link
            to="/"
            className="inline-block mt-8 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl"
          >
            🍕 Continue Shopping
          </Link>

        </div>

      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">

      <h1 className="text-3xl sm:text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      {cart.map((item) => (
        <div
          key={item._id}
          className="bg-white shadow rounded-xl p-5 mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 hover:shadow-lg transition"
        >

          <div className="flex-1">

            <h2 className="text-2xl font-semibold">
              {item.name}
            </h2>

            <p className="text-gray-600 mt-1">
              ₹{item.price}
            </p>

          </div>

          <div className="flex items-center justify-center gap-3">

            <button
              onClick={() => decreaseQuantity(item._id)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition"
            >
              −
            </button>

            <span className="font-semibold text-lg">
              {item.quantity}
            </span>

            <button
              onClick={() => increaseQuantity(item._id)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded transition"
            >
              +
            </button>

          </div>

          <button
            onClick={() => removeFromCart(item._id)}
            className="bg-red-500 hover:bg-red-600 transition text-white px-5 py-2 rounded-lg w-full sm:w-auto"
          >
            Remove
          </button>

        </div>
      ))}

      <div className="mt-10 bg-white rounded-xl shadow p-6">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-5">

          <div>

            <p className="text-gray-500">
              Total Amount
            </p>

            <h2 className="text-3xl font-bold text-orange-600">
              ₹{totalPrice}
            </h2>

          </div>

          <Link
            to="/checkout"
            className="w-full sm:w-auto text-center bg-orange-600 hover:bg-orange-700 transition text-white px-8 py-3 rounded-xl font-semibold"
          >
            Proceed to Checkout →
          </Link>

        </div>

      </div>

    </div>
  );
}