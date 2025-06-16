import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-10 flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
        <div className="flex-1 min-w-[200px] mb-8 md:mb-0">
          <div className="flex items-center mb-4">
            {/*
            <img src="#" alt="tripzy.id logo" className="w-8 h-8 mr-2" />
            */}
            <span className="text-2xl font-bold text-gray-800">tripzy<span className="text-orange-500">●</span>id</span>
          </div>
        </div>
        {/* Middle: Links */}
        <div className="flex-[2] grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
          <div>
            <div className="font-semibold mb-2 text-gray-800">Tentang tripzy.id</div>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><a href="#" className="hover:underline">Cara Pesan</a></li>
              <li><a href="#" className="hover:underline">Hubungi Kami</a></li>
              <li><a href="#" className="hover:underline">Pusat Bantuan</a></li>
              <li><a href="#" className="hover:underline">Tentang Kami</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-gray-800">Produk</div>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><a href="#" className="hover:underline">Tiket Bus</a></li>
              <li><a href="#" className="hover:underline">Tiket Kereta</a></li>
              <li><a href="#" className="hover:underline">Tiket Pesawat</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-gray-800">Follow kami di</div>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li className="flex items-center gap-2"><img src="/InstagramLogo.png" alt="Instagram" className="w-4 h-4" />Instagram</li>
              <li className="flex items-center gap-2"><img src="/FacebookLogo.png" alt="Facebook" className="w-4 h-4" />Facebook</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-gray-800">Lainnya</div>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><a href="#" className="hover:underline">Blog</a></li>
              <li><a href="#" className="hover:underline">Karier</a></li>
              <li><a href="#" className="hover:underline">Kebijakan Privasi</a></li>
              <li><a href="#" className="hover:underline">Syarat & Ketentuan</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full h-4 bg-gray-900 mt-2" />
    </footer>
  );
};

export default Footer; 