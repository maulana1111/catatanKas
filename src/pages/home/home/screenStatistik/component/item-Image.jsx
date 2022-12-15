import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

function ItemImage({state}) {
  if (state === 'transfer') {
    return (
      <View style={[styles.container, {backgroundColor: '#D8D8D8'}]}>
        <Image
          source={require('./assets/filter/transfer.png')}
          style={[styles.image, {tintColor: '#000'}]}
        />
      </View>
    );
  }
  if (state === 'gaya_hidup') {
    return (
      <View style={[styles.container, {backgroundColor: 'rgba(130, 255, 240, 0.4)'}]}>
        <Image
          source={require('./assets/filter/lifestyle.png')}
          style={[styles.image, {tintColor: '#07BBA5'}]}
        />
      </View>
    );
  }
  if (state === 'instant') {
    return (
      <View style={[styles.container, {backgroundColor: 'rgba(53, 50, 224, 0.4)'}]}>
        <Image
          source={require('./assets/filter/instant.png')}
          style={[styles.image, {tintColor: '#3F32E0'}]}
        />
      </View>
    );
  }
  if (state === 'makanan&minuman') {
    return (
      <View style={[styles.container, {backgroundColor: 'rgba(237, 110, 19, 0.4)'}]}>
        <Image
          source={require('./assets/filter/food.png')}
          style={[styles.image, {tintColor: '#ED6E13'}]}
        />
      </View>
    );
  }
  if (state === 'hiburan') {
    return (
      <View style={[styles.container, {backgroundColor: '#D39BFF'}]}>
        <Image
          source={require('./assets/filter/entertainment.png')}
          style={[styles.image, {tintColor: '#8015D3'}]}
        />
      </View>
    );
  }
  if (state === 'coin') {
    return (
      <View style={[styles.container, {backgroundColor: 'rgba(49, 206, 93, 0.4)'}]}>
        <Image
          source={require('./assets/filter/coin.png')}
          style={[styles.image, {tintColor: '#31CE5D'}]}
        />
      </View>
    );
  }
  return (
    <View style={[styles.container, {backgroundColor: 'rgba(49, 206, 93, 0.4)'}]}>
      <Image
        source={require('./assets/filter/coin.png')}
        style={[styles.image, {tintColor: '#31CE5D'}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 15,
    height: 15,
  },
  container: {
    width: 25,
    height: 25,
    borderRadius: 7,
    padding: 4,
  },
});

export default ItemImage;
