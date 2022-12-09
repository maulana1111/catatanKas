import React from 'react';
import {View, Image} from 'react-native';
const InstantImage = () => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(224, 50, 112, 0.4)',
        borderRadius: 16,
        padding: 5,
        marginRight: 10,
        justifyContent: 'flex-start',
        height: 50,
      }}>
      <Image
        source={require('../../assets/instant.png')}
        style={{width: 42, height: 42, tintColor: '#E03270'}}
      />
    </View>
  );
};

const TransferImage = () => {
  return (
    <View
      style={{
        backgroundColor: '#B4B4B4',
        borderRadius: 16,
        padding: 5,
        marginRight: 10,
        marginTop: 15,
        height: 50,
      }}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 42, height: 42, tintColor: '#000'}}
      />
    </View>
  );
};

const TunaiImage = () => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(49, 206, 93, 0.4)',
        borderRadius: 16,
        padding: 5,
        marginRight: 10,
        marginTop: 15,
        height: 50,
      }}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 42, height: 42, tintColor: '#31CE5D'}}
      />
    </View>
  );
};

const HiburanImage = () => {
  return (
    <View
      style={{
        backgroundColor: '#D39BFF',
        borderRadius: 16,
        padding: 5,
        marginRight: 10,
        marginTop: 15,
        height: 50,
      }}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 42, height: 42, tintColor: '#8015D3'}}
      />
    </View>
  );
};

const GayaImage = () => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(130, 255, 240, 0.4)',
        borderRadius: 16,
        padding: 5,
        marginRight: 10,
        marginTop: 15,
        height: 50,
      }}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 42, height: 42, tintColor: '#07BBA5'}}
      />
    </View>
  );
};

const MakananImage = () => {
  return (
    <View
      style={{
        backgroundColor: 'rgba(237, 110, 19, 0.4)',
        borderRadius: 16,
        padding: 5,
        marginRight: 10,
        marginTop: 15,
        height: 50,
      }}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 42, height: 42, tintColor: '#ED6E13'}}
      />
    </View>
  );
};
export {
  InstantImage,
  TransferImage,
  TunaiImage,
  HiburanImage,
  GayaImage,
  MakananImage,
};
