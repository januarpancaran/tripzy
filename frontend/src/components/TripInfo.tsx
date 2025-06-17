import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import {
  LIST_RENCANA_PERJALANAN,
  GET_ALL_LAPORAN_PENGELUARAN,
} from "../graphql/queries";

export default function TripInfoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const previous = location.state?.from;

  const tripId =
    typeof location.state === "object" && location.state?.tripId
      ? location.state.tripId
      : location.state;

  const { data, loading, error, refetch } = useQuery(LIST_RENCANA_PERJALANAN, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  const {
    data: laporanData,
    loading: laporanLoading,
    error: laporanError,
    refetch: refetchLaporan,
  } = useQuery(GET_ALL_LAPORAN_PENGELUARAN, {
    fetchPolicy: "cache-and-network",
    errorPolicy: "all",
  });

  useEffect(() => {
    if (tripId) {
      refetch();
      refetchLaporan();
    }
  }, [tripId, refetch, refetchLaporan]);

  if (!tripId) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <p className="text-red-500 text-center">Trip ID tidak tersedia.</p>
      </div>
    );
  }

  if (loading || laporanLoading) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error || laporanError) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <p className="text-red-500 text-center">
          Error: {error?.message || laporanError?.message}
        </p>
      </div>
    );
  }

  // Handle case where data might be undefined
  if (!data || !data.allRencanaPerjalanan) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <p className="text-gray-500 text-center">Data tidak tersedia.</p>
      </div>
    );
  }

  // Client-side filtering to find the rencana for the specific tripId
  const rencana = data.allRencanaPerjalanan.find((r: any) => {
    return r.trip.tripId.toString() === tripId.toString();
  });

  // Find corresponding laporan pengeluaran for this trip
  const laporan = laporanData?.allLaporanPengeluaran?.find((l: any) => {
    return l.trip.tripId.toString() === tripId.toString();
  });

  if (!rencana) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
        <p className="text-gray-500 text-center">
          Rencana perjalanan tidak ditemukan.
        </p>
      </div>
    );
  }

  const { trip, hotel, kendaraan, estimasiBiaya } = rencana;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow mt-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Informasi Trip: {trip.namaTrip}</h1>
        <button
          onClick={() => navigate(previous === "/profile" ? "/profile" : "/")}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Kembali
        </button>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Asal:</strong> {trip.asal.nama}
        </p>
        <p>
          <strong>Tujuan:</strong> {trip.tujuan.nama}
        </p>
        <p>
          <strong>Tanggal Berangkat:</strong> {trip.tanggalBerangkat}
        </p>
        <p>
          <strong>Lama Perjalanan:</strong> {trip.lamaPerjalanan} hari
        </p>
        <p>
          <strong>Jumlah Orang:</strong> {trip.jumlahOrang}
        </p>

        <hr className="my-4" />

        <p className="font-semibold text-lg">Penginapan:</p>
        {hotel ? (
          <>
            <p>Hotel: {hotel.nama}</p>
            <p>Alamat: {hotel.alamat}</p>
            <p>
              Harga per Malam: Rp{hotel.hargaPerMalam.toLocaleString("id-ID")}
            </p>
            <p>Jumlah Kamar: {rencana.jumlahKamar || 1}</p>
          </>
        ) : (
          <p>Tidak menginap di hotel</p>
        )}

        <hr className="my-4" />

        <p className="font-semibold text-lg">Kendaraan:</p>
        {kendaraan ? (
          <>
            <p>
              Kendaraan: {kendaraan.nama} ({kendaraan.tipe})
            </p>
            <p>
              Harga: Rp{kendaraan.harga.toLocaleString("id-ID")} x{" "}
              {trip.jumlahOrang} = Rp
              {(kendaraan.harga * trip.jumlahOrang).toLocaleString("id-ID")}
            </p>
          </>
        ) : (
          <p>Tidak memilih kendaraan</p>
        )}

        <hr className="my-4" />

        <p className="font-semibold text-lg">Anggota Trip:</p>
        {trip.members && trip.members.length > 0 ? (
          <ul className="list-disc list-inside text-gray-700">
            {trip.members.map((m: any) => (
              <li key={m.user.id}>
                {m.user.username} ({m.user.email})
              </li>
            ))}
          </ul>
        ) : (
          <p>Belum ada anggota yang terdaftar</p>
        )}

        <hr className="my-4" />

        <p className="text-xl font-bold">
          Estimasi Total Biaya: Rp{estimasiBiaya.toLocaleString("id-ID")}
        </p>

        <p className="text-lg font-semibold">
          Biaya Per Orang: Rp
          {Math.round(estimasiBiaya / trip.jumlahOrang).toLocaleString("id-ID")}
        </p>
      </div>
    </div>
  );
}
