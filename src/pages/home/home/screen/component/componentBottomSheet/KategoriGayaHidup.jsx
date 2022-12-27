import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import ComponentSecItem from './component-item/Component-sec-item';

function KategoriGayaHidup({onClickCancel, onChangeState}) {
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
        <Text style={styles.text2}>Gaya Hidup</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleChange('alfamart')}>
          <ComponentSecItem
            image1={require('../../assets/gayahidup/alfamart.png')}
            text={'Alfamart'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('hero')}>
          <ComponentSecItem
            image1={require('../../assets/gayahidup/hero.png')}
            text={'Hero'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('indomart')}>
          <ComponentSecItem
            image1={require('../../assets/gayahidup/indomart.png')}
            text={'Indomart'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('lotte')}>
          <ComponentSecItem
            image1={require('../../assets/gayahidup/lotte.png')}
            text={'lotte Mart'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('pertamina')}>
          <ComponentSecItem
            image1={require('../../assets/gayahidup/pertamina.png')}
            text={'Pertamina'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('ranchmarket')}>
          <ComponentSecItem
            image1={require('../../assets/gayahidup/ranchmarket.png')}
            text={'Ranch Market'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('shell')}>
          <ComponentSecItem
            image1={require('../../assets/gayahidup/shell.png')}
            text={'Shell'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('superindo')}>
          <ComponentSecItem
            image1={require('../../assets/gayahidup/superindo.png')}
            text={'Super Indo'}
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

export default KategoriGayaHidup;
