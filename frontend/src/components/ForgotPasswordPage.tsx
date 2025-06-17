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
    <div className="min-h-screen flex items-center justify-center bg-[url('/background-jumbotron.png')] bg-cover bg-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestReset({ variables: { email } });
        }}
        className="w-full max-w-md bg-white bg-opacity-95 rounded-2xl shadow-xl p-8 flex flex-col items-center z-10"
      >
        <h2 className="text-2xl font-extrabold mb-4 text-blue-900">
          Lupa Password
        </h2>
        {success ? (
          <p className="text-green-600 text-center font-semibold">
            Silakan cek email untuk link reset password
          </p>
        ) : (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mb-4 w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-base"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Kirim Link Reset
            </button>
          </>
        )}
      </form>
    </div>
  );
}
