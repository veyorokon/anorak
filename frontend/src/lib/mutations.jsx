import gql from 'graphql-tag';

const CREATE_SUBSCRIPTION_ACCOUNT = gql`
mutation SubscriptionAccountMutation(
    $token:String!, 
    $serviceKey:Int!, 
    $planKey:Int!, 
    $username:String!, 
    $password:String!
) {
    subscriptionAccount(
        token:$token, 
        serviceKey:$serviceKey, 
        planKey:$planKey, 
        password:$password, 
        username:$username)
        {
      subscriptionAccount {
        id
        dateCreated
        dateModified
        statusAccount
        service{
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

export { CREATE_SUBSCRIPTION_ACCOUNT, LOGIN_USER, GET_FACEBOOK_USER }