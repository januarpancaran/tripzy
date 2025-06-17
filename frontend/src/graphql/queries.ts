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

export const GET_TRIP_MEMBERS = gql`
  query GetTripMembers($tripId: ID!) {
    trip(id: $tripId) {
      id
      namaTrip
      memberStatus
      members {
        id
        status
        user {
          id
          username
          email
        }
      }
    }
  }
`;

export const GET_MY_TRIPS = gql`
  query GetMyTrips {
    allTrip {
      tripId
      namaTrip
      asal {
        nama
      }
      tujuan {
        nama
      }
      jumlahOrang
      lamaPerjalanan
      tanggalBerangkat
      members {
        user {
          username
        }
      }
    }
  }
`;

export const GET_SINGLE_TRIP_DETAILS = gql`
  query GetSingleTripDetails($tripId: ID!) {
    trip(id: $tripId) {
      tripId
      namaTrip
      memberStatus
      members {
        id
        status
        invitedAt
        acceptedAt
        user {
          id
          username
          email
        }
      }
    }
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers {
    allUsers {
      id
      username
      email
    }
  }
`;

export const GET_ALL_KENDARAAN = gql`
  query GetAllKendaraan {
    allKendaraan {
      id
      nama
      tipe
      harga
    }
  }
`;

export const GET_ALL_HOTELS = gql`
  query GetAllHotels {
    allHotel {
      id
      nama
      alamat
      hargaPerMalam
    }
  }
`;

export const LIST_RENCANA_PERJALANAN = gql`
  query listRencanaPerjalanan {
    allRencanaPerjalanan {
      rencanaId
      trip {
        tripId
        namaTrip
        asal {
          nama
        }
        tujuan {
          nama
        }
        memberStatus
        members {
          user {
            id
            username
            email
          }
        }
        jumlahOrang
        lamaPerjalanan
        tanggalBerangkat
      }
      hotel {
        nama
        alamat
        hargaPerMalam
      }
      jumlahKamar
      kendaraan {
        tipe
        nama
        harga
      }
      estimasiBiaya
    }
  }
`;

export const GET_ALL_LAPORAN_PENGELUARAN = gql`
  query ListLaporanPengeluaran {
    allLaporanPengeluaran {
      laporanId
      trip {
        tripId
        namaTrip
        asal {
          nama
        }
        tujuan {
          nama
        }
        memberStatus
        members {
          user {
            id
            username
            email
          }
        }
        jumlahOrang
        lamaPerjalanan
        tanggalBerangkat
      }
      rencana {
        rencanaId
        hotel {
          nama
          alamat
          hargaPerMalam
        }
        kendaraan {
          tipe
          nama
          harga
        }
      }
      totalBiaya
      biayaPerOrang
    }
  }
`;
