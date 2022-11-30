import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import ComponentItem from './component-item/Component-item';

function JenisTransaksi({onClickCancel}) {
  const handleClick = () => {
    onClickCancel();
  };
  return (
    <View style={{padding: 14}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.text1}>Pilih Jenis Transaksi</Text>
        <TouchableOpacity onPress={() => handleClick()}>
          <Image source={require('../../assets/Cancel.png')} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.text2}>Jenis</Text>
      </View>
      <View>
        <ComponentItem
          image1={''}
          text={'Transfer'}
          image2={''}
          bgColor={'#B4B4B4'}
        />
        <ComponentItem
          image1={''}
          text={'Instan'}
          image2={''}
          bgColor={'#3532E0'}
        />
        <ComponentItem
          image1={''}
          text={'Tunai'}
          image2={''}
          bgColor={'#31CE5D'}
        />
        <ComponentItem
          image1={''}
          text={'Hiburan'}
          image2={''}
          bgColor={'#D39BFF'}
        />
        <ComponentItem
          image1={''}
          text={'Gaya Hidup'}
          image2={''}
          bgColor={'#82FFF0'}
        />
        <ComponentItem
          image1={''}
          text={'Makanan & Minuman'}
          image2={''}
          bgColor={'#ED6E13'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 18,
    lineHeight: 27,
    color: '#000',
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
  text2: {
    fontSize: 18,
    lineHeight: 27,
    color: '#FCBC31',
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
});

export default JenisTransaksi;
