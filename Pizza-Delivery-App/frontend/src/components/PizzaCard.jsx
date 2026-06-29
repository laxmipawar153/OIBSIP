import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";


export default function PizzaCard({ pizza }) {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">

      <img
        src={pizza.image}
        alt={pizza.name}
        className="w-full h-48 sm:h-56 object-cover"
      />

      <div className="p-5">

        <h2 className="text-xl sm:text-2xl font-bold">
          {pizza.name}
        </h2>

        <p className="text-gray-600 mt-2">
          {pizza.description}
        </p>

        <div className="flex justify-between items-center mt-5">

          <span className="text-orange-600 text-xl sm:text-2xl font-bold">
            ₹{pizza.price}
          </span>

          <button
  onClick={() => {
    addToCart(pizza);
    toast.success("Pizza added to cart 🍕");
  }}
  className="bg-orange-600 hover:bg-orange-700 transition text-white px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base"
>
  Add to Cart
</button>

        </div>

      </div>

    </div>
  );
}