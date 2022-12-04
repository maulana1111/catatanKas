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
        height: '85%',
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
        height: '85%',
      }}>
      <Image
        source={require('../../assets/transfer.png')}
        style={{width: 42, height: 42, tintColor: '#000'}}
      />
    </View>
  );
};

export {InstantImage, TransferImage};
