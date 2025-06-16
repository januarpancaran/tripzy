import { Link } from "react-router-dom";

export default function Jumbotron() {
  const username = localStorage.getItem("username");

  return (
    <header>
      <div className="relative h-[600px] overflow-hidden bg-[url('./background-jumbotron.png')] bg-cover bg-[50%] bg-no-repeat">
        <nav className="absolute top-0 left-0 right-0 z-10 flex w-full items-center justify-between py-0 shadow-dark-mild lg:flex-wrap lg:justify-start lg:py-2">
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div className="flex items-center">
              <button
                className="border-0 bg-transparent px-2 text-xl leading-none transition-shadow duration-150 ease-in-out hover:text-neutral-700 focus:text-neutral-700 motion-reduce:transition-none dark:hover:text-white dark:focus:text-white lg:hidden"
                type="button"
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

            <div className="!visible hidden grow basis-[100%] items-center justify-center text-center lg:!flex lg:basis-auto lg:text-left">
              <ul className="flex w-full flex-row justify-between items-center">
                <div className="flex gap-2 items-center">
                  <li className="flex items-center">
                    <Link to="/" className="flex items-center justify-center">
                      <img
                        src="/tripzy.png"
                        alt="Tripzy Logo"
                        className="h-[5.5rem] w-auto object-contain max-h-[200px]"
                      />
                    </Link>
                  </li>
                  <li className="flex items-center">
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

                <div className="flex gap-2 items-center">
                  {username ? (
                    <li className="flex items-center ">
                      <Link
                        to="/profile"
                        className="px-4 py-2 text-white bg-blue-600 rounded-lg"
                      >
                        Hai, {username}!
                      </Link>
                    </li>
                  ) : (
                    <>
                      <li className="flex items-center">
                        <Link
                          to="/login"
                          className="block bg-white w-[90px] h-[51px] transition duration-200 rounded-lg flex items-center justify-center"
                          style={{
                            color: "#165778",
                            border: "1px solid #165778",
                          }}
                        >
                          Masuk
                        </Link>
                      </li>
                      <li className="flex items-center">
                        <Link
                          to="/register"
                          className="block w-[90px] h-[51px] transition duration-200 rounded-lg text-white flex items-center justify-center"
                          style={{ backgroundColor: "#165778" }}
                        >
                          Daftar
                        </Link>
                      </li>
                    </>
                  )}
                </div>
              </ul>
            </div>
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black/60 bg-fixed">
          <div className="flex h-full items-center justify-center">
            <div className="px-6 text-center text-white md:px-12">
              <h1 className="mb-6 mt-15 text-5xl font-bold">
                Hai kamu, ayo rencanakan perjalananmu
              </h1>
              <h3 className="mb-8 text-3xl font-bold">
                tripzy.id - plan with ease, ride the breeze
              </h3>

              <div className="w-fit px-2 py-1 mx-auto bg-white shadow-md rounded-full mt-4 border border-gray-300">
                <ul className="flex items-center gap-x-3 text-slate-800 text-sm">
                  {[
                    ["Bus", "Bus.png"],
                    ["Kereta", "Train.png"],
                    ["Pesawat", "AirplaneTakeoff.png"],
                    ["Sewa mobil", "Car.png"],
                    ["Hotel", "BuildingApartment.png"],
                    ["Villa", "HouseLine.png"],
                    ["Trip Calculator", "Calculator.png"],
                  ].map(([label, icon]) => (
                    <li
                      key={label}
                      className="flex items-center gap-1 px-3 py-1 hover:bg-blue-100 rounded-full"
                    >
                      <img src={`/${icon}`} alt={label} className="h-4 w-4" />
                      <span>{label}</span>
                    </li>
                  ))}

                  <li className="flex items-center gap-1 px-3 py-1">
                    <button className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-xl">
                      <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        fillRule="evenodd"
                        clipRule="evenodd"
                        fill="black"
                        stroke="black"
                        strokeWidth="0.6"
                      >
                        <path d="M21.883 12l-7.527 6.235.644.765 9-7.521-9-7.479-.645.764 7.529 6.236h-21.884v1h21.883z" />
                      </svg>
                    </button>
                  </li>
                </ul>
              </div>

              <div className="w-[900px] px-2 py-1 mx-auto bg-white shadow-md rounded-xl border-x border-b border-gray-300 -mt-7">
                <div className="flex items-center gap-2 mt-6 ml-2">
                  <input
                    type="radio"
                    id="sekali_jalan"
                    name="jenis_perjalanan"
                    defaultChecked
                  />
                  <label
                    htmlFor="sekali_jalan"
                    className="cursor-pointer text-black"
                  >
                    Sekali jalan
                  </label>
                  <input
                    type="radio"
                    id="pulang_pergi"
                    name="jenis_perjalanan"
                    className="ml-4"
                  />
                  <label
                    htmlFor="pulang_pergi"
                    className="cursor-pointer text-black"
                  >
                    Pulang-pergi
                  </label>
                </div>

                <div className="flex flex-nowrap items-start mt-6 ml-2 overflow-x-auto gap-3">
                  {[
                    ["Dari", "Lokasimu", "80px"],
                    ["Ke", "Mau ke mana?", "150px"],
                    ["Tambah Tujuan", "Tujuan", "120px"],
                    ["Tanggal Pergi", "", "110px", "date"],
                    ["Penumpang", "Jumlah", "80px", "number"],
                  ].map(([label, placeholder, width, type = "text"]) => (
                    <div
                      key={label}
                      className={`flex flex-col w-[${width}] ml-5 gap-y-1 shrink-0`}
                    >
                      <label className="text-left text-black">{label}</label>
                      <input
                        type={type as string}
                        placeholder={placeholder as string}
                        className="p-0 border-0 focus:outline-none focus:ring-0 placeholder-gray-500 text-black bg-transparent"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col w-[150px] ml-5 gap-y-1 shrink-0">
                    <Link
                      className="block w-[90px] h-[51px] transition duration-200 rounded-lg text-white flex items-center justify-center"
                      style={{ backgroundColor: "#165778" }}
                      to="/register"
                    >
                      Cari
                    </Link>
                  </div>
                </div>

                <hr className="mt-8 border border-gray-300" />

                <div className="flex items-center mt-6 ml-6">
                  <img src="/Megaphone.png" alt="Megaphone" />
                  <p className="text-black ml-1 text-sm text-center">
                    Temukan lebih banyak <b>promo</b> seru dan hemat untuk
                    liburanmu. Jangan sampai kehabisan, cek sekarang juga!
                  </p>
                </div>

                <div className="h-5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
