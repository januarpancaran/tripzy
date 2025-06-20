import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { ME_QUERY, GET_MY_TRIPS, GET_ALL_USERS } from "../graphql/queries";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UPDATE_PROFILE, ADD_TRIP_MEMBER } from "../graphql/mutations";
import ChangePasswordForm from "../components/ChangePasswordForm";

interface Trip {
  tripId: string;
  namaTrip: string;
  asal?: { nama: string };
  tujuan?: { nama: string };
  jumlahOrang: number;
  lamaPerjalanan: number;
  tanggalBerangkat: string;
}

interface User {
  id: string;
  username: string;
  email: string;
}

function TripList() {
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_MY_TRIPS, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-gray-600 text-lg">Memuat daftar trip...</p>
      </div>
    );
  }

  if (error) {
    console.error("GraphQL Error:", error);
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-500 text-lg">
          Error: Gagal memuat trip. Silakan coba lagi.
        </p>
      </div>
    );
  }

  const trips = data?.allTrip || [];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Daftar Trip Saya
      </h2>

      {trips.length === 0 ? (
        <p className="text-gray-600 text-center">
          Anda belum memiliki trip yang dibuat.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nama Trip</th>
                <th className="py-3 px-6 text-left">Asal</th>
                <th className="py-3 px-6 text-left">Tujuan</th>
                <th className="py-3 px-6 text-center">Jumlah Orang</th>
                <th className="py-3 px-6 text-center">Lama Perjalanan</th>
                <th className="py-3 px-6 text-left">Tanggal Berangkat</th>
                <th className="py-3 px-6 text-left">Anggota</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm font-light">
              {trips.map((trip) => (
                <tr
                  key={trip.tripId}
                  onClick={() =>
                    navigate("/tripinfo", {
                      state: { tripId: trip.tripId, from: "/profile" },
                    })
                  }
                  className="border-b border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {trip.namaTrip}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {trip.asal?.nama || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {trip.tujuan?.nama || "N/A"}
                  </td>
                  <td className="py-3 px-6 text-center">{trip.jumlahOrang}</td>
                  <td className="py-3 px-6 text-center">
                    {trip.lamaPerjalanan} hari
                  </td>
                  <td className="py-3 px-6 text-left">
                    {new Date(trip.tanggalBerangkat).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </td>
                  <td className="py-3 px-6 text-left">
                    {trip.members?.length > 0 ? (
                      <span className="text-gray-600">
                        {trip.members
                          .map((member) => member.user.username)
                          .join(", ")}
                      </span>
                    ) : (
                      <span className="text-gray-400">Belum ada anggota</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function TripMembersSection() {
  const { data: tripsData } = useQuery(GET_MY_TRIPS);
  const { data: usersData } = useQuery(GET_ALL_USERS);
  const [selectedTripId, setSelectedTripId] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [addTripMember] = useMutation(ADD_TRIP_MEMBER);

  const handleInvite = async () => {
    const selectedUser = usersData?.allUsers.find(
      (u: any) => u.id === selectedUserId,
    );
    if (!selectedUser || !selectedTripId) return;

    try {
      await addTripMember({
        variables: {
          tripId: selectedTripId,
          username: selectedUser.username,
        },
      });
      setSelectedUserId("");
      alert("Anggota berhasil ditambahkan!");
    } catch (err: any) {
      alert("Gagal mengundang user: " + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Tambah Anggota Trip
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2">
              Pilih Trip
            </label>
            <select
              value={selectedTripId}
              onChange={(e) => setSelectedTripId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih trip...</option>
              {tripsData?.allTrip.map((trip: any) => (
                <option key={trip.tripId} value={trip.tripId}>
                  {trip.namaTrip}
                </option>
              ))}
            </select>
          </div>

          {selectedTripId && (
            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">
                Pilih Anggota
              </label>
              <div className="flex gap-4">
                <select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Pilih user...</option>
                  {usersData?.allUsers.map((user: any) => (
                    <option key={user.id} value={user.id}>
                      {user.username} ({user.email})
                    </option>
                  ))}
                </select>
                <button
                  onClick={handleInvite}
                  disabled={!selectedUserId}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Tambah
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  const { data, loading, error } = useQuery(ME_QUERY);
  const [updateProfile] = useMutation(UPDATE_PROFILE);
  const client = useApolloClient();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    noHp: "",
    jenisKelamin: "",
    tanggalLahir: "",
    kotaTinggal: "",
  });

  // Initialize activeTab with "Akun Saya"
  const [activeTab, setActiveTab] = useState("Akun Saya");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    }

    if (data?.me) {
      setForm({
        noHp: data.me.noHp || "",
        jenisKelamin: data.me.jenisKelamin || "",
        tanggalLahir: data.me.tanggalLahir || "",
        kotaTinggal: data.me.kotaTinggal || "",
      });
    }
  }, [data, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const formattedTanggal = form.tanggalLahir
        ? new Date(form.tanggalLahir).toISOString().split("T")[0]
        : null;
      const variables = {
        ...(form.noHp !== "" && { noHp: form.noHp }),
        ...(form.jenisKelamin !== "" && { jenisKelamin: form.jenisKelamin }),
        ...(form.tanggalLahir !== "" && { tanggalLahir: formattedTanggal }),
        ...(form.kotaTinggal !== "" && { kotaTinggal: form.kotaTinggal }),
      };

      await updateProfile({ variables });
      setTimeout(() => {
        alert("Profil berhasil diperbaharui");
      }, 100);
    } catch (error) {
      console.error(error);
      alert("Gagal memperbaharui profil");
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    await client.clearStore();
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { username, email, firstName, lastName } = data.me;

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">tripzy id</h1>
        </div>
        <div className="flex items-center space-x-4">
          <svg
            className="w-6 h-6 text-gray-600 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          {/* Placeholder for user profile image */}
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src="https://placehold.co/40x40/cccccc/333333?text=Profile"
              alt="User Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "https://placehold.co/40x40/cccccc/333333?text=Error";
              }}
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row p-4 gap-4 max-w-7xl mx-auto w-full">
        {/* Sidebar */}
        <aside className="bg-white rounded-lg shadow-md p-6 w-full lg:w-1/4 flex flex-col gap-4">
          {/* User Info Card */}
          <div className="flex flex-col items-center mb-4">
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mb-2">
              {/* Using a placeholder for the cat image as in the design */}
              <img
                src="https://placehold.co/96x96/cccccc/333333?text=Cat"
                alt="User Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://placehold.co/96x96/cccccc/333333?text=Error";
                }}
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              {firstName} {lastName}
            </h2>
            <p className="text-gray-500 text-sm mb-4">{username}</p>

            {/* Explorer Card */}
            <div className="relative w-full h-24 rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
              {/* Background gradient with some subtle abstract shapes (simplified) */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background:
                    "radial-gradient(circle at top left, #a78bfa, transparent), radial-gradient(circle at bottom right, #60a5fa, transparent)",
                }}
              ></div>
              <div className="relative z-10 text-white flex flex-col items-start w-full">
                <div className="flex items-center space-x-2 mb-1">
                  {/* Icon for An Explorer - using lucide-react icon for simplicity */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-compass"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                  </svg>
                  <span className="text-sm font-medium">An Explorer</span>
                </div>
                <span className="text-lg font-bold">300 poin</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            {[
              {
                name: "Akun Saya",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-user"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ),
              },
              {
                name: "Daftar Trip",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                ),
              },
              {
                name: "Tambah Anggota Trip",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87C16 13.16 14.7 12 13 12" />
                    <path d="M17 7h.01" />
                  </svg>
                ),
              },
              {
                name: "Data Penumpang",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-users"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87C16 13.16 14.7 12 13 12" />
                    <path d="M17 7h.01" />
                  </svg>
                ),
              },
              {
                name: "Keuangan Saya",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-dollar-sign"
                  >
                    <line x1="12" x2="12" y1="2" y2="22" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                ),
              },
              {
                name: "Refund",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-wallet"
                  >
                    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h12a2 2 0 0 1 0 4H5a2 2 0 0 0 0 4h12a2 2 0 0 0 2-2v-3" />
                    <path d="M10 12h.01" />
                  </svg>
                ),
              },
              {
                name: "Pengaturan",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-settings"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2.72l-.15.1a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22.38a2 2 0 0 0-.73 2.73l-.15.1a2 2 0 0 1 0 2.72l.15.1a2 2 0 0 0 .73 2.73l-.22.38a2 2 0 0 0-2.73.73l-.15-.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V20a2 2 0 0 0-2-2z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
              },
              {
                name: "Keluar",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-log-out"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="17 17 22 12 17 7" />
                    <line x1="22" x2="10" y1="12" y2="12" />
                  </svg>
                ),
              },
            ].map((item) => (
              <button
                key={item.name}
                className={`flex items-center gap-3 p-3 rounded-lg text-left ${activeTab === item.name
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                  }`}
                onClick={
                  item.name === "Keluar"
                    ? handleLogout
                    : () => setActiveTab(item.name)
                }
              >
                {item.icon}
                <span>{item.name}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content Area - Conditional Rendering */}
        <main className="bg-white rounded-lg shadow-md p-6 w-full lg:w-3/4">
          {activeTab === "Akun Saya" && (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Akun Saya
              </h2>

              <h3 className="text-xl font-medium text-gray-700 mb-4">
                Data Pribadi
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {/* Nama Lengkap */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-gray-600 text-sm font-medium mb-1"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    value={`${firstName} ${lastName}`}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>

                <div>
                  <label
                    htmlFor="username"
                    className="block text-gray-600 text-sm font-medium mb-1"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-50 cursor-not-allowed"
                    disabled
                  />
                </div>

                {/* Jenis Kelamin, Tanggal Lahir (responsive grouping) */}
                <div className="col-span-1 md:col-span-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-4">
                  {/* Jenis Kelamin */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      Jenis Kelamin
                    </label>
                    <select
                      id="gender"
                      name="jenisKelamin"
                      value={form.jenisKelamin}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih</option>
                      <option value="L">Laki-Laki</option>
                      <option value="P">Perempuan</option>
                    </select>
                  </div>

                  {/* Tanggal Lahir (Day) */}
                  <div>
                    <label
                      htmlFor="dobDay"
                      className="block text-gray-600 text-sm font-medium mb-1"
                    >
                      Tanggal Lahir
                    </label>
                    <input
                      type="date"
                      id="dobDay"
                      name="tanggalLahir"
                      value={form.tanggalLahir}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></input>
                  </div>
                </div>

                {/* Kota Tinggal */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="city"
                    className="block text-gray-600 text-sm font-medium mb-1"
                  >
                    Kota Tinggal
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="kotaTinggal"
                    value={form.kotaTinggal}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-gray-600 text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>

                {/* No. Handphone */}
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-gray-600 text-sm font-medium mb-1"
                  >
                    No. Handphone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="noHp"
                    value={form.noHp}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex gap-4">
                <button
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                >
                  Simpan Perubahan
                </button>
                <button
                  onClick={() => {
                    // Reset form to original data
                    if (data?.me) {
                      setForm({
                        noHp: data.me.noHp || "",
                        jenisKelamin: data.me.jenisKelamin || "",
                        tanggalLahir: data.me.tanggalLahir || "",
                        kotaTinggal: data.me.kotaTinggal || "",
                      });
                    }
                  }}
                  className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
                >
                  Reset
                </button>
              </div>

              {/* Change Password Section - Moved outside grid */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-medium text-gray-700 mb-4">
                  Ubah Password
                </h3>
                <ChangePasswordForm />
              </div>
            </>
          )}

          {activeTab === "Daftar Trip" && <TripList />}

          {activeTab === "Tambah Anggota Trip" && <TripMembersSection />}

          {activeTab === "Data Penumpang" && (
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Data Penumpang (Coming Soon!)
            </h2>
          )}
          {activeTab === "Keuangan Saya" && (
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Keuangan Saya (Coming Soon!)
            </h2>
          )}
          {activeTab === "Refund" && (
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Refund (Coming Soon!)
            </h2>
          )}
          {activeTab === "Pengaturan" && (
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Pengaturan (Coming Soon!)
            </h2>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
