import React from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import ItemImage from './item-Image';

function TransaksiItem({text, text2, state}) {
  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };

  let str = '';
  if (text === 'gaya_hidup') {
    str = 'gaya hidup';
  } else if (text === 'makanan&minuman') {
    str = 'makanan & minuman';
  } else {
    str = text;
  }

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        {/* {console.log(text)} */}
        <ItemImage state={text} />
        <Text style={styles.text}>{str}</Text>
      </View>
      <View>
        <Text
          style={[
            styles.text2,
            state === 'pemasukan' ? {color: '#31CE5D'} : {color: '#FF5942'},
          ]}>
          {ChangeRupiah(text2)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  bgColor: {
    width: 24,
    height: 24,
    borderRadius: 6,
    padding: 3,
  },
  text: {
    fontSize: 12,
    lineHeight: 18,
    color: '#232E31',
    fontFamily: 'BalooBhaijaan2-SemiBold',
    marginLeft: 10,
    marginTop: 3,
  },
  text2: {
    fontSize: 12,
    lineHeight: 15,
    marginTop: 3,
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
});

export default TransaksiItem;
