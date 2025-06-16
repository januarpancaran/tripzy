import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_TRIP_MEMBERS, GET_ALL_USERS } from "../graphql/queries";
import { ADD_TRIP_MEMBER } from "../graphql/mutations";

export default function TripMembers({ tripId }: { tripId: string }) {
  const { data, refetch } = useQuery(GET_TRIP_MEMBERS, {
    variables: { tripId },
  });

  const { data: usersData } = useQuery(GET_ALL_USERS);
  const [selectedUserId, setSelectedUserId] = useState("");

  const [addTripMember] = useMutation(ADD_TRIP_MEMBER);

  const handleInvite = async () => {
    const selectedUser = usersData?.allUsers.find(
      (u: any) => u.id === selectedUserId,
    );
    if (!selectedUser) return;

    try {
      await addTripMember({
        variables: {
          tripId,
          username: selectedUser.username,
        },
      });
      setSelectedUserId("");
      refetch();
    } catch (err) {
      alert("Gagal mengundang user: " + err.message);
    }
  };

  if (!data) return null;

  const trip = data.trip;
  const isCreator = trip.memberStatus === "creator";

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Anggota Trip</h2>
      <ul className="space-y-2">
        {trip.members.map((m: any) => (
          <li
            key={m.id}
            className="border rounded p-2 flex justify-between items-center"
          >
            <div>
              <strong>{m.user.username}</strong> ({m.user.email})
            </div>
          </li>
        ))}
      </ul>

      {isCreator && usersData?.allUsers && (
        <div className="mt-4">
          <h3 className="font-medium mb-1">Tambah Anggota</h3>
          <div className="flex gap-2 items-center">
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            >
              <option value="">Pilih user...</option>
              {usersData.allUsers.map((user: any) => (
                <option key={user.id} value={user.id}>
                  {user.username} ({user.email})
                </option>
              ))}
            </select>
            <button
              onClick={handleInvite}
              disabled={!selectedUserId}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Tambah
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
