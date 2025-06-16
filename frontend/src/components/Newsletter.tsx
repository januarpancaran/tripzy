import React from "react";

const Newsletter = () => {
  return (
    <div className="relative w-full overflow-hidden" style={{ minHeight: 180 }}>
      {/* Background image placeholder */}
      <img
        src="/Newsletter.png"
        alt="Newsletter Background"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
        style={{ zIndex: 1 }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-40" style={{ zIndex: 2 }} />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 py-8 md:py-12" style={{ zIndex: 3 }}>
        <h2 className="text-white text-center text-xl md:text-2xl lg:text-3xl font-semibold mb-4 leading-snug">
          <span className="font-bold">Stay tuned</span> untuk info perjalanan, inspirasi liburan, dan<br className="hidden md:inline" />
          promo hemat <span className="font-bold">setiap saat!</span>
        </h2>
        <form
          className="w-full max-w-xl flex flex-col md:flex-row items-center gap-3 md:gap-4"
          onSubmit={e => e.preventDefault()}
        >
          <div className="relative flex-1 w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {/* Email icon placeholder */}
              <img src="/Vector-Email.png" alt="Email Icon" className="w-5 h-5" />
            </span>
            <input
              type="email"
              placeholder="Masukkan alamat email"
              className="w-full pl-10 pr-4 py-2 rounded-md border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 text-base shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-colors shadow-md"
          >
            Berlangganan Newsletter
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter; 