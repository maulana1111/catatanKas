import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import ComponentSecItem from './component-item/Component-sec-item';

function KategoriInstant({onClickCancel, onChangeState}) {
  const handleClick = () => {
    onClickCancel();
  };
  const handleChange = e => {
    onChangeState(e);
  };
  return (
    <View style={{padding: 14}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.text1}>Pilih Bank/Perorang/Perusahaan/Tokok</Text>
        <TouchableOpacity onPress={() => handleClick()}>
          <Image source={require('../../assets/Cancel.png')} />
        </TouchableOpacity>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.text2}>Intsant</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleChange('dana')}>
          <ComponentSecItem
            image1={require('../../assets/instant/dana.png')}
            text={'DANA'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('ovo')}>
          <ComponentSecItem
            image1={require('../../assets/instant/ovo.png')}
            text={'OVO'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('linkaja')}>
          <ComponentSecItem
            image1={require('../../assets/instant/linkaja.png')}
            text={'LinkAja'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('shopeePay')}>
          <ComponentSecItem
            image1={require('../../assets/instant/shoope.png')}
            text={'ShopeePay'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    fontSize: 18,
    lineHeight: 27,
    color: '#000',
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
  text2: {
    fontSize: 18,
    lineHeight: 27,
    color: '#FCBC31',
    fontFamily: 'BalooBhaijaan2-SemiBold',
  },
});

export default KategoriInstant;
