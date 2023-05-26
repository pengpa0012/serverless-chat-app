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
export const getAllMessages = gql`
  query getAllMessages {
    getAllMessages {
      id
      username
      date
      message
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

export const createMessage = gql`
  mutation createMessage($input: MessageInput!) {
    createMessage(input: $input) {
      id
      username
      date
      message
    }
  }
`

export const onCreateMessage = `
  subscription onCreateMessage {
    onCreateMessage {
      id
      username
      date
      message
    }
  }
`