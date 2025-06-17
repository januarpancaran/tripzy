import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REQUEST_PASSWORD_RESET } from "../graphql/mutations";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const [requestReset] = useMutation(REQUEST_PASSWORD_RESET, {
    onCompleted: () => setSuccess(true),
    onError: (err) => alert(err.message),
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative">
      {/* Logo pojok kiri atas */}
      <div className="absolute top-8 left-8 flex items-center z-10">
        <img
          src="/tripzy-dark.png"
          alt="Tripzy ID Logo"
          className="h-[5.5rem] w-auto object-contain max-h-[200px]"
        />
      </div>

      <div className="flex flex-col lg:flex-row overflow-hidden max-w-6xl w-full">
        {/* Left Section - Illustration */}
        <div className="hidden lg:flex lg:w-1/2 p-8 flex-col justify-center items-center">
          <img
            src="/penjelajah.png"
            alt="Person with binoculars"
            className="w-full h-auto max-w-md object-contain rounded-2xl"
          />
        </div>

        {/* Right Section - Forgot Password Form */}
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-purple-50 rounded-3xl">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              requestReset({ variables: { email } });
            }}
            className="w-full"
          >
            <h2 className="block text-4xl font-bold text-gray-800 mb-6">
              Lupa Password
            </h2>

            {success ? (
              <div className="text-green-600 text-center font-semibold py-4">
                Silakan cek email untuk link reset password.
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Masukkan email akun kamu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
                >
                  Kirim Link Reset
                </button>
              </>
            )}

            <p className="text-center text-gray-600 text-sm mt-6">
              Ingat passwordmu?{" "}
              <a
                href="/login"
                className="text-blue-600 hover:underline font-semibold"
              >
                Masuk
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
