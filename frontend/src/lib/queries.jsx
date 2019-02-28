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
query user($token: String!) {
    user(token: $token) {
        id
        email
        firstName
        lastName
        subscriptionMemberships{
          id
          statusMembership
          subscriptionAccount{
            statusAccount
            pricePlan{
                amount
            }
            service{
              id
              name
            }
          }
        }
    }
}
`;

const ACCOUNT_CREDENTIALS = gql`
query AccountCredentials($token:String!, $membershipKey:Int!){
  accountCredentials(token:$token, membershipKey:$membershipKey){
    username,
    password,
  }
}
`;

export { SUBSCRIPTION_SERVICES, USER, ACCOUNT_CREDENTIALS }