import gql from "graphql-tag";


export const getAllUsers = gql`
  query getAllUsers {
    getAllUsers {
      id
      username
      age
      bio
    }
  }
`


export const getUserById = gql`
  query getUserById {
    getUserById {
      id
      username
      age
      bio
    }
  }
`