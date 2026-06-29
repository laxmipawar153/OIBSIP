import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto mt-12 px-6">

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="flex items-center gap-5">

          <div className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              {user?.name}
            </h1>

            <p className="text-gray-500">
              {user?.email}
            </p>
          </div>

        </div>

        <hr className="my-8" />

        <div className="space-y-4">

          <div className="flex justify-between">
            <span className="font-semibold">
              Name
            </span>

            <span>
              {user?.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Email
            </span>

            <span>
              {user?.email}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="font-semibold">
              Role
            </span>

            <span className="capitalize">
              {user?.role}
            </span>
          </div>

        </div>

        <button
          onClick={logout}
          className="mt-8 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>

      </div>

    </div>
  );
}