import { useMutation } from "@apollo/client";
import { useState } from "react";
import { REQUEST_PASSWORD_RESET } from "../graphql/mutations";

export default function ForgotPasswordPage(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const [requestReset] = useMutation(REQUEST_PASSWORD_RESET, {
    onCompleted: () => setSuccess(true),
    onError: (err) => alert(err.message),
  });

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white font-sans">
      {/* Left Section - Image and Logo */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-white relative overflow-hidden md:min-h-screen min-h-[300px]">
        {/* Tripzy ID Logo */}
        <img
          src="/path/to/your/tripzy-id-logo.png" // Ganti dengan path logo Anda
          alt="Tripzy ID"
          className="absolute top-6 left-6 w-32 h-auto md:w-40"
        />
        {/* Traveler Illustration with decorative elements */}
        <div className="relative flex justify-center items-center w-full max-w-lg mx-auto">
          <img
            src="/path/to/your/traveler-illustration.png" // Ganti dengan path ilustrasi Anda
            alt="Traveler Illustration"
            className="w-full h-auto max-w-sm md:max-w-md lg:max-w-lg z-10"
          />
          {/* Example of decorative elements, adjust as needed */}
          <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-yellow-400 rounded-full opacity-30 blur-xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-blue-400 rounded-full opacity-30 blur-xl"></div>
        </div>
      </div>

      {/* Right Section - Reset Password Card */}
      <div className="flex-1 flex justify-center items-center p-6 md:p-8 lg:p-12">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 md:p-10 lg:p-12 shadow-lg border border-white/10 w-full max-w-md mx-auto flex flex-col gap-6">
          {/* Card Header */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl cursor-pointer text-white font-light">
              &lt;
            </span>
            <h2 className="text-3xl font-semibold text-white">
              Reset Password
            </h2>
          </div>

          {/* Form Content */}
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              requestReset({ variables: { email } });
            }}
            className="flex flex-col gap-5"
          >
            {success ? (
              <p className="text-green-400 text-center text-lg mt-4">
                Silakan cek email untuk link reset password
              </p>
            ) : (
              <>
                <label
                  htmlFor="emailInput"
                  className="text-gray-300 text-sm mb-1"
                >
                  Email atau No. Hp
                </label>
                <input
                  id="emailInput"
                  type="email"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                  }
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-transparent focus:border-purple-500 outline-none text-white text-lg transition duration-200"
                  placeholder="" // Placeholder kosong karena sudah ada label
                />
                <button
                  type="submit"
                  className="w-full py-3 mt-4 rounded-lg bg-purple-600 hover:bg-purple-700 transition duration-200 text-white text-xl font-bold"
                >
                  Kirim Kode
                </button>
              </>
            )}
          </form>

          {/* Registration Link */}
          {!success && ( // Hanya tampilkan link daftar jika belum sukses
            <p className="text-center text-gray-400 text-sm mt-4">
              Belum punya akun?{" "}
              <a
                href="/daftar"
                className="text-green-400 hover:underline font-semibold"
              >
                Daftar disini
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
