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
        stripeCustomer{
            id
            hasCardOnFile
            line1
            line2
            city
            state
            country
            name
            lastFour
            taxRate
        }
        
        subscriptionMemberships{
          id
          dateCreated
          dateModified
          statusMembership
          subscriptionAccount{
            id
            dateCreated
            statusAccount
            pricePlan{
                amount
            }
            service{
              id
              name
            }
            responsibleUser{
                firstName
                lastName
            }
          }
        }
    }
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
query AccountCredentials($token:String!, $membershipKey:Int!){
  accountCredentials(token:$token, membershipKey:$membershipKey){
    username,
    password,
  }
}
`;

export { SUBSCRIPTION_SERVICES, USER, ACCOUNT_CREDENTIALS }
