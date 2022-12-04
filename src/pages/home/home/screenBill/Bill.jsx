import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import MyStatusBar from '../../../auth/component/StatusBar';

function Bill() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <MyStatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <View style={styles.back}>
              <Image
                source={require('./assets/arrow_left.png')}
                style={styles.imageBack}
              />
            </View>
          </TouchableOpacity>
          <View style={{marginLeft: '32%'}}>
            <Text style={styles.title}>Tagihan</Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <View style={{marginVertical: 5}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text1}>Tagihan Hari Ini</Text>
            <Text style={styles.text2}>24 Mar 2020</Text>
          </View>
          <View style={{marginVertical: 5}} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.bg}>
              <TouchableOpacity>
                <Image source={require('./assets/capture_bill.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.bg}>
              <TouchableOpacity>
                <Image source={require('./assets/filter.png')} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{marginVertical: 5}} />
          <View style={styles.container}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[styles.text1, {color: '#000'}]}>Pemasukan</Text>
              <Image source={require('./assets/Share.png')} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bg: {backgroundColor: 'rgba(252, 188, 49, 0.4)', padding: 2, borderRadius: 8},
  imageBack: {
    width: 19,
    height: 19,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 6,
  },
  container: {
    justifyContent: 'flex-start',
    padding: 12,
    backgroundColor: 'rgba(255, 230, 175, 0.2)',
    borderRadius: 16,
  },
  back: {
    backgroundColor: 'rgba(252, 188, 49, 0.4)',
    width: 32,
    height: 32,
    borderRadius: 30,
  },
  title: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 18,
    lineHeight: 27,
    color: '#DBA42D',
    marginTop: 5,
  },
  text1: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#DBA42D',
  },
  text2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
});

export default Bill;
