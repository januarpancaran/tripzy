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
