import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
      user {
        username
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation RegisterUser(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $noHp: String
    $jenisKelamin: String
    $tanggalLahir: Date
    $kotaTinggal: String
  ) {
    registerUser(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      noHp: $noHp
      jenisKelamin: $jenisKelamin
      tanggalLahir: $tanggalLahir
      kotaTinggal: $kotaTinggal
    ) {
      user {
        id
        username
        email
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $noHp: String
    $jenisKelamin: String
    $tanggalLahir: Date
    $kotaTinggal: String
  ) {
    updateProfile(
      noHp: $noHp
      jenisKelamin: $jenisKelamin
      tanggalLahir: $tanggalLahir
      kotaTinggal: $kotaTinggal
    ) {
      user {
        id
        noHp
        jenisKelamin
        tanggalLahir
        kotaTinggal
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
      success
      errors
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email) {
      success
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword(
    $uid: String!
    $token: String!
    $newPassword: String!
  ) {
    resetPassword(uid: $uid, token: $token, newPassword: $newPassword) {
      success
      errors
    }
  }
`;

export const CREATE_TRIP = gql`
  mutation CreateTrip(
    $namaTrip: String!
    $asalId: ID!
    $tujuanId: ID!
    $tanggalBerangkat: Date!
    $lamaPerjalanan: Int!
    $jumlahOrang: Int!
  ) {
    createTrip(
      namaTrip: $namaTrip
      asalId: $asalId
      tujuanId: $tujuanId
      tanggalBerangkat: $tanggalBerangkat
      lamaPerjalanan: $lamaPerjalanan
      jumlahOrang: $jumlahOrang
    ) {
      trip {
        tripId
      }
    }
  }
`;

export const ADD_TRIP_MEMBER = gql`
  mutation AddTripMember($tripId: ID!, $username: String!) {
    addTripMember(tripId: $tripId, username: $username) {
      tripMember {
        id
        status
        user {
          id
          username
        }
      }
    }
  }
`;

export const UPDATE_TRIP_MEMBER_STATUS = gql`
  mutation UpdateTripMemberStatus($tripId: ID!, $status: String!) {
    updateTripMemberStatus(tripId: $tripId, status: $status) {
      tripMember {
        id
        status
      }
    }
  }
`;
