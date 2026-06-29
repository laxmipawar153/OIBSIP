import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">

      <div className="text-center max-w-xl">

        <div className="text-8xl mb-6 animate-bounce">
          🍕
        </div>

        <h1 className="text-6xl font-extrabold text-orange-600">
          404
        </h1>

        <h2 className="text-3xl font-bold mt-4">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-600 mt-4 text-lg">
          Looks like this pizza got delivered to the wrong address.
        </p>

        <p className="text-gray-500 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-semibold transition duration-300 shadow-lg hover:shadow-xl"
        >
          🍕 Back to Home
        </Link>

      </div>

    </div>
  );
}
