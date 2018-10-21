import React from 'react';
import {
  Text,
  TextInput,
  Platform,
  Keyboard,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { Icon } from 'native-base';
import * as Animatable from 'react-native-animatable';
import { AsyncStorage, Alert } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholderText: 'Enter your mobile number',
      proceed: false,
      phone_number: '',
      numberIsNull: true,
      credentials: {},
    };
    this.retrieve_data();
  }

  static navigationOptions = {
    header: null,
  };

  retrieve_data = async () => {
    try {
      const session_token = await AsyncStorage.getItem('SQUAD_UP_SESSION_KEY');
      const username = await AsyncStorage.getItem('SQUAD_UP_USERNAME');
      if (session_token !== null && username !== null) {
        this.setState({
          credentials: {
            phone_number: username,
            session_token: session_token,
          },
        });
        this.request_auto_token_login();
      }
    } catch (error) {}
  };

  request_auto_token_login() {
    fetch('http://127.0.0.1:8000/api/users/token_login/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state.credentials),
    })
      .then(response => {
        if (response.status == 200) {
          this.props.navigation.navigate('SubscriptionDashboard', {
            user: JSON.parse(response._bodyInit),
          });
        } else {
        }
      })
      .catch(() => {
        //alert(JSON.stringify(err.message));
      });
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

    this.setState({
      placeholderText: 'Enter your mobile number',
    });

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

  increase_height_of_login = () => {
    Animated.timing(this.loginHeight, {
      toValue: SCREEN_HEIGHT,
      duration: 500,
    }).start(() => {
      this.refs.textInputMobile.focus();
      this.setState({
        placeholderText: '092123456789',
        proceed: true,
      });
    });
  };

  decrease_height_of_login = () => {
    Keyboard.dismiss();
    this.setState({
      proceed: false,
    });
    Animated.timing(this.loginHeight, {
      toValue: 150,
      duration: 500,
    }).start();
  };

  allow_forward_arrow() {
    return this.state.proceed;
  }

  update_phone_number(value) {
    this.setState({ phone_number: value.replace(/[^0-9]/g, '') });
  }

  _showInvalidNumberAlert = () =>
    Alert.alert(
      'Invalid Number',
      'Please enter a valid US phone number.',
      [
        {
          text: 'OK',
        },
      ],
      { cancelable: false }
    );

  request_phone_verification_code() {
    const number = '1' + this.state.phone_number;
    fetch('http://127.0.0.1:8000/api/phone_verification_codes/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number: number, isRequestingCode: 1 }),
    })
      .then(response => {
        if (response.status == 201) {
          this.props.navigation.navigate('VerifyPhone', {
            phone_number: number,
          });
        } else {
          this._showInvalidNumberAlert();
        }
      })
      .catch(() => {});
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
          <TouchableOpacity onPress={() => this.decrease_height_of_login()}>
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
            flexDirection: 'row',
          }}
        >
          <Icon
            name="md-arrow-forward"
            onPress={() => {
              if (this.allow_forward_arrow()) {
                this.request_phone_verification_code();
              }
            }}
            style={{ color: 'black' }}
          />
        </Animated.View>

        <ImageBackground
          source={require('../../../assets/stars.jpg')}
          style={{ flex: 1 }}
        >
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Animatable.View animation="zoomIn" iterationCount={1}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 30, color: 'white' }}
              >
                SquadUp
              </Text>
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
                  <Text style={{ fontSize: 24 }}>{`Let's Get Started`}</Text>
                </Animated.View>
              </View>

              {/** BOTTOM FORM **/}
              <TouchableOpacity onPress={() => this.increase_height_of_login()}>
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
                    Sign Up
                  </Animated.Text>

                  <Image
                    source={require('../../../assets/flag.png')}
                    style={{
                      height: 24,
                      width: 24,
                      resizeMode: 'contain',
                    }}
                  />
                  <Animated.View
                    pointerEvents="none"
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderBottomWidth: this.borderBottomWidth,
                    }}
                  >
                    <Text style={{ fontSize: 20, paddingHorizontal: 10 }}>
                      +1
                    </Text>
                    <TextInput
                      ref="textInputMobile"
                      keyboardType="numeric"
                      style={{ flex: 1, fontSize: 20, borderBottomWidth: 0.5 }}
                      placeholder={this.state.placeholderText}
                      onChangeText={value => this.update_phone_number(value)}
                    />
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>
              <Animated.Text
                animation="slideInUp"
                iterationCount={1}
                style={{
                  fontSize: 12,
                  color: 'gray',
                  position: 'absolute',
                  bottom: titleTextBottom,
                  left: titleTextLeft,
                  right: titleTextLeft,
                  opacity: titleTextOpacity,
                  marginTop: 50 + '%',
                  flex: 1,
                }}
              >
                By continuing, we will send you an SMS to confirm your phone
                number. Message &amp; data rates may apply.
              </Animated.Text>

              {/** LOGIN OPTION **/}
            </Animated.View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}
