import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { REGISTER_USER } from "../graphql/mutations";

const MessageDisplay: React.FC<{ message: string | null; type: 'error' | 'success' }> = ({ message, type }) => {
  if (!message) return null;

  const bgColor = type === 'error' ? 'bg-red-100' : 'bg-green-100';
  const textColor = type === 'error' ? 'text-red-700' : 'text-green-700';
  const borderColor = type === 'error' ? 'border-red-400' : 'border-green-400';

  return (
    <div className={`p-3 rounded-md border ${bgColor} ${borderColor} ${textColor} mb-4 text-center`}>
      {message}
    </div>
  );
};

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '', email: '', password: '', firstName: '', lastName: '',
  });
  const [message, setMessage] = useState<{ text: string; type: 'error' | 'success' } | null>(null);

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      setMessage({ text: "Registration successful! Redirecting to login...", type: 'success' });
      setTimeout(() => navigate("/login"), 2000);
    },
    onError: (err) => {
      setMessage({ text: err.message, type: 'error' });
      setTimeout(() => setMessage(null), 5000);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !form.firstName || !form.lastName) {
      setMessage({ text: "All fields are required.", type: 'error' });
      setTimeout(() => setMessage(null), 3000);
      return;
    }
    registerUser({ variables: form });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute top-8 left-8 flex items-center space-x-2 z-10"> {/* Added z-10 to ensure it's on top */}
        <img
          src="/tripzy-dark.png"
          alt="Tripzy ID Logo"
          className="h-[5.5rem] w-auto object-contain max-h-[200px]"
        />
      </div>

      {/* Main content container with two columns for large screens */}
      <div className="flex flex-col lg:flex-row bg-whiteoverflow-hidden max-w-6xl w-full mt-10">
        <div className="hidden lg:flex lg:w-1/2 p-8 flex-col justify-center items-center">
          <img
            src="/penjelajah.png"
            alt=""
            className="w-full h-auto max-w-md object-contain rounded-2xl"
          />
        </div>

        {/* Right Section - Register Form */}
        {/* This section now comes second for the desired "form on right" layout */}
        <div className="lg:w-1/2 p-8 md:p-12 mt-20 flex flex-col justify-center bg-gradient-to-br from-white to-purple-50 rounded-r-3xl">
          <form onSubmit={handleSubmit}>
            <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">Register</h2>

            {/* Message Display for errors/success */}
            <MessageDisplay message={message?.text || null} type={message?.type || 'error'} />

            {/* Input Fields */}
            {Object.entries(form).map(([key, val]) => (
              <div className="mb-4" key={key}>
                <label htmlFor={key} className="block text-gray-700 text-sm font-semibold mb-2 capitalize">
                  {key === 'firstName' ? 'First Name' : key === 'lastName' ? 'Last Name' : key}
                </label>
                <input
                  type={key === 'password' ? 'password' : key === 'email' ? 'email' : 'text'}
                  id={key}
                  value={val}
                  onChange={e => setForm({ ...form, [key]: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  required // Mark as required
                />
              </div>
            ))}

            {/* Register Button */}
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md mt-6">
              Daftar
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600 text-sm mt-6">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-blue-600 hover:underline font-semibold">
                Masuk di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
