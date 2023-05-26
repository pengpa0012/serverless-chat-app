import { Auth } from 'aws-amplify';


export const getAuthorizationToken = async () => {
  try {
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  } catch (error) {
    // Handle token retrieval error
    console.error('Error retrieving authorization token:', error);
    return null;
  }
}
