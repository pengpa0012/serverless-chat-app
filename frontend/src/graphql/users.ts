
export const getAllUsers = `
  query getAllUsers {
    getAllUsers {
      id
      username
      age
      bio
    }
  }
`
export const getAllMessages = `
  query getAllMessages {
    getAllMessages {
      id
      username
      date
      message
    }
  }
`


export const getUserById = `
  query getUserById {
    getUserById {
      id
      username
      age
      bio
    }
  }
`

export const createMessage = `
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