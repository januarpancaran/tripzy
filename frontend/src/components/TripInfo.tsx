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
    <div className="min-h-screen flex items-center justify-center bg-[url('/background-jumbotron.png')] bg-cover bg-center">
      <div className="w-full max-w-2xl bg-white bg-opacity-95 rounded-3xl shadow-2xl p-10 z-10">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-blue-800 border-b-2 border-blue-200 pb-2">
            Informasi Trip: {trip.namaTrip}
          </h1>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-blue-600 text-white font-bold rounded-full shadow hover:bg-blue-700 transition"
          >
            Kembali
          </button>
        </div>
  
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-2 text-base mb-6">
          <div>
            <span className="text-gray-500">Asal:</span>
            <div className="font-semibold">{trip.asal.nama}</div>
          </div>
          <div>
            <span className="text-gray-500">Tujuan:</span>
            <div className="font-semibold">{trip.tujuan.nama}</div>
          </div>
          <div>
            <span className="text-gray-500">Tanggal Berangkat:</span>
            <div className="font-semibold">{trip.tanggalBerangkat}</div>
          </div>
          <div>
            <span className="text-gray-500">Lama Perjalanan:</span>
            <div className="font-semibold">{trip.lamaPerjalanan} hari</div>
          </div>
          <div>
            <span className="text-gray-500">Jumlah Orang:</span>
            <div className="font-semibold">{trip.jumlahOrang}</div>
          </div>
        </div>
  
        <hr className="my-4" />

        <div className="mb-3">
          <div className="font-bold text-blue-700 mb-1">Penginapan:</div>
          {hotel ? (
            <div className="bg-blue-50 p-3 rounded-lg mb-2">
              <div>Hotel: <b>{hotel.nama}</b></div>
              <div className="text-gray-500">Alamat: {hotel.alamat}</div>
              <div>
                Harga per Malam: <span className="font-semibold">Rp{hotel.hargaPerMalam.toLocaleString("id-ID")}</span>
              </div>
              <div>Jumlah Kamar: <span className="font-semibold">{rencana.jumlahKamar || 1}</span></div>
            </div>
          ) : <div className="italic text-gray-400">Tidak menginap di hotel</div>}
        </div>
  
        <div className="mb-3">
          <div className="font-bold text-blue-700 mb-1">Kendaraan:</div>
          {kendaraan ? (
            <div className="bg-blue-50 p-3 rounded-lg mb-2">
              <div>Kendaraan: <b>{kendaraan.nama}</b> <span className="text-gray-500">({kendaraan.tipe})</span></div>
              <div>
                Harga: <span className="font-semibold">Rp{kendaraan.harga.toLocaleString("id-ID")}</span> x {trip.jumlahOrang} = <span className="font-semibold">Rp{(kendaraan.harga * trip.jumlahOrang).toLocaleString("id-ID")}</span>
              </div>
            </div>
          ) : <div className="italic text-gray-400">Tidak memilih kendaraan</div>}
        </div>
  
        <div className="mb-3">
          <div className="font-bold text-blue-700 mb-1">Anggota Trip:</div>
          {trip.members && trip.members.length > 0 ? (
            <ul className="bg-slate-50 rounded-lg p-3">
              {trip.members.map((m: any, idx: number) => (
                <li key={m.user.id} className="flex items-center gap-2 py-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full inline-block" />
                  <span className="font-medium">{m.user.username}</span>
                  <span className="text-gray-400">({m.user.email})</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="italic text-gray-400">Belum ada anggota yang terdaftar</div>
          )}
        </div>
  
        <div className="mt-6 bg-blue-100 rounded-xl px-6 py-4 flex flex-col items-center">
          <div className="text-lg font-bold text-blue-900 mb-2">
            Estimasi Total Biaya: <span className="text-2xl">Rp{estimasiBiaya.toLocaleString("id-ID")}</span>
          </div>
          <div className="font-semibold text-blue-800">
            Biaya Per Orang: <span className="text-xl">Rp{Math.round(estimasiBiaya / trip.jumlahOrang).toLocaleString("id-ID")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
