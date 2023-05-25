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