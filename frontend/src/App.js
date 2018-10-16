import React from 'react';
import { Root } from 'native-base';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

import Home from './screens/home';
import Survey from './screens/survey';
import Account from './screens/account';
import Onboarding from './screens/onboarding';
import VerifyPhone from './screens/verifyPhone';
import DialogueModal from './screens/dialogueModal';
import CompleteProfile from './screens/completeProfile';
import SubscriptionDeals from './screens/subscriptionDeals';
import SubscriptionDashboard from './screens/subscriptionDashboard';

const Drawer = DrawerNavigator(
  {
    Home: { screen: Home },
    Survey: { screen: Survey },
    Account: { screen: Account },
    Onboarding: { screen: Onboarding },
    VerifyPhone: { screen: VerifyPhone },
    DialogueModal: { screen: DialogueModal },
    CompleteProfile: { screen: CompleteProfile },
    SubscriptionDeals: { screen: SubscriptionDeals },
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
