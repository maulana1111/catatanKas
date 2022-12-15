import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
const InstantImage = () => {
  return (
    <View style={[styles.container]}>
      <Image
        source={require('../../assets/instant.png')}
        style={{width: 50, height: 50, borderRadius: 16}}
      />
    </View>
  );
};

const TransferImage = () => {
  return (
    <View
      style={[
        {
          backgroundColor: '#B4B4B4',
        },
        styles.container,
      ]}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 50, height: 50, borderRadius: 16}}
      />
    </View>
  );
};

const TunaiImage = () => {
  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(49, 206, 93, 0.4)',
        },
        styles.container,
      ]}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 50, height: 50, borderRadius: 16}}
      />
    </View>
  );
};

const HiburanImage = () => {
  return (
    <View
      style={[
        {
          backgroundColor: '#D39BFF',
        },
        styles.container,
      ]}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 50, height: 50, borderRadius: 16}}
      />
    </View>
  );
};

const GayaImage = () => {
  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(130, 255, 240, 0.4)',
        },
        styles.container,
      ]}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 50, height: 50, borderRadius: 16}}
      />
    </View>
  );
};

const MakananImage = () => {
  return (
    <View
      style={[
        {
          backgroundColor: 'rgba(237, 110, 19, 0.4)',
        },
        styles.container,
      ]}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 50, height: 50, borderRadius: 16}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginRight: 10,
    height:49,
    borderWidth: 1,
    borderColor: '#D8D8D8',
  },
  image: {
    width: 42,
    height: 42,
  },
});

export {
  InstantImage,
  TransferImage,
  TunaiImage,
  HiburanImage,
  GayaImage,
  MakananImage,
};
