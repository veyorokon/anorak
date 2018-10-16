const React = require('react-native');
const { Dimensions, Platform } = React;
const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    backgroundColor: '#FFF',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  imageContainer: {
    flex: 1,
    width: null,
    height: null,
  },
  logoContainer: {
    flex: 1,
    marginTop: deviceHeight / 8,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logo: {
    position: 'absolute',
    //left: Platform.OS === 'android' ? 40 : 50,
    top: Platform.OS === 'android' ? 35 : 60,
    width: 280,
    height: 100,
    color: '#120F23',
    fontSize: 40,
  },
  text: {
    color: '#120F23',
    bottom: 6,
    marginTop: 5,
  },
};
