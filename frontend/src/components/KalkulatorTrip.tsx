import { useQuery } from "@apollo/client";
import { GET_ALL_KOTA } from "../graphql/queries";
import { useState } from "react";

type FormState = {
  asalId: string;
  tujuanId: string;
  tanggalBerangkat: string;
  lamaPerjalanan: number;
  jumlahOrang: number;
  hotelId: string;
  jumlahKamar: number;
  kendaraanId: string;
};

export default function TripEstimator() {
  const { data, loading, error } = useQuery(GET_ALL_KOTA);

  const [form, setForm] = useState<FormState>({
    asalId: "",
    tujuanId: "",
    tanggalBerangkat: "",
    lamaPerjalanan: 1,
    jumlahOrang: 1,
    hotelId: "",
    jumlahKamar: 1,
    kendaraanId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name.includes("jumlah") || name === "lamaPerjalanan"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    if (!form.asalId || !form.tujuanId) {
      alert("Silakan pilih asal dan tujuan");
      return;
    }
    // kirim data ke backend / navigasi
    console.log("Estimasi biaya trip:", form);
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Kalkulator Trip
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {/* Asal */}
        <div>
          <label className="text-sm text-gray-700">Asal</label>
          <select
            name="asalId"
            value={form.asalId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Pilih Kota Asal</option>
            {!loading &&
              !error &&
              data?.allKota?.map((kota: any) => (
                <option key={kota.id} value={kota.id}>
                  {kota.nama}
                </option>
              ))}
          </select>
        </div>

        {/* Tujuan */}
        <div>
          <label className="text-sm text-gray-700">Tujuan</label>
          <select
            name="tujuanId"
            value={form.tujuanId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Pilih Kota Tujuan</option>
            {!loading &&
              !error &&
              data?.allKota?.map((kota: any) => (
                <option key={kota.id} value={kota.id}>
                  {kota.nama}
                </option>
              ))}
          </select>
        </div>

        {/* Tanggal */}
        <div>
          <label className="text-sm text-gray-700">Tanggal Berangkat</label>
          <input
            type="date"
            name="tanggalBerangkat"
            value={form.tanggalBerangkat}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Lama Perjalanan */}
        <div>
          <label className="text-sm text-gray-700">Durasi (hari)</label>
          <input
            type="number"
            name="lamaPerjalanan"
            value={form.lamaPerjalanan}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={1}
          />
        </div>

        {/* Jumlah Orang */}
        <div>
          <label className="text-sm text-gray-700">Jumlah Orang</label>
          <input
            type="number"
            name="jumlahOrang"
            value={form.jumlahOrang}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={1}
          />
        </div>

        {/* Hotel ID */}
        <div>
          <label className="text-sm text-gray-700">Hotel (Opsional)</label>
          <input
            name="hotelId"
            value={form.hotelId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Jumlah Kamar */}
        <div>
          <label className="text-sm text-gray-700">Jumlah Kamar</label>
          <input
            name="jumlahKamar"
            type="number"
            value={form.jumlahKamar}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            min={1}
          />
        </div>

        {/* Kendaraan ID */}
        <div>
          <label className="text-sm text-gray-700">Kendaraan (Opsional)</label>
          <input
            name="kendaraanId"
            value={form.kendaraanId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 bg-[#165778] text-white px-4 py-2 rounded hover:bg-[#134b69]"
      >
        Hitung Estimasi Biaya
      </button>
    </div>
  );
}
