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
      placeholderText: 'Enter your email address',
      proceed: false,
      email: '',
      tokenCredentials: {},
    };
  }

  static navigationOptions = {
    header: null,
  };

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
      placeholderText: 'Enter your email address',
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
      this.refs.emailInput.focus();
      this.setState({
        placeholderText: 'your_email@example.com',
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

  enable_forward_arrow() {
    return this.state.proceed;
  }

  update_email_address(value) {
    this.setState({ email: value });
  }

  send_email_confirmation_code() {
    const email = this.state.email;
    fetch('http://127.0.0.1:8000/api/email_verification_codes/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then(response => {
        if (response.status == 201) {
          response.json();
          this.props.navigation.navigate('VerifyPhone', {
            email: email,
          });
        } else {
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
              if (this.enable_forward_arrow()) {
                this.send_email_confirmation_code();
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
                    Enter your email address
                  </Animated.Text>

                  {/* <Image
                    source={require('../../../assets/flag.png')}
                    style={{
                      height: 24,
                      width: 24,
                      resizeMode: 'contain',
                    }}
                  /> */}
                  <Animated.View
                    pointerEvents="none"
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      borderBottomWidth: this.borderBottomWidth,
                    }}
                  >
                    <TextInput
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      ref="emailInput"
                      style={{ flex: 1, fontSize: 20, borderBottomWidth: 0.5 }}
                      placeholder={this.state.placeholderText}
                      onChangeText={value => this.update_email_address(value)}
                    />
                  </Animated.View>
                </Animated.View>
              </TouchableOpacity>

              {/** LOGIN OPTION **/}
            </Animated.View>
          </Animatable.View>
        </ImageBackground>
      </View>
    );
  }
}
