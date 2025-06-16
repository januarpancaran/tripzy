import React from 'react';
import { useQuery } from "@apollo/client";
import { GET_DISKON } from "../graphql/queries";

export const Diskon: React.FC = () => {
  return (
    <div className="bg-gray-100 font-inter py-4">
      <div className="max-w-6xl mx-auto bg-whitep-6 lg:p-8 mt-1">
        <div className="flex items-center mb-4">
          <img
            src="/Gift.png"
            alt="Gift Icon"
            className="w-10 h-10 mr-3"
          />
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
            Dapatkan Kupon Diskon <span className="text-blue-600">10%</span> Khusus Pengguna Baru!*
          </h1>
        </div>
        <p className="text-sm text-gray-600 mb-6 ml-12">
          *Berlaku untuk Transaksi Pertama
        </p>

        {/* Coupon Cards Section */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 relative">
          {/* Coupon Card 1 */}
          <div className="flex-shrink-0 w-full md:w-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src="/Diskon-Hotel.png"
                  alt="Info Icon"
                  className="w-4 h-4 mr-1 text-gray-500"
                />
                <span className="text-sm font-semibold text-gray-700">Diskon 10% Hotel</span>
              </div>
              <img
                src="/Info.png"
                alt="Info Icon"
                className="w-4 h-4 text-gray-400"
              />
            </div>
            <p className="text-xs text-gray-500 mb-4">min. transaksi Rp 500rb</p>
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <span className="text-sm font-mono text-gray-700">LIBURHEMAT</span>
              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md shadow hover:bg-blue-600 transition-colors">
                Salin
              </button>
            </div>
          </div>

          {/* Coupon Card 2 */}
          <div className="flex-shrink-0 w-full md:w-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src="/Diskon-Train.png"
                  alt="Info Icon"
                  className="w-4 h-4 mr-1 text-gray-500"
                />
                <span className="text-sm font-semibold text-gray-700">Diskon s.d. 10% Tiket Kereta</span>
              </div>
              <img
                src="/Info.png"
                alt="Info Icon"
                className="w-4 h-4 text-gray-400"
              />
            </div>
            <p className="text-xs text-gray-500 mb-4">min. transaksi Rp 600rb</p>
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <span className="text-sm font-mono text-gray-700">BANDUNGBONDOWOSO</span>
              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md shadow hover:bg-blue-600 transition-colors">
                Salin
              </button>
            </div>
          </div>

          {/* Coupon Card 3 */}
          <div className="flex-shrink-0 w-full md:w-1/3 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <img
                  src="/Diskon-Hotel.png"
                  alt="Info Icon"
                  className="w-4 h-4 mr-1 text-gray-500"
                />
                <span className="text-sm font-semibold text-gray-700">Cashback s.d. 200rb</span>
              </div>
              <img
                src="/Info.png"
                alt="Info Icon"
                className="w-4 h-4 text-gray-400"
              />
            </div>
            <p className="text-xs text-gray-500 mb-4">min. transaksi Rp 2jt</p>
            <div className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
              <span className="text-sm font-mono text-gray-700">MEPETDEADLINE</span>
              <button className="px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-md shadow hover:bg-blue-600 transition-colors">
                Salin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};