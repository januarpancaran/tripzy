import { gql } from "@apollo/client";

export const HITUNG_ESTIMASI_BIAYA_TRIP = gql`
  query HitungEstimasiBiayaTrip(
    $asalId: ID!
    $tujuanId: ID!
    $jumlahOrang: Int!
    $lamaPerjalanan: Int!
    $tanggalBerangkat: Date!
    $hotelId: ID
    $jumlahKamar: Int
    $kendaraanId: ID
  ) {
    hitungEstimasiBiayaTrip(
      asalId: $asalId
      tujuanId: $tujuanId
      jumlahOrang: $jumlahOrang
      lamaPerjalanan: $lamaPerjalanan
      tanggalBerangkat: $tanggalBerangkat
      hotelId: $hotelId
      jumlahKamar: $jumlahKamar
      kendaraanId: $kendaraanId
    ) {
      biayaHotel
      biayaKendaraan
      totalEstimasi
    }
  }
`;
