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
    return <p>Data perjalanan tidak tersedia.</p>;
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
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Konfirmasi Trip</h1>

      <div>
        <strong>Asal:</strong>{" "}
        {loading ? "Memuat..." : getNamaKota(tripState.asal)}
      </div>
      <div>
        <strong>Tujuan:</strong>{" "}
        {loading ? "Memuat..." : getNamaKota(tripState.tujuan)}
      </div>
      <div>
        <strong>Tipe Kendaraan:</strong> {tripState.tipe_kendaraan}
      </div>
      <div>
        <strong>Tanggal Berangkat:</strong>{" "}
        {new Date(tripState.tanggal_berangkat).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>
      <div>
        <strong>Jumlah Orang:</strong> {tripState.jumlah_orang}
      </div>
      <div>
        <strong>Lama Perjalanan:</strong> {lamaPerjalanan} hari
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Nama Trip:</label>
        <input
          type="text"
          value={namaTrip}
          onChange={(e) => setNamaTrip(e.target.value)}
          placeholder="Contoh: Liburan ke Bandung"
          className="w-full px-3 py-2 border rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Lama Perjalanan (hari):
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setLamaPerjalanan(Math.max(1, lamaPerjalanan - 1))}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded"
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
            className="w-20 px-3 py-2 border rounded text-center"
          />
          <button
            type="button"
            onClick={() => setLamaPerjalanan(lamaPerjalanan + 1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded"
          >
            +
          </button>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Simpan Trip
      </button>
    </div>
  );
}
