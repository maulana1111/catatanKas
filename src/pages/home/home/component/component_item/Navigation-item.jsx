import React, {useState} from 'react';
import {Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {storeDataFilter} from '../../../../../redux/features/globalSlice';

function NavigationItem(props) {
  const {state, stateItem, text, image, onChange} = props;
  //   const img = require(image)
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleNav = () => {
    dispatch(
      storeDataFilter({
        status: false,
        urutan_pengeluaran: '',
        urutan_pemasukan: '',
        tanggal_dari: '',
        tanggal_sampai: '',
        jenis_tagihan: '',
        real_tanggal_dari: '',
        real_tanggal_sampai: '',
      }),
    );

    navigation.navigate(text);
  };

  return (
    <View style={{marginHorizontal: 15}}>
      <TouchableOpacity
        onPress={() => {
          handleNav();
        }}>
        <View style={style.card}>
          <Image
            source={image}
            style={{width: 36, height: 32, marginBottom: 8}}
          />
          <Text style={style.txt}>{text}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
  card: {
    backgroundColor: '#795B1B',
    padding: 8,
    width: 123,
    height: 94,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  txt: {
    fontFamily: 'BalooBhaijaan2-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    color: '#DBA42D',
    textAlign: 'center',
  },
  styleShadow: {
    shadowColor: '#FCBC31',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 2,
    shadowRadius: 5,
  },
});

export default NavigationItem;
