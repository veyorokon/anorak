import gql from 'graphql-tag';

const SUBSCRIPTION_SERVICES = gql`
query SubscriptionServices{
  subscriptionServices{
    id
    name
    isUsernameEmail
    urlHome
    urlTermsOfService
    isAvailable
    pricingPlans{
      id
      amount
      isActive
      maximumSize
    }
  }
}
`;

const USER = gql`
  query User($token: String!) {
    user(token: $token) {
      id
      firstName
      lastName
      email
      
    }
  }
`;



export { SUBSCRIPTION_SERVICES, USER }