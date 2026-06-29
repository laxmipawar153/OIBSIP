import { useEffect, useState } from "react";
import api from "../services/api";
import PizzaCard from "../components/PizzaCard";
import SkeletonCard from "../components/SkeletonCard";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const res = await api.get("/pizzas");
      setPizzas(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPizzas = pizzas.filter((pizza) => {
    const matchesSearch = pizza.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || pizza.category === category;

    return matchesSearch && matchesCategory;
  });

  const sortedPizzas = [...filteredPizzas];

  if (sortBy === "priceLow") {
    sortedPizzas.sort((a, b) => a.price - b.price);
  }

  if (sortBy === "priceHigh") {
    sortedPizzas.sort((a, b) => b.price - a.price);
  }

  if (sortBy === "name") {
    sortedPizzas.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <>
      {/* Hero */}

      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            Delicious Pizza Delivered Fast 🍕
          </h1>

          <p className="mt-5 text-lg sm:text-xl">
            Fresh Pizza • Fast Delivery • Best Taste
          </p>

        </div>

      </section>

      {/* Pizza Section */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-10">

          <h2 className="text-4xl font-bold">
            Popular Pizzas
          </h2>

          <input
            type="text"
            placeholder="🔍 Search Pizza..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Sort By</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
            <option value="name">Name: A → Z</option>
          </select>

        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-10">

          <button
            onClick={() => setCategory("All")}
            className={`px-5 py-2 rounded-lg transition ${
              category === "All"
                ? "bg-orange-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setCategory("Veg")}
            className={`px-5 py-2 rounded-lg transition ${
              category === "Veg"
                ? "bg-green-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            🥬 Veg
          </button>

          <button
            onClick={() => setCategory("Non-Veg")}
            className={`px-5 py-2 rounded-lg transition ${
              category === "Non-Veg"
                ? "bg-red-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            🍗 Non-Veg
          </button>

        </div>

        {loading ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {[...Array(6)].map((_, index) => (
              <SkeletonCard key={index} />
            ))}

          </div>

        ) : sortedPizzas.length === 0 ? (

          <div className="text-center py-20">

            <div className="text-7xl mb-5">
              🍕
            </div>

            <h2 className="text-3xl font-bold">
              No Pizzas Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing your search or category.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
                setSortBy("");
              }}
              className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl transition"
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {sortedPizzas.map((pizza) => (
              <PizzaCard
                key={pizza._id}
                pizza={pizza}
              />
            ))}

          </div>

        )}

      </section>
    </>
  );
}
