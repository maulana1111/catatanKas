import React from 'react';
import {StyleSheet, Image, View} from 'react-native';

function ItemImage({state}) {
  if (state === 'bca') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/transfer/bca.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'bjb') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/transfer/bjb.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'bni') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/transfer/bni.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'bri') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/transfer/bri.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'bsi') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/transfer/bsi.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'mandiri') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/transfer/mandiri.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'aw') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/aw.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'burger') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/burger.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'carl') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/carl.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'domino') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/domino.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'dunkin') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/dunkin.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'gofood') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/gofood.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'grab') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/grab.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'hokben') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/hokben.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'jco') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/jco.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'kfc') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/kfc.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'mcd') {
    ireturn(
      <View>
        {' '}
        style={styles.border}
        <Image
          source={require('../../screen/assets/makan/mcd.png')}
          style={styles.container}
        />
      </View>,
    );
  }
  if (state === 'pizza') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/pizza.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'shoopeFood') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/shoope.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'starbuck') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/starbuck.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'yoshinoya') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/makan/yoshinoya.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'dana') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/instant/dana.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'linkaja') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/instant/linkaja.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'ovo') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/instant/ovo.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'shopeePay') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/instant/shoope.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'apple') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/hiburan/apple.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'disney') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/hiburan/disney.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'netflix') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/hiburan/netflix.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'prime') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/hiburan/prime.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'spotify') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/hiburan/spotify.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'tix') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/hiburan/tix.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'video') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/hiburan/video.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'alfamart') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/gayahidup/alfamart.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'hero') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/gayahidup/hero.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'indomart') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/gayahidup/indomart.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'lotte') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/gayahidup/lotte.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'pertamina') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/gayahidup/pertamina.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'ranchmarket') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/gayahidup/ranchmarket.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'shell') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/gayahidup/shell.png')}
          style={styles.container}
        />
      </View>
    );
  }
  if (state === 'superindo') {
    return (
      <View style={styles.border}>
        <Image
          source={require('../../screen/assets/gayahidup/superindo.png')}
          style={styles.container}
        />
      </View>
    );
  }

  return (
    <View style={styles.border}>
      <Image
        source={require('../../screen/assets/kontak/person.png')}
        style={[styles.container, {backgroundColor: 'white'}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    borderRadius: 16,
    marginRight: 5,
    borderWidth:2,
    borderColor: '#D8D8D8',
  },
});

export default ItemImage;
