import {StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageCover: {
    flex: 1,
    justifyContent: 'center',
  },
  centerTag: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#FCBC31',
    fontSize: 48,
    fontWeight: '600',
  },
  secTitle: {
    color: '#7B5C1B',
    textAlign: 'center',
    fontSize: 49,
    fontWeight: 'bold',
  },
  footer: {  
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    marginBottom: 10
  },
});
