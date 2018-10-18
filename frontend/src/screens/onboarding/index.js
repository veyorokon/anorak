import { Image } from 'react-native';
import React, { Component } from 'react';

import Onboarding from 'react-native-onboarding-swiper';

export default class Simple extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image source={require('../../../assets/group-individual.png')} />
            ),
            title: 'Groups Vs. Individuals',
            subtitle:
              'When it comes to subscription services, groups generally enjoy better prices than individuals.',
          },
          {
            backgroundColor: '#fe6e58',
            image: <Image source={require('../../../assets/group.png')} />,
            title: 'Squads',
            subtitle:
              'By finding users interested in similar subscriptions, we create squads so users get better prices.',
          },
          {
            backgroundColor: '#999',
            image: <Image source={require('../../../assets/network.png')} />,
            title: 'SquadUp',
            subtitle:
              'We manage everything - from payments to signups and cancellations; so you can just do you!',
          },
        ]}
        onDone={() =>
          this.props.navigation.navigate('SubscriptionDashboard', {
            user: this.props.navigation.state.params.user,
          })}
      />
    );
  }
}
