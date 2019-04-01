import gql from "graphql-tag";

const CREATE_SUBSCRIPTION_ACCOUNT = gql`
  mutation SubscriptionCreateMutation(
    $token: String!
    $serviceKey: Int!
    $planKey: Int!
    $username: String!
    $password: String!
  ) {
    subscriptionCreateAccount(
      token: $token
      serviceKey: $serviceKey
      planKey: $planKey
      password: $password
      username: $username
    ) {
      subscriptionAccount {
        id
        responsibleUser {
          id
          firstName
        }
        subscriptionService {
          id
          name
        }
        type
        subscriptionPlan {
          id
          amount
        }
      }
    }
  }
`;

const CONNECT_SUBSCRIPTION_ACCOUNT = gql`
  mutation SubscriptionConnectMutation(
    $token: String!
    $serviceKey: Int!
    $planKey: Int!
    $username: String!
    $password: String!
  ) {
    subscriptionConnectAccount(
      token: $token
      serviceKey: $serviceKey
      planKey: $planKey
      password: $password
      username: $username
    ) {
      subscriptionAccount {
        id
        responsibleUser {
          id
          firstName
        }
        subscriptionService {
          id
          name
        }
        type
        subscriptionPlan {
          id
          amount
        }
      }
    }
  }
`;

const CONFIRM_SUBSCRIPTION_CONNECT = gql`
  mutation ConfirmConnectAccountMutation(
    $token: String!
    $subscriptionAccountKey: Int!
  ) {
    confirmConnectAccount(
      token: $token
      subscriptionAccountKey: $subscriptionAccountKey
    ) {
      subscriptionMember {
        id
        dateCreated
        dateModified
        subscriptionAccount {
          id
          statusAccount
          subscriptionService {
            id
            name
          }
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
  mutation CancelSubscriptionMember(
    $token: String!
    $subscriptionAccountKey: Int!
  ) {
    cancelMemberRequest(
      token: $token
      subscriptionAccountKey: $subscriptionAccountKey
    ) {
      managementRequest {
        id
        status
        requestedAction
        requestedBy {
          id
          email
        }
      }
    }
  }
`;

export {
  CREATE_SUBSCRIPTION_ACCOUNT,
  CONNECT_SUBSCRIPTION_ACCOUNT,
  LOGIN_USER,
  GET_FACEBOOK_USER,
  SET_STRIPE_CARD,
  UPDATE_USER,
  REQUEST_ACCOUNT_CANCELLATION,
  CREATE_USER,
  CONFIRM_SUBSCRIPTION_CONNECT
};
