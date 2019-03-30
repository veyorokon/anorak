import gql from "graphql-tag";

const CREATE_SUBSCRIPTION_ACCOUNT = gql`
  mutation SubscriptionAccountMutation(
    $token: String!
    $serviceKey: Int!
    $planKey: Int!
    $username: String!
    $password: String!
    $isConnectedAccount: Boolean!
  ) {
    subscriptionAccount(
      token: $token
      serviceKey: $serviceKey
      planKey: $planKey
      password: $password
      username: $username
      isConnectedAccount: $isConnectedAccount
    ) {
      subscriptionAccount {
        id
        dateCreated
        dateModified
        statusAccount
        service {
          id
          name
        }
      }
    }
  }
`;

const CONFIRM_SUBSCRIPTION_CONNECT = gql`
  mutation SubscriptionAccountConnectConfirmMutation(
    $token: String!
    $subscriptionAccountKey: Int!
  ) {
    confirmConnectedAccount(
      token: $token
      subscriptionAccountKey: $subscriptionAccountKey
    ) {
      subscriptionAccount {
        id
        dateCreated
        dateModified
        statusAccount
        service {
          id
          name
        }
      }
    }
  }
`;

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String) {
    loginUser(email: $email, password: $password) {
      token
    }
  }
`;

const GET_FACEBOOK_USER = gql`
  mutation FacebookUser($email: String!, $facebookAccessToken: String!) {
    facebookUser(email: $email, facebookAccessToken: $facebookAccessToken) {
      token
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $firstName: String!
    $lastName: String
    $password: String!
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      token
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $token: String!
    $firstName: String!
    $lastName: String!
  ) {
    updateUser(token: $token, firstName: $firstName, lastName: $lastName) {
      user {
        id
        firstName
        lastName
      }
    }
  }
`;

const SET_STRIPE_CARD = gql`
  mutation SetStripeCard(
    $token: String!
    $cardToken: String!
    $nameOnCard: String!
  ) {
    setStripeCard(
      token: $token
      cardToken: $cardToken
      nameOnCard: $nameOnCard
    ) {
      user {
        id
      }
    }
  }
`;

const REQUEST_ACCOUNT_CANCELLATION = gql`
  mutation RequestCancellationMutation(
    $token: String!
    $memberKey: Int!
    $accountKey: Int!
  ) {
    requestCancellation(
      token: $token
      memberKey: $memberKey
      accountKey: $accountKey
    ) {
      managementRequest {
        id
        status
        requestedAction
      }
    }
  }
`;

export {
  CREATE_SUBSCRIPTION_ACCOUNT,
  LOGIN_USER,
  GET_FACEBOOK_USER,
  SET_STRIPE_CARD,
  UPDATE_USER,
  REQUEST_ACCOUNT_CANCELLATION,
  CREATE_USER,
  CONFIRM_SUBSCRIPTION_CONNECT
};
