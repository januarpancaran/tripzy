// src/pages/Homepage.tsx
import React from "react";

// Data dummy untuk kartu wisata
const tourismSpots = [
  {
    id: 1,
    name: "Taman Safari Indonesia",
    location: "Cisarua, Bogor",
    rating: "4,3/5",
    reviews: " (14,1rb Review)",
    price: "IDR 185.000",
    image: "https://via.placeholder.com/400x250?text=Taman+Safari",
    selected: true, // Untuk menandai yang pertama biru
  },
  {
    id: 2,
    name: "Jakarta Aquarium Safari",
    location: "Petamburan, Jakarta",
    rating: "4,1/5",
    reviews: " (15,8rb Review)",
    price: "IDR 122.000",
    image: "https://via.placeholder.com/400x250?text=Jakarta+Aquarium",
  },
  {
    id: 3,
    name: "Museum Nasional",
    location: "Gambir, Jakarta Pusat",
    rating: "4,5/5",
    reviews: " (1.1rb Review)",
    price: "IDR 25.000",
    image: "https://via.placeholder.com/400x250?text=Museum+Nasional",
  },
  {
    id: 4,
    name: "Trans Studio Bandung",
    location: "Batununggal, Bandung",
    rating: "4,2/5",
    reviews: " (3,1rb Review)",
    price: "IDR 120.000",
    image: "https://via.placeholder.com/400x250?text=Trans+Studio+Bandung",
  },
  {
    id: 5,
    name: "Trans Studio Theme Park Cibubur",
    location: "Cimanggis, Depok",
    rating: "4,1/5",
    reviews: " (2,9rb Review)",
    price: "IDR 120.000",
    image: "https://via.placeholder.com/400x250?text=Trans+Studio+Cibubur",
  },
];

const Homepage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
          Populer Saat Ini! <span className="ml-2 text-xl sm:text-2xl">🔥</span>
        </h2>
        <p className="text-gray-600 text-sm sm:text-base mt-1">
          Pilihan wisata seru yang ramai dikunjungi
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex space-x-2 sm:space-x-4 mb-8 overflow-x-auto pb-2">
        <button className="px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors flex-shrink-0">
          Atraksi
        </button>
        <button className="px-4 py-2 text-sm sm:text-base bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex-shrink-0">
          Event
        </button>
        <button className="px-4 py-2 text-sm sm:text-base bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex-shrink-0">
          Tur
        </button>
      </div>

      {/* Tourism Spots Grid/Carousel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-4 custom-scroll">
        {tourismSpots.map((spot) => (
          <div
            key={spot.id}
            className={`bg-white rounded-xl shadow-md p-4 flex flex-col transition-all duration-300
              ${
                spot.selected
                  ? "border-2 border-blue-600"
                  : "border border-gray-200 hover:shadow-lg"
              }`}
          >
            <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden mb-4">
              <img
                src={spot.image}
                alt={spot.name}
                className="w-full h-full object-cover"
              />
              {/* Overlay atau elemen lain di atas gambar bisa ditambahkan di sini */}
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
              {spot.name}
            </h3>
            <p className="text-sm text-gray-500 mb-2 line-clamp-1">
              {spot.location}
            </p>
            <div className="flex items-center text-yellow-500 text-sm mb-4">
              {/* Rating stars, bisa diganti dengan SVG atau ikon */}
              <span className="mr-1">⭐</span> {spot.rating}
              <span className="text-gray-500 ml-1">{spot.reviews}</span>
            </div>
            <p className="text-lg font-bold text-gray-900 mt-auto">
              {spot.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
