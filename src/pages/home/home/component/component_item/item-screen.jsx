import React from 'react';
import {TouchableOpacity} from 'react-native';
import {View, Text, Image, StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import ItemImage from './item-Image';

function ItemScreen({jenis, item, onClick}) {
  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  let str = '';
  if (
    item.jenis_transaksi !== 'gaya_hidup' ||
    item.jenis_transaksi !== 'makanan&minuman'
  ) {
    let tx = item.jenis_transaksi;
    let str2 = tx.charAt(0).toUpperCase() + tx.slice(1);
    str = str2;
  }
  if (item.jenis_transaksi === 'gaya_hidup') {
    str = 'Gaya Hidup';
  }
  if (item.jenis_transaksi === 'makanan&minuman') {
    str = 'Makanan & Minuman';
  }

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 0}}>
            <ItemImage state={item.kategori} />
          </View>
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'BalooBhaijaan2-Regular',
                color: '#9A9A9A',
              }}>
              {str}
            </Text>
            <Text style={styles.txt2}>
              {item.kategori} - {item.waktu_transaksi}
            </Text>
            <Text style={styles.txt3}>{item.description}</Text>
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <TouchableOpacity onPress={() => onClick(item.id)}>
            <Image
              source={require('../../../../../assets/trash_icon.png')}
              style={{
                width: 18,
                height: 18,
                alignSelf: 'flex-end',
                tintColor: '#FF5942',
              }}
            />
          </TouchableOpacity>
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
