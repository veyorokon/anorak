import React from 'react';
import {
  Text,
  TextInput,
  Platform,
  Keyboard,
  Dimensions,
  Animated,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';

import api from '../../lib/api';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class VerifyPhone extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderText: 'Confirmation Code',
      proceed: true,
      code: '',
      phone_number: this.props.navigation.state.params.phone_number,
    };
  }

  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.increaseHeightOfLogin();
  }

  componentWillMount() {
    this.loginHeight = new Animated.Value(150);
    this.keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      this.keyboardWillShow
    );
    this.keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      this.keyboardWillHide
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardWillShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardWillHide
    );

    this.keyboardHeight = new Animated.Value(0);
    this.forwardArrowOpacity = new Animated.Value(0);
    this.borderBottomWidth = new Animated.Value(0);
  }

  keyboardWillShow = event => {
    if (Platform.OS == 'android') {
      var duration = 100;
    } else {
      duration = event.duration;
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: event.endCoordinates.height + 10,
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 1,
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 1,
      }),
    ]).start();
  };

  keyboardWillHide = event => {
    if (Platform.OS == 'android') {
      var duration = 100;
    } else {
      duration = event.duration;
    }

    Animated.parallel([
      Animated.timing(this.keyboardHeight, {
        duration: duration + 100,
        toValue: 0,
      }),
      Animated.timing(this.forwardArrowOpacity, {
        duration: duration,
        toValue: 0,
      }),
      Animated.timing(this.borderBottomWidth, {
        duration: duration,
        toValue: 0,
      }),
    ]).start();
  };

  increaseHeightOfLogin = () => {
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500,
    }).start(() => {
      this.refs.textInputMobile.focus();
    });
  };

  allowForwardArrow() {
    return this.state.proceed;
  }

  updateConfirmationCode(value) {
    this.setState({ code: value.replace(/[^0-9]/g, '') });
  }

  _showInvalidConfirmationCodeAlert = () =>
    Alert.alert(
      'Invalid Confirmation Code',
      'Please check your messages for your SquadUp code and try again.',
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false }
    );

  send_phone_verification_code() {
    const number = this.state.phone_number;
    const code = this.state.code;
    api
      .sendPhoneVerificationCode(number, code)
      .then(data => {
        this.send_registration_request(data.session_token);
      })
      .catch(() => {
        this._showInvalidConfirmationCodeAlert();
      });
  }

  /**
   * send_registration_request Sends a POST request to the server to register user
   * @return {[type]} [returns none]
   */
  send_registration_request(session_token) {
    this.setState({ submittingSignup: true }, () => {
      const phone_number = this.state.phone_number;
      api
        .sendRegistrationRequest(session_token, phone_number)
        .then(data => {
          this.props.navigation.navigate('Onboarding', {
            user: data['user'],
            dashboardData: data['dashboardData'],
          });
        })
        .catch(() => {
          // TODO: fix
          this.show_duplicate_email_alert();
        })
        .finally(() => {
          this.setState({ submittingSignup: false });
        });
    });
  }

  render() {
    const headerTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [1, 0],
    });

    const marginTop = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [25, 100],
    });

    const headerBackArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });

    const forwardArrowOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });

    const titleTextLeft = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [100, 25],
    });

    const titleTextBottom = this.loginHeight.interpolate({
      inputRange: [150, 400, SCREEN_HEIGHT],
      outputRange: [0, 0, 100],
    });

    const titleTextOpacity = this.loginHeight.interpolate({
      inputRange: [150, SCREEN_HEIGHT],
      outputRange: [0, 1],
    });

    return (
      <View style={{ flex: 1 }}>
        {/** BACK ARROW **/}
        <Animated.View
          style={{
            position: 'absolute',
            height: 60,
            width: 60,
            top: 60,
            zIndex: 100,
            left: 25,
            opacity: headerBackArrowOpacity,
          }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}
          >
            <Icon name="md-arrow-back" style={{ color: 'black' }} />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            height: 60,
            width: 60,
            right: 10,
            bottom: this.keyboardHeight,
            zIndex: 100,
            opacity: forwardArrowOpacity,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
          }}
        >
          <Icon
            name="md-arrow-forward"
            onPress={() => {
              if (this.allowForwardArrow()) {
                this.send_phone_verification_code();
              }
            }}
            style={{ color: 'black' }}
          />
        </Animated.View>

        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Animatable.View animation="zoomIn" iterationCount={1}>
            <Text
              style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}
            />
          </Animatable.View>
        </View>

        {/** BOTTOM HALF **/}
        <Animatable.View animation="slideInUp" iterationCount={1}>
          <Animated.View
            style={{
              height: this.loginHeight,
              backgroundColor: 'white',
            }}
          >
            <View
              style={{
                alignItems: 'flex-start',
              }}
            >
              <Animated.View
                style={{
                  opacity: headerTextOpacity,
                  paddingHorizontal: 25,
                  marginTop: marginTop,
                }}
              >
                <Text style={{ fontSize: 24 }}>Verify Your Number</Text>
              </Animated.View>
            </View>

            {/** BOTTOM FORM **/}
            <TouchableOpacity>
              <Animated.View
                style={{
                  marginTop: marginTop,
                  paddingHorizontal: 25,
                  flexDirection: 'row',
                }}
              >
                <Animated.Text
                  style={{
                    fontSize: 24,
                    color: 'gray',
                    position: 'absolute',
                    bottom: titleTextBottom,
                    left: titleTextLeft,
                    opacity: titleTextOpacity,
                  }}
                >
                  Confirm Your Number
                </Animated.Text>

                <Animated.View
                  pointerEvents="none"
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderBottomWidth: this.borderBottomWidth,
                  }}
                >
                  <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
                    Code:
                  </Text>
                  <TextInput
                    ref="textInputMobile"
                    keyboardType="numeric"
                    style={{ flex: 1, fontSize: 20, borderBottomWidth: 0.5 }}
                    placeholder={this.state.placeholderText}
                    onChangeText={value => this.updateConfirmationCode(value)}
                  />
                </Animated.View>
              </Animated.View>
            </TouchableOpacity>

            {/** LOGIN OPTION **/}
          </Animated.View>
        </Animatable.View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
