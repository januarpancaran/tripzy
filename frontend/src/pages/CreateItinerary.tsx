import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_HOTELS,
  GET_ALL_KENDARAAN,
  GET_ALL_USERS,
  ME_QUERY,
  GET_ALL_LAPORAN_PENGELUARAN,
} from "../graphql/queries";
import {
  CREATE_RENCANA_PERJALANAN,
  ADD_TRIP_MEMBER,
  CREATE_LAPORAN_PENGELUARAN,
} from "../graphql/mutations";
import { useState } from "react";

export default function CreateItinerary() {
  const location = useLocation();
  const navigate = useNavigate();
  const { tripId, tipeKendaraan } = location.state || {};

  const [hotelId, setHotelId] = useState("");
  const [kendaraanId, setKendaraanId] = useState("");
  const [jumlahKamar, setJumlahKamar] = useState(1);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createLaporan, setCreateLaporan] = useState(false);

  const { data: hotelData } = useQuery(GET_ALL_HOTELS);
  const { data: kendaraanData } = useQuery(GET_ALL_KENDARAAN);
  const { data: userData } = useQuery(GET_ALL_USERS);
  const { data: meData } = useQuery(ME_QUERY);

  const [createRencana] = useMutation(CREATE_RENCANA_PERJALANAN, {
    refetchQueries: [{ query: GET_ALL_LAPORAN_PENGELUARAN }],
  });
  const [addTripMember] = useMutation(ADD_TRIP_MEMBER);
  const [createLaporanPengeluaran] = useMutation(CREATE_LAPORAN_PENGELUARAN);

  if (!tripId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <p className="text-red-500 text-center text-lg">
            Data trip tidak tersedia.
          </p>
        </div>
      </div>
    );
  }

  const toggleUser = (userId: string) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const rencanaResult = await createRencana({
        variables: {
          tripId: tripId,
          hotelId: hotelId || null,
          kendaraanId: kendaraanId || null,
          jumlahKamar: jumlahKamar,
        },
      });

      for (const userId of selectedUserIds) {
        const user = userData?.allUsers?.find((u: any) => u.id === userId);
        if (user) {
          await addTripMember({
            variables: {
              tripId: tripId,
              username: user.username,
            },
          });
        }
      }

      // Create laporan pengeluaran if requested
      if (
        createLaporan &&
        rencanaResult.data?.createRencanaPerjalanan?.rencana
      ) {
        const rencanaId =
          rencanaResult.data.createRencanaPerjalanan.rencana.rencanaId;
        await createLaporanPengeluaran({
          variables: {
            tripId: tripId,
            rencanaId: rencanaId,
          },
        });
      }

      // Navigate after all operations are complete
      navigate("/tripinfo", { state: { tripId } });
    } catch (err) {
      console.error("Gagal menyimpan rencana perjalanan:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Buat Rencana Perjalanan
          </h1>

          <div className="space-y-6">
            {/* Hotel Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Hotel
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={hotelId}
                onChange={(e) => setHotelId(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">-- Tidak Menginap --</option>
                {hotelData?.allHotel.map((hotel: any) => (
                  <option key={hotel.id} value={hotel.id}>
                    {hotel.nama} - Rp
                    {hotel.hargaPerMalam.toLocaleString("id-ID")}
                    /malam
                  </option>
                ))}
              </select>
            </div>

            {/* Jumlah Kamar Section */}
            {hotelId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jumlah Kamar: {jumlahKamar}
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setJumlahKamar(Math.max(1, jumlahKamar - 1))}
                    disabled={isSubmitting}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={jumlahKamar}
                    onChange={(e) =>
                      setJumlahKamar(parseInt(e.target.value) || 1)
                    }
                    disabled={isSubmitting}
                    className="w-20 px-4 py-2 border border-gray-300 rounded-lg text-center focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setJumlahKamar(jumlahKamar + 1)}
                    disabled={isSubmitting}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors disabled:opacity-50"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Kendaraan Section */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pilih Kendaraan
              </label>
              <select
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                value={kendaraanId}
                onChange={(e) => setKendaraanId(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="">-- Tidak Memilih Kendaraan --</option>
                {kendaraanData?.allKendaraan
                  ?.filter((k: any) =>
                    tipeKendaraan ? k.tipe === tipeKendaraan : true,
                  )
                  .map((k: any) => (
                    <option key={k.id} value={k.id}>
                      {k.nama} - Rp{k.harga.toLocaleString("id-ID")}
                    </option>
                  ))}
              </select>
            </div>

            {/* Anggota Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Undang Anggota Tambahan
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {userData?.allUsers
                  ?.filter(
                    (user: any) =>
                      user.id !== meData?.me?.id &&
                      user.username.toLowerCase() !== "admin",
                  )
                  .map((user: any) => {
                    const isChecked = selectedUserIds.includes(user.id);
                    return (
                      <label
                        key={user.id}
                        className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleUser(user.id)}
                          disabled={isSubmitting}
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <span className="text-gray-700">
                          {user.username}
                          <span className="text-gray-500 text-sm ml-1">
                            ({user.email})
                          </span>
                        </span>
                      </label>
                    );
                  })}
              </div>
            </div>

            {/* Laporan Pengeluaran Section */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={createLaporan}
                  onChange={(e) => setCreateLaporan(e.target.checked)}
                  disabled={isSubmitting}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <span className="text-sm font-medium text-gray-700">
                    Buat Laporan Pengeluaran
                  </span>
                  <p className="text-xs text-gray-500 mt-1">
                    Otomatis menghitung total biaya dan biaya per orang
                    berdasarkan rencana perjalanan
                  </p>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? createLaporan
                    ? "Menyimpan Rencana & Laporan..."
                    : "Menyimpan Rencana..."
                  : "Lanjut"}
              </button>
            </div>

            {createLaporan && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-4 w-4 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-2">
                    <p className="text-sm text-green-700">
                      Laporan pengeluaran akan dibuat secara otomatis dengan
                      perhitungan biaya per orang
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
