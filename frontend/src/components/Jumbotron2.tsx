import React, { useState } from 'react'; // Import useState
import { Link } from "react-router-dom";

export default function Jumbotron() {
  const [activeTab, setActiveTab] = useState<string>('Bus'); // State to manage the active tab

  // Function to handle tab clicks
  const handleTabClick = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <header>
      <div className="relative h-[600px] overflow-hidden bg-[url('./background-jumbotron.png')] bg-cover bg-[50%] bg-no-repeat">
        <nav
          className="absolute top-0 left-0 right-0 z-10 flex w-full items-center justify-between py-0 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-2"
          data-twe-navbar-ref
        >
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div className="flex items-center">
              {/* Hamburger menu button for small screens */}
              <button
                className="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 motion-reduce:transition-none dark:hover:text-white dark:focus:text-white lg:hidden"
                type="button"
                data-twe-collapse-init
                data-twe-target="#navbarSupportedContentX"
                aria-controls="navbarSupportedContentX"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="[&>svg]:h-7 [&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </span>
              </button>
            </div>
            <div
              className="!visible hidden grow basis-[100%] items-center justify-center text-center lg:!flex lg:basis-auto lg:text-left"
              id="navbarSupportedContentX"
              data-twe-collapse-item
            >
              <ul
                className="flex w-full flex-row justify-between items-center"
                data-twe-navbar-nav-ref
              >
                <div className="flex gap-2 items-center">
                  {/* Tripzy Logo */}
                  <li data-twe-nav-item-ref className="flex items-center">
                    <Link className="flex items-center justify-center" to="/">
                      <img
                        src="/tripzy.png"
                        alt="Tripzy Logo"
                        className="h-[5.5rem] w-auto object-contain max-h-[200px]"
                      />
                    </Link>
                  </li>
                  {/* Search Input in Navbar */}
                  <li data-twe-nav-item-ref className="flex items-center">
                    <div
                      className="block bg-white w-[300px] h-[51px] transition duration-200 rounded-full flex items-center px-4"
                      style={{ color: "#165778", border: "1px solid #165778" }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                      <input
                        type="text"
                        placeholder="Makrab di Ambarawa"
                        className="w-full bg-transparent border-none focus:outline-none placeholder-[#165778]"
                        style={{ color: "#165778" }}
                      />
                    </div>
                  </li>
                </div>
                {/* Login/Register Buttons */}
                <div className="flex gap-2 items-center">
                  <li data-twe-nav-item-ref className="flex items-center">
                    <Link
                      className="block bg-white w-[90px] h-[51px] transition duration-200 rounded-lg flex items-center justify-center"
                      style={{ color: "#165778", border: "1px solid #165778" }}
                      to="/login"
                      data-twe-nav-link-ref
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                    >
                      Masuk
                    </Link>
                  </li>
                  <li data-twe-nav-item-ref className="flex items-center">
                    <Link
                      className="block w-[90px] h-[51px] transition duration-200 rounded-lg text-white flex items-center justify-center"
                      style={{ backgroundColor: "#165778" }}
                      to="/register"
                      data-twe-nav-link-ref
                      data-twe-ripple-init
                      data-twe-ripple-color="light"
                    >
                      Daftar
                    </Link>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mb-6 mt-15 text-5xl font-bold">Hai kamu, ayo rencanakan perjalananmu</h1>
              <h3 className="mb-8 text-3xl font-bold">tripzy.id - plan with ease, ride the breeze</h3>

              {/* Tab Navigation (Travel Types) */}
              <div className="w-fit px-2 py-1 mx-auto bg-white shadow-md rounded-full mt-4 border border-gray-300">
                <ul className="flex items-center gap-x-3 text-slate-800 text-sm overflow-x-auto pb-1"> {/* Added overflow-x-auto for smaller screens */}
                  {[
                    { name: 'Bus', icon: '/Bus.png' },
                    { name: 'Kereta', icon: '/Train.png' },
                    { name: 'Pesawat', icon: '/AirplaneTakeoff.png' },
                    { name: 'Sewa mobil', icon: '/Car.png' },
                    { name: 'Hotel', icon: '/BuildingApartment.png' },
                    { name: 'Villa', icon: '/HouseLine.png' },
                    { name: 'Trip Calculator', icon: '/Calculator.png' },
                  ].map((item) => (
                    <li
                      key={item.name}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer transition-colors shrink-0 ${
                        activeTab === item.name ? 'bg-blue-100 text-blue-600' : 'hover:bg-blue-50'
                      }`}
                      onClick={() => handleTabClick(item.name)}
                    >
                      <img src={item.icon} alt={item.name} className="h-4 w-4" />
                      <span>{item.name}</span>
                    </li>
                  ))}
                  {/* Original arrow button, kept as-is */}
                  <li className="flex items-center gap-1 px-3 py-1 shrink-0">
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-xl">
                      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" fill="black" stroke="black" strokeWidth="0.6"><path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z"/></svg>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Conditional Content Area */}
              <div className="w-full max-w-[900px] mx-auto bg-white shadow-md rounded-xl border-x border-b border-gray-300 -mt-7">
                {activeTab === 'Bus' && (
                  <div className="bus-content p-4 md:p-6">
                    <div className="flex items-center gap-2 mt-6 ml-2">
                      <input type="radio" id="sekali_jalan_bus" name="jenis_perjalanan_bus" defaultChecked />
                      <label htmlFor="sekali_jalan_bus" className="cursor-pointer text-black">Sekali jalan</label>
                      <input type="radio" id="pulang_pergi_bus" name="jenis_perjalanan_bus" className="ml-4" />
                      <label htmlFor="pulang_pergi_bus" className="cursor-pointer text-black">Pulang-pergi</label>
                    </div>

                    <div className="flex flex-nowrap items-start mt-6 ml-2 overflow-x-auto gap-3 pb-4">
                      <div className="flex flex-col w-[80px] ml-5 gap-y-1 shrink-0">
                        <label className="text-left text-black">Dari</label>
                        <input
                          type="text"
                          placeholder="Lokasimu"
                          className="p-0 border-0 focus:outline-none focus:ring-0 placeholder-gray-500 text-black bg-transparent"
                        />
                      </div>
                      <div className="flex flex-col w-[150px] ml-5 gap-y-1 shrink-0">
                        <label className="text-left text-black">Ke</label>
                        <input
                          type="text"
                          placeholder="Mau ke mana?"
                          className="p-0 border-0 focus:outline-none focus:ring-0 placeholder-gray-500 text-black bg-transparent"
                        />
                      </div>
                      <div className="flex flex-col w-[120px] ml-5 gap-y-1 shrink-0">
                        <label className="text-left text-black">Tambah Tujuan</label>
                        <input
                          type="text"
                          placeholder="Tujuan"
                          className="p-0 border-0 focus:outline-none focus:ring-0 placeholder-gray-500 text-black bg-transparent"
                        />
                      </div>
                      <div className="flex flex-col w-[110px] ml-5 gap-y-1 shrink-0">
                        <label className="text-left text-black">Tanggal Pergi</label>
                        <input
                          type="date"
                          className="p-0 border-0 focus:outline-none focus:ring-0 text-black bg-transparent"
                        />
                      </div>
                      <div className="flex flex-col w-[80px] ml-5 gap-y-1 shrink-0">
                        <label className="text-left text-black">Penumpang</label>
                        <input
                          type="number"
                          placeholder="Jumlah"
                          className="p-0 border-0 focus:outline-none focus:ring-0 placeholder-gray-500 text-black bg-transparent"
                        />
                      </div>
                      <div className="flex flex-col w-[150px] ml-5 gap-y-1 shrink-0">
                        <Link
                          className="block w-[90px] h-[51px] transition duration-200 rounded-lg text-white flex items-center justify-center"
                          style={{ backgroundColor: "#165778" }}
                          to="/search-bus" // Example link, adjust as needed
                          data-twe-nav-link-ref
                          data-twe-ripple-init
                          data-twe-ripple-color="light"
                        >
                          Cari
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'Hotel' && (
                  <div className="hotel-content p-4 md:p-6">
                    <div className="mb-4">
                      <label htmlFor="hotel-destination" className="block text-gray-700 text-sm font-semibold mb-2">
                        Tujuan
                      </label>
                      <input
                        type="text"
                        id="hotel-destination"
                        placeholder="Mau ke kota mana?"
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="check-in" className="block text-gray-700 text-sm font-semibold mb-2">
                          Check-in
                        </label>
                        <input
                          type="date"
                          id="check-in"
                          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="check-out" className="block text-gray-700 text-sm font-semibold mb-2">
                          Check-out
                        </label>
                        <input
                          type="date"
                          id="check-out"
                          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="guests" className="block text-gray-700 text-sm font-semibold mb-2">
                          Jumlah Tamu
                        </label>
                        <input
                          type="number"
                          id="guests"
                          placeholder="Jumlah"
                          min="1"
                          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                      <div className="w-full sm:w-1/2">
                        <label htmlFor="rooms" className="block text-gray-700 text-sm font-semibold mb-2">
                          Jumlah Kamar
                        </label>
                        <input
                          type="number"
                          id="rooms"
                          placeholder="Jumlah"
                          min="1"
                          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                      </div>
                    </div>
                    <button
                      className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-md"
                    >
                      Cari Hotel
                    </button>
                  </div>
                )}

                {/* Placeholder content for other tabs */}
                {activeTab !== 'Bus' && activeTab !== 'Hotel' && (
                  <div className="other-content p-4 md:p-6 text-center text-gray-700 h-48 flex items-center justify-center">
                    <p>Form pencarian untuk layanan {activeTab} akan ditampilkan di sini.</p>
                  </div>
                )}

                <hr className="mt-8 border border-gray-300" />
                <div className="flex items-center mt-6 ml-6 pb-6" >
                  <img src="/Megaphone.png" alt="Megaphone" className="h-6 w-6" />
                  <p className="text-black ml-1 text-sm text-left">Temukan lebih banyak <b>promo</b> seru dan hemat untuk liburanmu. Jangan sampai kehabisan, cek sekarang juga!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
