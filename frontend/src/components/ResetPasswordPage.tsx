import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { RESET_PASSWORD, REQUEST_PASSWORD_RESET } from "../graphql/mutations";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
          className="h-16 w-auto object-contain max-h-[150px]"
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
              // Ganti ini dengan logika reset password kalau sudah pakai token
              if (newPassword !== confirmPassword) {
                alert("Password tidak cocok");
                return;
              }
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
                {/* Password Baru */}
                <div className="mb-4">
                  <label
                    htmlFor="newPassword"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Password Baru
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    placeholder="Masukkan password baru"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>

                {/* Konfirmasi Password */}
                <div className="mb-6">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-semibold mb-2"
                  >
                    Konfirmasi Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Ulangi password baru"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
