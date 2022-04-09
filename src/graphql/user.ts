import { gql } from '@apollo/client';

export const LOGGED_IN_USER = gql`
query Query {
  getMe {
    email
    id
    username
  }
}
`

export const USERS = gql`
query Query {
  listUsers {
    email
    username
  }
}
`