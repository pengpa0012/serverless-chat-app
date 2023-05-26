const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const userTableName = 'chatAppUserTable';

exports.handler = async (event) => {
  const { username, password } = JSON.parse(event.body);

  // Generate a unique ID for the user
  const userId = uuidv4();

  // 1. Register the user in Cognito User Pools
  const cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();
  const cognitoParams = {
    UserPoolId: process.env.USER_POOL_ID,
    Username: username,
    TemporaryPassword: password,
  };

  try {
    await cognitoIdentityServiceProvider.adminCreateUser(cognitoParams).promise();
  } catch (error) {
    console.log('Error registering user in Cognito:', error);
    throw new Error('Failed to register user');
  }

  // 2. Save the user data to DynamoDB
  const userItem = {
    id: userId,
    username,
  };

  const dynamoParams = {
    TableName: userTableName,
    Item: userItem,
  };

  try {
    await dynamoDB.put(dynamoParams).promise();
  } catch (error) {
    console.log('Error saving user data to DynamoDB:', error);
    throw new Error('Failed to save user data');
  }

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Headers" : "Content-Type",
      'Access-Control-Allow-Origin': 'http://127.0.0.1:5173',
      'Access-Control-Allow-Credentials': true,
      "Access-Control-Allow-Methods": "*"
    },
    body: JSON.stringify({ message: 'User registered successfully', userItem }),
  };
};
