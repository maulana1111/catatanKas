import React from 'react';
import {Text, View, TouchableOpacity, Image, StyleSheet} from 'react-native';

import ComponentSecItem from './component-item/Component-sec-item';

function KategoriTransfer({onClickCancel, onChangeState}) {
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
        <Text style={styles.text2}>Transfer</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => handleChange('bca')}>
          <ComponentSecItem
            image1={require('../../assets/transfer/bca.png')}
            text={'Bca'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('bni')}>
          <ComponentSecItem
            image1={require('../../assets/transfer/bni.png')}
            text={'Bni'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('bri')}>
          <ComponentSecItem
            image1={require('../../assets/transfer/bri.png')}
            text={'Bri'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('mandiri')}>
          <ComponentSecItem
            image1={require('../../assets/transfer/mandiri.png')}
            text={'Mandiri'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('bjb')}>
          <ComponentSecItem
            image1={require('../../assets/transfer/bjb.png')}
            text={'BJB'}
            image2={require('../../assets/arrow_right.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleChange('bsi')}>
          <ComponentSecItem
            image1={require('../../assets/transfer/bsi.png')}
            text={'BSI'}
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

export default KategoriTransfer;
