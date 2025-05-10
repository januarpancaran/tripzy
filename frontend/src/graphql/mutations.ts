import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
        token
    }
}
`;

export const REGISTER_USER = gql`
mutation RegisterUser(
    $username: String!,
    $email: String!,
    $password: String!,
    $firstName: String!,
    $lastName: String!,
    $noHp: String,
    $jenisKelamin: String,
    $tanggalLahir: Date,
    $kotaTinggal: String,
) {
    registerUser(
        username: $username, 
        email: $email,
        password: $password,
        firstName: $firstName,
        lastName: $lastName,
        noHp: $noHp,
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
    $noHp: String,
    $jenisKelamin: String,
    $tanggalLahir: String,
    $kotaTinggal: String,
) {
    updateProfile(
        noHp: $noHp,
        jenisKelamin: $jenisKelamin,
        tanggalLahir: $tanggalLahir,
        kotaTinggal: $kotaTinggal,
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
`