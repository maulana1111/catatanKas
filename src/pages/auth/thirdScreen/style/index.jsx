import {StyleSheet} from 'react-native';

export const Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01626D',
  },
  centerView: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  secView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt1: {
    fontFamily: 'BalooBhaijaan2-Bold',
    fontSize: 36,
    color: '#fff',
  },
  txt2: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 18,
    color: '#fff',
  },
  txt3: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    color: '#000',
    textAlign: 'center'
  },
  btn: {
    backgroundColor: '#fff',
    width: '80%',
    borderRadius: 15,
    paddingVertical: 16,
  },
  btnStyle: {
    // justifyContent: 'space-evenly'
  }
});
