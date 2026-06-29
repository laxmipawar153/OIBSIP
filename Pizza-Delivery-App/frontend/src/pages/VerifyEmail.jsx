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

    } catch (error) {

      setSuccess(false);

      setMessage(
        error.response?.data?.message ||
        "Verification Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="flex items-center justify-center min-h-[70vh]">

      <div className="bg-white shadow-xl rounded-xl p-10 text-center w-[420px]">

        {loading ? (

          <>
            <h1 className="text-3xl font-bold">
              Verifying...
            </h1>
          </>

        ) : success ? (

          <>
            <div className="text-6xl mb-4">
              ✅
            </div>

            <h1 className="text-3xl font-bold text-green-600">
              Email Verified
            </h1>

            <p className="mt-3 text-gray-600">
              {message}
            </p>

            <Link
              to="/login"
              className="inline-block mt-6 bg-orange-600 text-white px-6 py-3 rounded-lg"
            >
              Login Now
            </Link>

          </>

        ) : (

          <>
            <div className="text-6xl mb-4">
              ❌
            </div>

            <h1 className="text-3xl font-bold text-red-600">
              Verification Failed
            </h1>

            <p className="mt-3 text-gray-600">
              {message}
            </p>

          </>

        )}

      </div>

    </div>

  );

}
