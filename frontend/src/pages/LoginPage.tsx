import React from 'react';
import { useMutation } from "@apollo/client";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { LOGIN_USER } from "../graphql/mutations";

// Main App component
const App: React.FC = () => {
  const navigate = useNavigate();
    const [form, setForm] = useState({username: '', password: ''});
    const [loginUser] = useMutation(LOGIN_USER, {
        onCompleted: ({tokenAuth}) => {
            localStorage.setItem("token", tokenAuth.token);
            navigate("/profile");
        },
        onError: (err) => alert(err.message),
    });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4 relative"> {/* Added relative positioning to parent for logo */}
      {/* Logo moved to the top-left corner of the page */}
      <div className="absolute top-8 left-8 flex items-center space-x-2 z-10"> {/* Added z-10 to ensure it's on top */}
        <img
          src="/tripzy.png"
          alt="Tripzy ID Logo"
          className="h-[5.5rem] w-auto object-contain max-h-[200px]"
        />
      </div>

      <div className="flex flex-col lg:flex-row overflow-hidden max-w-6xl w-full">
        {/* Left Section - Image and Illustration */}
        <div className="hidden lg:flex lg:w-1/2 p-8 flex-col justify-center items-center">
          {/* Main Illustration */}
          <img
            src="/penjelajah.png"
            alt="Person with binoculars looking at a map"
            className="w-full h-auto max-w-md object-contain rounded-2xl"
          />
        </div>

                  
          {/* Right Section - Sign In Form */}
          <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-white to-purple-50 rounded-3xl">
            <form onSubmit={e => {
            e.preventDefault();
            loginUser({ variables: form });
            }}>
              <h2 className="block text-4xl font-bold text-gray-800 mb-6">Sign in</h2>

              {/* Email/Phone Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  value={form.username}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>

              {/* Password Input */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                  <Link to="/forgot-password" className="text-xs text-blue-700 hover:underline float-right">
                    Forgot Password?
                  </Link>
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  value={form.password} 
                  onChange={e => setForm({ ...form, password: e.target.value })}
                />
              </div>

              {/* Masuk Button */}
              <button type="submit" className="w-20 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md">
                Masuk
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 text-sm mt-6">
                Belum punya akun?{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-semibold">
                  Daftar disini
                </Link>
              </p>
            </form>
          </div>        
      </div>
    </div>
  );
};

export default App;
