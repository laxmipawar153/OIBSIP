export default function InventoryTable({
  inventory,
  updateStock,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

      <h2 className="text-2xl font-bold mb-6">
        Inventory Management
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Item
              </th>

              <th className="text-left py-3">
                Category
              </th>

              <th className="text-left py-3">
                Stock
              </th>

              <th className="text-left py-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {inventory.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-4">

                  {item.itemName}

                </td>

                <td>

                  {item.category}

                </td>

                <td>

                  <span
                    className={`font-bold ${
                      item.stock <= item.threshold
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {item.stock}
                  </span>

                </td>

                <td className="space-x-2">

                  <button
                    onClick={() =>
                      updateStock(item._id, item.stock + 1)
                    }
                    className="bg-green-500 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() =>
                      updateStock(item._id, item.stock - 1)
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}