import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      firstName
      lastName
      noHp
      jenisKelamin
      tanggalLahir
      kotaTinggal
    }
  }
`;

export const GET_DISKON = gql`
  query GetDiskon {
    allDiskon {
      id
      code
      tipeDiskon
      value
      minTransaksi
      expiresAt
      description
    }
  }
`;

export const GET_ALL_KOTA = gql`
  query GetAllKota {
    allKota {
      id
      nama
    }
  }
`;

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
