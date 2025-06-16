import React from 'react';

export const Megasale: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 mt-2 md:mt-4">
      <div className="bg-gradient-to-r from-purple-100 via-white to-pink-100 rounded-sm shadow-lg p-6 flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-between gap-4">
        <div className="flex-shrink-0 flex justify-center items-center">
          <img
            src="/Megasale.png"
            alt="Mega Sale"
            className="w-32 sm:w-48 md:w-64 lg:w-80 h-auto object-contain rounded-lg"
          />
        </div>

        {/* QR Code Section */}
        <div className="flex-shrink-0 flex flex-col items-center justify-center space-y-2 text-center">
          <img
            src="/QR.png"
            alt="QR Code"
            className="w-28 h-28 object-contain rounded-lg"
            onError={(e) => { e.currentTarget.src = "https://placehold.co/100x100?text=QR"; }}
          />
          <p className="text-gray-800 font-semibold text-sm sm:text-base">Join Us Now</p>
        </div>

        {/* Promo Cards Section */}
        <div className="flex-grow w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Promo Card 1: Perjalanan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-3">
            <img
              src="/Promo-Perjalanan.png"
              alt="Promo Perjalanan"
              className="w-full h-24 sm:h-32 object-cover rounded-md mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">Promo</p>
            <p className="text-base font-bold text-gray-900">Perjalanan</p>
          </div>

          {/* Promo Card 2: Tiket Pesawat */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-3">
            <img
              src="/Promo-Tiket-Pesawat.png"
              alt="Promo Tiket Pesawat"
              className="w-full h-24 sm:h-32 object-cover rounded-md mb-2"
            />
            <p className="text-sm font-semibold text-gray-700">Promo</p>
            <p className="text-base font-bold text-gray-900">Tiket Pesawat</p>
          </div>

          {/* Promo Card 3: Bus dan Travel */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col items-center p-3">
            <img
              src="/Promo-Bus-Travel.png"
              alt="Promo Bus dan Travel"
              className="w-full h-24 sm:h-32 object-cover rounded-md mb-2"
              onError={(e) => { e.currentTarget.src = "https://placehold.co/150x80?text=Promo"; }}
            />
            <p className="text-sm font-semibold text-gray-700">Promo</p>
            <p className="text-base font-bold text-gray-900">Bus dan Travel</p>
          </div>
        </div>
      </div>
    </div>
  );
};