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
    $noHp: String!,
) {
    registerUser(
        username: $username, 
        email: $email,
        password: $password,
        firstName: $firstName,
        lastName: $lastName,
        noHp: $noHp,
    ) {
        user {
            id
            username
            email
        }
    }
} 
`;