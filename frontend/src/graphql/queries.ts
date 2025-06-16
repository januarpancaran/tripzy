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
