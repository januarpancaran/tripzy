import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ALL_KOTA } from "../graphql/queries";
import { CREATE_TRIP } from "../graphql/mutations";
import { useState } from "react";

export default function CreateTrip() {
  const location = useLocation();
  const navigate = useNavigate();
  const tripState = location.state;

  const [namaTrip, setNamaTrip] = useState("");
  const [lamaPerjalanan, setLamaPerjalanan] = useState(
    tripState?.lama_perjalanan || 1,
  );

  const { data: kotaData, loading, error } = useQuery(GET_ALL_KOTA);
  const [createTrip] = useMutation(CREATE_TRIP);

  if (!tripState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <p className="text-red-500 text-center text-lg">Data perjalanan tidak tersedia.</p>
        </div>
      </div>
    );
  }

  const getNamaKota = (id: string) => {
    if (loading || error || !kotaData) return id;
    const kota = kotaData.allKota.find((k: any) => k.id === id);
    return kota ? kota.nama : id;
  };

  const handleSubmit = async () => {
    try {
      const { data } = await createTrip({
        variables: {
          namaTrip,
          asalId: tripState.asal,
          tujuanId: tripState.tujuan,
          jumlahOrang: tripState.jumlah_orang,
          lamaPerjalanan: lamaPerjalanan,
          tanggalBerangkat: new Date(tripState.tanggal_berangkat)
            .toISOString()
            .split("T")[0],
        },
      });

      const tripId = data.createTrip.trip.tripId;
      navigate("/createitinerary", {
        state: { tripId, tipeKendaraan: tripState.tipe_kendaraan },
      });
    } catch (err) {
      console.error("Gagal menyimpan trip:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Konfirmasi Trip</h1>

          <div className="space-y-6">
            {/* Trip Details Section */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Asal</span>
                  <p className="font-medium text-gray-900">
                    {loading ? "Memuat..." : getNamaKota(tripState.asal)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Tujuan</span>
                  <p className="font-medium text-gray-900">
                    {loading ? "Memuat..." : getNamaKota(tripState.tujuan)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Tipe Kendaraan</span>
                  <p className="font-medium text-gray-900">{tripState.tipe_kendaraan}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Tanggal Berangkat</span>
                  <p className="font-medium text-gray-900">
                    {new Date(tripState.tanggal_berangkat).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Jumlah Orang</span>
                  <p className="font-medium text-gray-900">{tripState.jumlah_orang}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Lama Perjalanan</span>
                  <p className="font-medium text-gray-900">{lamaPerjalanan} hari</p>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Trip
                </label>
                <input
                  type="text"
                  value={namaTrip}
                  onChange={(e) => setNamaTrip(e.target.value)}
                  placeholder="Contoh: Liburan ke Bandung"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lama Perjalanan (hari)
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setLamaPerjalanan(Math.max(1, lamaPerjalanan - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={lamaPerjalanan}
                    onChange={(e) =>
                      setLamaPerjalanan(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    min="1"
                    className="w-20 px-4 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setLamaPerjalanan(lamaPerjalanan + 1)}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Simpan Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
