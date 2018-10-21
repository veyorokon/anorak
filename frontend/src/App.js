import React from 'react';
import { Root } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Home from './screens/home';
import Account from './screens/account';
import Onboarding from './screens/onboarding';
import VerifyPhone from './screens/verifyPhone';
import SubscriptionDashboard from './screens/subscriptionDashboard';

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    Account: { screen: Account },
    Onboarding: { screen: Onboarding },
    VerifyPhone: { screen: VerifyPhone },
    SubscriptionDashboard: { screen: SubscriptionDashboard },
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      drawerLockMode: 'locked-closed',
    },
  }
);

const AppNavigator = StackNavigator(
  {
    Drawer: { screen: Drawer },
  },
  {
    initialRouteName: 'Drawer',
    headerMode: 'none',
  }
);

export default () =>
  <Root>
    <AppNavigator />
  </Root>;
