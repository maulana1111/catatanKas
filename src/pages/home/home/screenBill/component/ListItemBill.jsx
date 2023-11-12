import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {
  TransferImage,
  InstantImage,
  TunaiImage,
  HiburanImage,
  GayaImage,
  MakananImage,
  LainnyaImage,
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
          marginVertical: 10,
        }}>
        {state === 'instant' && <InstantImage />}
        {state === 'transfer' && <TransferImage />}
        {state === 'tunai' && <TunaiImage />}
        {state === 'hiburan' && <HiburanImage />}
        {state === 'gaya_hidup' && <GayaImage />}
        {state === 'makanan&minuman' && <MakananImage />}
        {state === 'lainnya' && <LainnyaImage />}
        <View style={{width: '82%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={[styles.text2, {color: '#9A9A9A'}]}>{state}</Text>
              <Text style={styles.text3}>
                {data.kategori} - {data.waktu_tagihan}
              </Text>
              <Text style={styles.text4}>{data.description}</Text>
              {/* <Text style={styles.text4}>{data.description}</Text> */}
            </View>
            <View>
              <View
                style={{
                  justifyContent: 'flex-end',
                  alignSelf: 'flex-end',
                  marginVertical: 3,
                  marginRight: 3
                }}>
                <TouchableOpacity onPress={() => onClickDelete(data.id)}>
                  <Image
                    source={require('../assets/trash_icon.png')}
                    style={{width: 18, height: 18, tintColor: '#FF5942'}}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  styles.text3,
                  {fontSize: 12, marginRight: 5},
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
    </View>
  );
};
const styles = StyleSheet.create({
  text2: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 16,
    color: '#000000',
  },
  text3: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 14,
    color: '#000',
  },
  text4: {
    fontFamily: 'BalooBhaijaan2-Regular',
    fontSize: 14,
    color: '#DBA42D',
  },
});

export default ListItemBill;
