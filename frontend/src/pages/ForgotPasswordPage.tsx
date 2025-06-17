import React from "react";

const ForgotPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      {/* Main Container */}
      <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl mx-auto">
        {/* Left Section - Image and Text */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8 order-2 lg:order-1">
          <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-8 text-center">
            tripzy<span className="text-orange-500"> id</span>
          </h1>
          {/* Image - Adjust size as needed */}
          <div className="relative w-full max-w-md lg:max-w-xl xl:max-w-2xl mx-auto mb-8">
            {/* Replace with your actual image component or img tag */}
            {/* For demonstration, using a placeholder div */}
            <img
              src="https://via.placeholder.com/600x400?text=Your+Illustration" // Replace with your actual image path
              alt="Travel Illustration"
              className="w-full h-auto object-contain"
            />
            {/* You can add absolute positioned elements like the compass or pin if they are separate images */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white">
              {/* Compass icon/image */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="absolute top-1/4 right-4 w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-white">
              {/* Location pin icon/image */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Section - Reset Password Form */}
        <div className="flex-1 w-full lg:w-auto p-6 md:p-8 lg:p-10 bg-white rounded-3xl shadow-xl order-1 lg:order-2 flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Reset Password
            </h2>

            <div className="mb-4">
              <label
                htmlFor="emailOrPhone"
                className="block text-gray-700 text-sm font-medium mb-2"
              >
                Email atau No. Hp
              </label>
              <input
                type="text"
                id="emailOrPhone"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder=""
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 mb-6">
              Kirim Kode
            </button>

            <p className="text-center text-gray-600 text-sm">
              Belum punya akun?{" "}
              <a href="#" className="text-blue-600 hover:underline font-medium">
                Daftar disini
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
