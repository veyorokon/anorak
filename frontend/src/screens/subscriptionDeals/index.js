import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  Animated,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Icon, Header, Left, Button, Container } from 'native-base';

export default class SubscriptionDeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: this.props.navigation.state.params.phoneNumber,
      validation_token: this.props.navigation.state.params.validation_token,
    };
  }
  render() {
    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('Home')}
            >
              <Icon name="arrow-back" />
            </Button>
          </Left>
        </Header>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          <Text style={styles.title}>Unlimited Data</Text>
          <Text style={styles.title2}>$35</Text>
          <Image source={require('../../../assets/group-individual.png')} />
          <Animated.Text style={styles.paragraph}>
            No overages. No contract. No hassle. Just data, pure and simple.
          </Animated.Text>

          <Text style={styles.title3}>Would you like to SquadUp?</Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
            }}
          >
            <Button
              style={{
                width: 70,
                justifyContent: 'center',
                backgroundColor: 'rgba(52, 52, 52, 0.0)',
              }}
              onPress={() =>
                this.props.navigation.navigate('CompleteProfile', {
                  phoneNumber: this.state.phoneNumber,
                  validation_token: this.state.validation_token,
                })}
            >
              <Text style={{ color: 'blue', fontSize: 20 }}>Yes</Text>
            </Button>
            <Button
              style={{
                backgroundColor: 'rgba(52, 52, 52, 0.0)',
                marginLeft: 40,
                width: 70,
                justifyContent: 'center',
              }}
              onPress={() => this.props.navigation.navigate('Survey')}
            >
              <Text style={{ color: 'blue', fontSize: 20 }}>No</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10 + '%',
    color: 'black',
  },
  title2: {
    marginBottom: 40,
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
  title3: {
    marginBottom: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 50,
  },
  paragraph: {
    margin: 24,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    marginTop: 30,
  },
});
