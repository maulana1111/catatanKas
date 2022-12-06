import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import ItemImage from './item-Image';

function ItemScreen({jenis, item}) {
  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  return (
    <View>
      
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <ItemImage state={item.kategori} />
          <View>
            <Text style={styles.txt2}>{item.kategori}</Text>
            <Text style={styles.txt3}>
              {item.waktu_transaksi} {item.description}
            </Text>
          </View>
        </View>
        <View>
          <Image
            source={require('../../../../../assets/trash_icon.png')}
            style={{width: 28, height: 28, alignSelf: 'flex-end'}}
          />
          <Text
            style={[
              styles.txt4,
              jenis === 'pemasukan' ? {color: '#31CE5D'} : {color: '#FF5942'},
            ]}>
            {jenis === 'pemasukan'
              ? '+' + ChangeRupiah(item.nominal)
              : '-' + ChangeRupiah(item.nominal)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txt1: {
    fontSize: 16,
    fontFamily: 'BalooBhaijaan2-Regular',
    color: '#9A9A9A',
  },
  txt2: {
    fontSize: 14,
    fontFamily: 'BalooBhaijaan2-SemiBold',
    color: '#000',
  },
  txt3: {
    fontSize: 14,
    fontFamily: 'BalooBhaijaan2-Regular',
    color: '#DBA42D',
    lineHeight: 21,
  },
  txt4: {
    fontSize: 12,
    fontFamily: 'BalooBhaijaan2-Regular',
    lineHeight: 18,
  },
});

export default ItemScreen;
