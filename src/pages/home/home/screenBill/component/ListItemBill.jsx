import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {
  TransferImage,
  InstantImage,
  TunaiImage,
  HiburanImage,
  GayaImage,
  MakananImage,
} from './component-item/ImageComponent';

const ListItemBill = ({data, onClickDelete}) => {
  const ChangeRupiah = number => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(number);
  };
  // console.log('data data = ' + JSON.(data));
  const state = data.jenis_tagihan;
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginVertical: 10
        }}>
        {state === 'instant' && <InstantImage />}
        {state === 'transfer' && <TransferImage />}
        {state === 'tunai' && <TunaiImage />}
        {state === 'hiburan' && <HiburanImage />}
        {state === 'gaya_hidup' && <GayaImage />}
        {state === 'makanan&minuman' && <MakananImage />}
        <View style={{width: '82%'}}>
          <Text style={[styles.text2, {color: '#9A9A9A'}]}>{state}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.text3, {marginTop: 10}]}>
              {data.kategori} - {data.waktu_tagihan}
            </Text>
            <TouchableOpacity onPress={() => onClickDelete(data.id)}>
              <Image
                source={require('../assets/delete.png')}
                style={{width: 42, height: 42}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text4}>{data.description}</Text>
            <Text
              style={[
                styles.text3,
                {fontSize: 12},
                data.tagihan === 'pemasukan'
                  ? {color: '#31CE5D'}
                  : {color: '#FF5942'},
              ]}>
              {ChangeRupiah(data.nominal)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  text2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  text3: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#000',
  },
  text4: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#DBA42D',
  },
});

export default ListItemBill;
