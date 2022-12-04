import React from 'react';
import {View, TouchableOpacity, Image, Text, StyleSheet} from 'react-native';
import {TransferImage, InstantImage} from './component-item/ImageComponent';

function ListItemBill({state, jenis, title, text1, text2, uang}) {
  return (
    <View>
      <View>
        <Text style={[styles.text2, {color: '#9A9A9A'}]}>{title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
        }}>
        {state === 'instant' && <InstantImage />}
        {state === 'transfer' && <TransferImage />}
        <View style={{width: '82%'}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={[styles.text3, {marginTop: 10}]}>{text1}</Text>
            <Image
              source={require('../assets/delete.png')}
              style={{width: 42, height: 42}}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text4}>{text2}</Text>
            <Text
              style={[
                styles.text3,
                {fontSize: 12},
                jenis === 'pemasukan' ? {color: '#31CE5D'} : {color: '#FF5942'},
              ]}>
              {uang}
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
