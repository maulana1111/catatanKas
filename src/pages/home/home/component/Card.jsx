import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import DropShadow from 'react-native-drop-shadow';

function Card() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
      }}>
      <DropShadow
        style={{
          shadowColor: '#FCBC31',
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 1,
          shadowRadius: 5,
        }}>
        <ImageBackground
          source={require('../../../../assets/bg_color.png')}
          style={style.card}>
          <ImageBackground
            source={require('../../../../assets/sec_bg_color.png')}
            style={style.card}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 25,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text style={[style.txt3, {marginRight: 30}]}>
                  Total Transaksi
                </Text>
                <Image source={require('../../../../assets/vector.png')} />
              </View>
              <View>
                <Text style={style.txt4}>Rp. 100.000</Text>
              </View>
            </View>
          </ImageBackground>
        </ImageBackground>
      </DropShadow>
    </View>
  );
}

const style = StyleSheet.create({
  txt4: {
    fontSize: 36,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    color: '#fff',
  },
  card: {
    width: 275,
    height: 143,
  },
  txt3: {
    fontSize: 18,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    color: '#FCBC31'
  },
});

export default Card;
