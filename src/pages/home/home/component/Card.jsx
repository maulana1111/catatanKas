import React from 'react';
import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {CircleFade} from 'react-native-animated-spinkit';

function Card({nominal, state}) {
  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
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
                {state === true ? (
                  <CircleFade size={20} color="#FFF" />
                ) : (
                  <Text
                    style={[
                      style.txt4,
                      nominal.length > 10
                        ? {fontSize: 35}
                        : {fontSize: 29},
                    ]}>
                    {ChangeRupiah(nominal)}
                  </Text>
                  // <Text style={style.txt4}>{ChangeRupiah(nominal)}</Text>
                )}
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
    color: '#FCBC31',
  },
});

export default Card;
