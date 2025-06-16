import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ALL_KOTA } from "../graphql/queries";

export default function Jumbotron() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const [tipeKendaraan, setTipeKendaraan] = useState<string>("Bus");

  const handleKendaraanOnClick = (tipe: string) => {
    setTipeKendaraan(tipe);
  };

  const { data, loading, error } = useQuery(GET_ALL_KOTA);

  const [tripData, setTripData] = useState({
    asal: "",
    tujuan: "",
    jumlah_orang: 1,
    tanggal_berangkat: "",
  });

  const handleCreateTrip = () => {
    if (!tripData.asal || !tripData.tujuan) return;
    navigate("/createtrip", {
      state: { ...tripData, tipe_kendaraan: tipeKendaraan },
    });
  };

  return (
    <header>
      <div className="relative h-[600px] overflow-hidden bg-[url('./background-jumbotron.png')] bg-cover bg-center bg-no-repeat">
        {/* NAV */}
        <nav className="absolute top-0 left-0 right-0 z-10 flex w-full items-center justify-between py-0 shadow-dark-mild lg:py-2">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            {/* Logo dan Pencarian */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center justify-center">
                <img
                  src="/tripzy.png"
                  alt="Tripzy Logo"
                  className="h-[5.5rem] w-auto object-contain max-h-[200px]"
                />
              </Link>
              <div
                className="ml-4 bg-white w-[300px] h-[51px] rounded-full flex items-center px-4 border border-[#165778]"
                style={{ color: "#165778" }}
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
                />
              </div>
            </div>

            {/* Login/Register/Profile */}
            <div className="flex gap-2 items-center">
              {username ? (
                <Link
                  to="/profile"
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg"
                >
                  Hai, {username}!
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-[90px] h-[40px] border border-[#165778] text-[#165778] bg-white rounded-lg flex items-center justify-center"
                  >
                    Masuk
                  </Link>
                  <Link
                    to="/register"
                    className="w-[90px] h-[40px] bg-[#165778] text-white rounded-lg flex items-center justify-center"
                  >
                    Daftar
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>

        {/* HERO */}
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="text-center text-white px-6 md:px-12">
            <h1 className="mb-6 mt-12 text-5xl font-bold">
              Hai kamu, ayo rencanakan perjalananmu
            </h1>
            <h3 className="mb-8 text-3xl font-bold">
              tripzy.id - plan with ease, ride the breeze
            </h3>

            {/* Selector Transportasi */}
            <div className="w-fit px-2 py-1 mx-auto bg-white shadow-md rounded-full border border-gray-300 mb-2">
              <ul className="flex items-center gap-x-3 text-slate-800 text-sm">
                {[
                  ["Bus", "Bus.png"],
                  ["Kereta", "Train.png"],
                  ["Pesawat", "AirplaneTakeoff.png"],
                ].map(([label, icon]) => {
                  const isSelected = tipeKendaraan === label;
                  return (
                    <li
                      key={label}
                      className={`flex items-center gap-1 px-3 py-1 rounded-full cursor-pointer transition-colors ${isSelected ? "bg-[#165778] text-white" : "bg-white text-black hover:bg-blue-100"}`}
                      onClick={() => handleKendaraanOnClick(label)}
                    >
                      <img
                        src={`/${icon}`}
                        alt={label}
                        className={`h-4 w-4 ${isSelected ? "filter brightness-0 invert" : ""}`}
                      />
                      <span>{label}</span>
                    </li>
                  );
                })}
                <li className="flex items-center px-3 py-1">
                  <svg
                    width="24"
                    height="24"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    stroke="black"
                    strokeWidth="0.6"
                  >
                    <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                  </svg>
                </li>
              </ul>
            </div>

            {/* Form Trip */}
            <div className="w-full max-w-5xl mx-auto bg-white shadow-md rounded-xl border border-gray-300 px-6 py-4">
              <div className="flex flex-wrap gap-4 justify-between items-end">
                {/* Dari */}
                <div className="flex flex-col w-[150px]">
                  <label className="text-left text-black mb-1">Dari</label>
                  <select
                    value={tripData.asal}
                    onChange={(e) =>
                      setTripData({ ...tripData, asal: e.target.value })
                    }
                    className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none bg-white text-black"
                  >
                    <option value="">Kota Asal</option>
                    {!loading &&
                      !error &&
                      data.allKota.map((kota) => (
                        <option key={kota.id} value={kota.id}>
                          {kota.nama}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Ke */}
                <div className="flex flex-col w-[150px]">
                  <label className="text-left text-black mb-1">Ke</label>
                  <select
                    value={tripData.tujuan}
                    onChange={(e) =>
                      setTripData({ ...tripData, tujuan: e.target.value })
                    }
                    className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none bg-white text-black"
                  >
                    <option value="">Kota Tujuan</option>
                    {!loading &&
                      !error &&
                      data.allKota.map((kota) => (
                        <option key={kota.id} value={kota.id}>
                          {kota.nama}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Tanggal */}
                <div className="flex flex-col w-[150px]">
                  <label className="text-left text-black mb-1">Tanggal</label>
                  <input
                    type="date"
                    value={tripData.tanggal_berangkat}
                    onChange={(e) =>
                      setTripData({
                        ...tripData,
                        tanggal_berangkat: e.target.value,
                      })
                    }
                    className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none text-black bg-white"
                  />
                </div>

                {/* Jumlah Penumpang */}
                <div className="flex flex-col w-[120px]">
                  <label className="text-left text-black mb-1">Penumpang</label>
                  <input
                    type="number"
                    min={1}
                    value={tripData.jumlah_orang}
                    onChange={(e) =>
                      setTripData({
                        ...tripData,
                        jumlah_orang: parseInt(e.target.value),
                      })
                    }
                    className="h-10 px-3 border border-gray-300 rounded-md focus:outline-none text-black bg-white"
                  />
                </div>

                {/* Tombol */}
                <div className="flex flex-col w-[140px]">
                  <button
                    onClick={handleCreateTrip}
                    className="h-10 w-full bg-[#165778] text-white rounded-md hover:bg-[#134b69] transition"
                  >
                    Tambah Trip
                  </button>
                </div>
              </div>

              {/* PROMO */}
              <hr className="my-6 border-gray-300" />
              <div className="flex items-center space-x-2">
                <img src="/Megaphone.png" alt="Promo" className="h-6 w-6" />
                <p className="text-black text-sm">
                  Temukan lebih banyak <b>promo</b> seru dan hemat untuk
                  liburanmu. Jangan sampai kehabisan, cek sekarang juga!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
