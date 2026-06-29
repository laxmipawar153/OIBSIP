import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { user, logout } = useAuth();
const { cart } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="text-3xl font-bold text-orange-600">
          🍕 PizzaHub
        </Link>

        <div className="flex items-center gap-6">

          <NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-orange-600 font-bold"
      : "hover:text-orange-600 transition"
  }
>
  Home
</NavLink>

          <NavLink
  to="/cart"
  className="relative font-medium hover:text-orange-600 transition"
>
  🛒 Cart

  {cart.length > 0 && (
    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full px-2">
      {cart.length}
    </span>
  )}
</NavLink>

          {user ? (
            <>
              <NavLink
  to="/orders"
  className={({ isActive }) =>
    isActive
      ? "text-orange-600 font-bold"
      : "hover:text-orange-600 transition"
  }
>
  Orders
</NavLink>

              <div className="flex items-center gap-2">

  <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
    {user.name.charAt(0).toUpperCase()}
  </div>

  <span className="font-semibold">
    {user.name}
  </span>

</div>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
  to="/login"
  className={({ isActive }) =>
    isActive
      ? "text-orange-600 font-bold"
      : "hover:text-orange-600 transition"
  }
>
  Login
</NavLink>

              <NavLink
                to="/register"
                className="bg-orange-600 hover:bg-orange-700 transition text-white px-4 py-2 rounded-lg"
              >
                Register
              </NavLink>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}