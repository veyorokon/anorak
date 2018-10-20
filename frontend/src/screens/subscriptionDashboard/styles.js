import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');

export default {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',

    ...Platform.select({
      ios: {
        paddingTop: 10,
        paddingBottom: 10,
      },
    }),
  },

  title: {
    fontSize: 20,
    color: 'black',
  },
  subtitle: {
    fontSize: 16,
    color: '#999999',
  },

  list: {
    flex: 1,
    marginBottom: 50,
    marginTop: 15,
  },

  contentContainer: {
    width: window.width,

    ...Platform.select({
      ios: {
        paddingHorizontal: 15,
      },

      android: {
        paddingHorizontal: 0,
      },
    }),
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 80,
    flex: 1,
    marginTop: 7,
    marginBottom: 12,
    borderRadius: 4,

    ...Platform.select({
      ios: {
        width: window.width - 30 * 2,
        shadowColor: 'rgba(0,0,0,0.2)',
        shadowOpacity: 1,
        shadowOffset: { height: 2, width: 2 },
        shadowRadius: 2,
      },

      android: {
        width: window.width - 30 * 2,
        elevation: 0,
        marginHorizontal: 30,
      },
    }),
  },

  image: {
    height: 200,
    width: null,
    flex: 1,
  },

  text: {
    fontSize: 20,
    paddingVertical: 20,
  },
};
