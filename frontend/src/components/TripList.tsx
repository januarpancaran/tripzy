export default function TripList() {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Daftar Trip</h3>
      <p className="text-gray-600">Ini adalah halaman untuk menampilkan daftar trip yang Anda ikuti atau buat.</p>
      {/* Add your trip listing logic here */}
      <ul className="mt-4 space-y-2">
        <li className="p-3 bg-white rounded-md shadow-sm">Trip to Bali - July 2025</li>
        <li className="p-3 bg-white rounded-md shadow-sm">Hiking Merbabu - August 2025</li>
        <li className="p-3 bg-white rounded-md shadow-sm">Explore Jogja - September 2025</li>
      </ul>
    </div>
  );
}