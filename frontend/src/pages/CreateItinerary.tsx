import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ALL_HOTELS,
  GET_ALL_KENDARAAN,
  GET_ALL_USERS,
  ME_QUERY,
} from "../graphql/queries";
import {
  CREATE_RENCANA_PERJALANAN,
  ADD_TRIP_MEMBER,
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

  const { data: hotelData } = useQuery(GET_ALL_HOTELS);
  const { data: kendaraanData } = useQuery(GET_ALL_KENDARAAN);
  const { data: userData } = useQuery(GET_ALL_USERS);
  const { data: meData } = useQuery(ME_QUERY);

  const [createRencana] = useMutation(CREATE_RENCANA_PERJALANAN);
  const [addTripMember] = useMutation(ADD_TRIP_MEMBER);

  const toggleUser = (userId: string) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  const handleSubmit = async () => {
    try {
      await createRencana({
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

      navigate("/");
    } catch (err) {
      console.error("Gagal menyimpan rencana perjalanan:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-4">Buat Rencana Perjalanan</h1>

      <div>
        <label className="block text-sm font-medium mb-1">Pilih Hotel:</label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
        >
          <option value="">-- Tidak Menginap --</option>
          {hotelData?.allHotel.map((hotel: any) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.nama} - Rp{hotel.hargaPerMalam.toLocaleString("id-ID")}
              /malam
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Jumlah Kamar:</label>
        <input
          type="number"
          min="1"
          value={jumlahKamar}
          onChange={(e) => setJumlahKamar(parseInt(e.target.value) || 1)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Pilih Kendaraan:
        </label>
        <select
          className="w-full border px-3 py-2 rounded"
          value={kendaraanId}
          onChange={(e) => setKendaraanId(e.target.value)}
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

      <div className="space-y-1">
        <label className="block text-sm font-medium mb-1">
          Undang Anggota Tambahan:
        </label>
        {userData?.allUsers
          ?.filter(
            (user: any) =>
              user.id !== meData?.me?.id &&
              user.username.toLowerCase() !== "admin",
          )
          .map((user: any) => {
            const isChecked = selectedUserIds.includes(user.id);
            return (
              <label key={user.id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleUser(user.id)}
                />
                <span>
                  {user.username} ({user.email})
                </span>
              </label>
            );
          })}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Simpan Rencana Perjalanan
      </button>
    </div>
  );
}
