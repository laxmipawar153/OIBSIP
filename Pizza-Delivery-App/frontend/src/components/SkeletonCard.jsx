export default function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">

      <div className="h-56 bg-gray-300"></div>

      <div className="p-5">

        <div className="h-6 bg-gray-300 rounded w-2/3 mb-4"></div>

        <div className="h-4 bg-gray-300 rounded mb-2"></div>

        <div className="h-4 bg-gray-300 rounded w-5/6 mb-6"></div>

        <div className="flex justify-between items-center">

          <div className="h-8 w-20 bg-gray-300 rounded"></div>

          <div className="h-10 w-28 bg-gray-300 rounded"></div>

        </div>

      </div>

    </div>
  );
}