import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";

export default function VerifyEmail() {

  const { token } = useParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    verifyEmail();
  }, []);

  const verifyEmail = async () => {

    try {

      const res = await api.get(`/auth/verify-email/${token}`);

      setSuccess(true);
      setMessage(res.data.message);

    } catch (err) {

      setSuccess(false);

      setMessage(
        err.response?.data?.message ||
        "Verification Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <div className="flex justify-center items-center min-h-screen">

        <h1 className="text-2xl font-bold">
          Verifying Email...
        </h1>

      </div>

    );

  }

  return (

    <div className="flex justify-center items-center min-h-screen bg-gray-100">

      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md text-center">

        <h1 className="text-3xl font-bold mb-5">

          {success ? "✅ Success" : "❌ Failed"}

        </h1>

        <p className="mb-6">

          {message}

        </p>

        <Link

          to="/login"

          className="bg-orange-600 text-white px-6 py-3 rounded-lg"

        >

          Go To Login

        </Link>

      </div>

    </div>

  );

}