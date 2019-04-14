import gql from "graphql-tag";

const SUBSCRIPTION_SERVICES = gql`
  query SubscriptionServices {
    subscriptionServices {
      id
      name
      isUsernameEmail
      urlHome
      urlTermsOfService
      isAvailable
      pricingPlans {
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
      isMember
      dashboardAccounts {
        id
        dateCreated
        statusAccount
        subscriptionPlan {
          id
          amount
        }
        subscriptionService {
          id
          name
        }
        responsibleUser {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const CUSTOMER = gql`
  query customer($token: String!) {
    customer(token: $token)
  }
`;

// const USER_INVOICES = gql`
// query user($token: String!) {
//   user(token: $token) {
//     firstName
//     lastName
//     email
//     stripeCustomer{
//         line1
//         line2
//         city
//         state
//         country
//         lastFour
//     }
//     invoices{
//       id
//       dateFor
//       dateCreated
//       items{
//         usage
//         amount
//         subscriptionMember{
//           subscriptionAccount{
//             pricePlan{
//               amount
//             }
//             service{
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `;

const ACCOUNT_CREDENTIALS = gql`
  query AccountCredentials($token: String!, $subscriptionAccountKey: Int!) {
    accountCredentials(
      token: $token
      subscriptionAccountKey: $subscriptionAccountKey
    ) {
      username
      password
    }
  }
`;

export { SUBSCRIPTION_SERVICES, USER, ACCOUNT_CREDENTIALS, CUSTOMER };
