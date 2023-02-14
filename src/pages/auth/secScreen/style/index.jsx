import {StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01626D',
  },
  imageCover: {
    width: '100%',
    height: '100%',
  },
  txt1: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 36,
    textAlign: 'center',
    color: '#FCBC31',
    lineHeight: 43,
    marginTop: 30,
  },
  txt2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginTop: 10,
    marginHorizontal: 10
  },
  btnContainer: {
    marginTop: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: '80%',
    height: '26%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
  },
  txtBtn: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
});
